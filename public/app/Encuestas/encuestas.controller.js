(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestasController', EncuestasController);

	function EncuestasController($scope, $timeout, $filter, $cookies, EncuestasFactory) {
		$scope.descripcion = '';
		$scope.nueva = false;
		$scope.registro = false;
        $scope.texto = 'Mostrar formulario de agregar nueva encuesta';
        $scope.mostrarFormulario = mostrarFormulario;
        $scope.agregar = agregar;
        $scope.modificar = modificar;
        $scope.eliminar = eliminar;
        $scope.editandoEncuesta = editandoEncuesta;

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
                    document.getElementById('cerrarEditarEncuesta').click();
                }
                else {
                    console.log('error');
                }
            });
        }

        function eliminar(id) {
            console.log('Eliminar ->',id);
        }
        function editandoEncuesta(id, descripcion) {
            $scope.descripcion = descripcion;
            $scope.id = id;
        }

        function getAll() {
        	EncuestasFactory.getAll()
        	.then(function(response) {
        		$scope.encuestas = response;
        	});
        }

        getAll();
	}

})();