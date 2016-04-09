(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestasController', EncuestasController);

	function EncuestasController($scope, $timeout, $filter, $cookies, $mdDialog, EncuestasFactory, PreguntasFactory, PersonasFactory) {
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
        $scope.asignandoUsuarios = asignandoUsuarios;
        $scope.asignarUsuarios = asignarUsuarios;
        $scope.marcarTodos = marcarTodos;
        var respaldoPreguntas;

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

            EncuestasFactory.getQuestions(id)
            .then(function(response) {
                respaldoPreguntas = [];
                $scope.preguntas.banco = response;
                
                angular.forEach(response, function(question) {
                    respaldoPreguntas.push(question);
                });
            })
            .then(function() {
                PreguntasFactory.getAll()
                .then(function(response) {
                    $scope.preguntas.preguntas = response;
                })
                .then(function() {
                    $scope.preguntas = EncuestasFactory.removeItems($scope.preguntas);
                });
            });
        }

        function cambiarEstado(encuesta) {
            EncuestasFactory.changeState(encuesta.id, 1 - encuesta.estado)
            .then(function(response) {
                encuesta.estado = 1 - encuesta.estado;
            });
        }

        function armar() {
            console.log('Armando ->',$scope.id);
            var questionsList = EncuestasFactory.questionsChanged(respaldoPreguntas, $scope.preguntas.banco);
            
            // Preguntar si el array de preguntas a eliminar no es vacio, llamar al metodo del factory
            // Preguntar si el array de preguntas a agregar no es vacio, llamar al metodo del factory

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

        function asignandoUsuarios(id) {
            $scope.id = id;

            PersonasFactory.getBusinessmen()
            .then(function(response) {
                $scope.empresarios = response;
            });
        }

        function asignarUsuarios() {
            console.log('Asignando usuarios a la encuesta ', $scope.id);
        }

        function marcarTodos() {
            var checkboxes = document.getElementsByName('buss'),
                i = 0,
                length = checkboxes.length,
                state = document.getElementById('bussMaster').checked;

            for( ; i < length; i++) {
                checkboxes[i].checked = state;
            }
        }
	}

})();