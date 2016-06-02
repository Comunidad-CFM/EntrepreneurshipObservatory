(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestadorPanelEncuestasController', EncuestadorPanelEncuestasController);

	function EncuestadorPanelEncuestasController($scope, EncuestasFactory, $cookies, AplicacionesFactory, PersonasFactory) {

		$scope.encuestador = $cookies.getObject('session').id;

		$scope.idAplicacion = 0;		//Aplicacion
		$scope.aplicaciones =  null;	//Aplicaciones
        //Encuesta
        $scope.encuestaId = 0;
        $scope.encuestaDescripcion = "";
		//Persona
		$scope.personas = [];
		// Funciones
		$scope.getAplicaciones = getAplicaciones;
		$scope.contestarEncuesta = contestarEncuesta;

        function contestarEncuesta(id, descripcion){
            $scope.encuestaId = id;
            $scope.encuestaDescripcion = descripcion;
			$scope.idAplicacion = getIdAplicacion(id);

			EncuestasFactory.setId(id);
			EncuestasFactory.setDescripcion(descripcion);
			EncuestasFactory.setIdAplicacion($scope.idAplicacion);
        }

		function isInArray(value, array) {
			return array.indexOf(value) > -1;
		}

		function borrarPersonasRepetidas(personas) {
			var idsPersonas = [];
			personas.forEach(function(persona) {
				if (isInArray(persona.id, idsPersonas))
					personas.splice(personas.indexOf(persona), 1);
				else
					idsPersonas.push(persona.id);
			});
			return personas;
		}

			function getAplicaciones() {
			AplicacionesFactory.getAll()
				.then(function(response) {
					$scope.aplicaciones = response;
					$scope.personas = [];

					PersonasFactory.getPersonas($scope.aplicaciones)
						.then(function(personas) {
							$scope.personas = personas;

							$scope.personas = borrarPersonasRepetidas($scope.personas);
							getEncuestas();
						});
				})
		}

		getAplicaciones();
		
		function getEncuestas() {
			var ids = [];
			var idPersonas = [];
			$scope.aplicaciones.forEach(function(aplicacion) {
				ids.push(aplicacion.encuesta_id);
				idPersonas.push(aplicacion.persona_id);
			});

			EncuestasFactory.getEncuestas(ids)
				.then(function(response) {
					$scope.encuestas = response;
					matchPersonasEncustas();
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

		//Agrega a la persona sus correspondientes encuestas
		function matchPersonasEncustas() {
			$scope.aplicaciones.forEach(function(aplicacion) {
				findPersona(aplicacion.persona_id, aplicacion.encuesta_id);
			});
			//console.log($scope.personas);
		}

		function getEncuesta(idEncuesta) {
			var encuestaAux = null;
			$scope.encuestas.forEach(function(encuesta) {

				if (encuesta.id === idEncuesta){
					encuestaAux = encuesta;
				}
			});
			return encuestaAux;
		}

		function findPersona(idPersona, idEncuesta) {
			$scope.personas.forEach(function(persona) {
				if (persona.id === idPersona){
					persona.encuestas.push(getEncuesta(idEncuesta));
				}
			});
		}

	}
})();
