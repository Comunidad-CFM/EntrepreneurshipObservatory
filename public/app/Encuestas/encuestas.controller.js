(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestasController', EncuestasController);

	function EncuestasController($scope, $timeout, $filter, $cookies, $mdDialog, EncuestasFactory) {
		$scope.descripcion = '';
		$scope.nueva = false;
		$scope.registro = false;
        $scope.texto = 'Mostrar formulario de agregar nueva encuesta';
        $scope.mostrarFormulario = mostrarFormulario;
        $scope.agregar = agregar;
        $scope.modificar = modificar;
        $scope.eliminar = eliminar;
        $scope.editandoEncuesta = editandoEncuesta;
        $scope.cambiarEstado = cambiarEstado;
        $scope.armandoEncuesta = armandoEncuesta;
        $scope.armar = armar;

        $scope.$watch('descripcion', validate);

        function validate() {
    		if ($scope.descripcion.length < 5) {
                $scope.emptyData = true;
            } else { // Habilita
                $scope.emptyData = false;
            }
        }

        function mostrarFormulario() {
            $scope.nueva = !$scope.nueva;

            if($scope.nueva) {
                $scope.texto = 'Ocultar formulario de agregar nueva encuesta';
            }
            else {
                $scope.texto = 'Mostrar formulario de agregar nueva encuesta';
            }
        }

        function agregar() {
        	var fechaActual = $filter('date')(new Date(), 'yyyy-MM-dd');
        	var encuesta = {
        		descripcion: $scope.descripcion,
        		estado: false,
        		fechaCreacion: fechaActual,
        		fechaModificacion: fechaActual,
        		persona_id: $cookies.getObject('session').id,
        	};

        	EncuestasFactory.store(encuesta)
        	.then(function(response) {
        		if(response === 'true') {
                    getAll();
                    $scope.registro = true;
                    $scope.msgRegistro = 'La encuesta se ha agregado correctamente.';
                    $scope.styleRegistro = 'success-box';
                    $scope.descripcion = '';

                    $timeout(function() {
                        $scope.registro = false;
                    }, 5000);
                }
                else {
                    $scope.registro = true;
                    $scope.msgRegistro = 'Ha ocurrido un error al agregar la encuesta.';
                    $scope.styleRegistro = 'error-box';
                }
        	});
        }

        function modificar() {
		    EncuestasFactory.edit($scope.id, $scope.descripcion, $filter('date')(new Date(), 'yyyy-MM-dd'))
            .then(function(response) {
                if(response === 'true') {
                    getAll();
                    $scope.editar = true;
                    $scope.msgEditar = 'La encuesta se ha modificado correctamente.';
                    $scope.styleEditar = 'success-box';
                }
                else {
                    $scope.editar = true;
                    $scope.msgEditar = 'Ha ocurrido un error al modificar la encuesta.';
                    $scope.styleEditar = 'error-box';
                }
            });
        }

        function eliminar(ev, id) {
            var confirm = $mdDialog.confirm()
            .title('¿Desea eliminar la encuesta?')
            .textContent('Si la elimina, se eliminará de todo el sistema.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Sí')
            .cancel('No');
            
            $mdDialog.show(confirm)
            .then(function() {
                EncuestasFactory.remove(id)
                .then(function(response) {
                    if(response === 'true') {
                        getAll();
                    }
                    else {
                        console.log('error');
                    }
                });
            }, function() {});
        }
        function editandoEncuesta(id, descripcion) {
            $scope.editar = false;
            $scope.descripcion = descripcion;
            $scope.id = id;
        }

        function armandoEncuesta(id) {
            $scope.armarOk = false;
            $scope.id = id;

            $scope.preguntas = {
                "banco": [],
                "preguntas": []
            };
            $scope.changeState = changeState;

            for (var i = 1; i <= 10; ++i) {
                $scope.preguntas.preguntas.push({label: "Pregunta " + i, state: false});
            }
        }

        function cambiarEstado(encuesta) {
            EncuestasFactory.changeState(encuesta.id, 1 - encuesta.estado)
            .then(function(response) {
                encuesta.estado = 1 - encuesta.estado;
            });
        }

        function armar() {
            console.log('Armando ->',$scope.id);

            $scope.armarOk = true;
            $scope.msgArmar = 'Las preguntas se han agregado a la encuesta correctamente.';
            $scope.styleArmar = 'success-box';
        }

        function getAll() {
        	EncuestasFactory.getAll()
        	.then(function(response) {
        		$scope.encuestas = response;
        	});
        }

        getAll();

        function changeState(encuesta) {
            var state = changedState(encuesta);
            
            if(angular.equals(state,'Banco') && !encuesta.state) {
                console.log('Pasa al banco la',encuesta.label);
                encuesta.state = true;
                // Change in DB
            }
            else if(angular.equals(state,'inactivas') && encuesta.state) {
                console.log('Pasa a las preguntas la',encuesta.label);
                encuesta.state = false;
                // Change in DB
            }
            else {
                console.log('Nada por hacer');
            }
        }

        function changedState(item) {
            var response = '';

            angular.forEach($scope.encuestas, function(encuestas, key) {
                angular.forEach(encuestas, function(encuesta) {
                    if(angular.equals(encuesta, item)) {
                        if(key === 'Preguntas')
                            response = 'Preguntas';
                        else
                            response = 'Banco';
                    }
                });
            });
            
            return response;
        }
	}

})();