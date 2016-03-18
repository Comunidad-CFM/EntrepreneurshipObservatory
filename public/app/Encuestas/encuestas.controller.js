(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestasController', EncuestasController);

	function EncuestasController($scope, $timeout, $filter, $cookies) {
		$scope.descripcion = '';
		$scope.nueva = false;
        $scope.texto = 'Mostrar formulario de agregar nueva encuesta';
        $scope.mostrarFormulario = mostrarFormulario;
        $scope.agregar = agregar;

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
                $scope.texto = 'Ocultar formulario de agregar nueva persona';
            }
            else {
                $scope.texto = 'Mostrar formulario de agregar nueva persona';
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
        	
        	console.log(encuesta);
        }
	}

})();