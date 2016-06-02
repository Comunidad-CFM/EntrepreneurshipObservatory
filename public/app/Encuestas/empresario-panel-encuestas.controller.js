(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EmpresarioPanelEncuestasController', EmpresarioPanelEncuestasController);

	function EmpresarioPanelEncuestasController($scope, EncuestasFactory, $cookies, AplicacionesFactory) {

		$scope.empresario = $cookies.getObject('session').id;

		$scope.idAplicacion = 0;		//Aplicacion
		$scope.aplicaciones =  null;	//Aplicaciones
        //Encuesta
        $scope.encuestaId = 0;
        $scope.encuestaDescripcion = "";
		// Funciones
		$scope.contestarEncuesta = contestarEncuesta;
		$scope.getAplicacionesByPersona = getAplicacionesByPersona;

        function contestarEncuesta(id, descripcion){
            $scope.encuestaId = id;
            $scope.encuestaDescripcion = descripcion;
			$scope.idAplicacion = getIdAplicacion(id);

			EncuestasFactory.setId(id);
			EncuestasFactory.setDescripcion(descripcion);
			EncuestasFactory.setIdAplicacion($scope.idAplicacion);
        }


		function getAplicacionesByPersona() {
            AplicacionesFactory.getAplicacionesByPersona($scope.empresario)
				.then(function(response) {
					$scope.aplicaciones = response;
					getEncuestas();
					console.log($scope.aplicaciones);
				})
        }

		getAplicacionesByPersona();

		function getEncuestas() {
			var ids = [];
			$scope.aplicaciones.forEach(function(aplicacion) {
				ids.push(aplicacion.encuesta_id);
			});

			EncuestasFactory.getEncuestas(ids)
				.then(function(response) {
					$scope.encuestas = response;
				});
		}

		function getIdAplicacion(idEncuesta) {
			var idAplicacion = 0;
			$scope.aplicaciones.forEach(function(aplicacion) {
				if(aplicacion.encuesta_id === idEncuesta)
					idAplicacion = aplicacion.id;
			});
			return idAplicacion;
		}

	}
})();
