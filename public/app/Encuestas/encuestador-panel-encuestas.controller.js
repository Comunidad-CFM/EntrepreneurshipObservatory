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

        function contestarEncuesta(idAplicacion, id, descripcion){
        	console.log(idAplicacion);
            $scope.encuestaId = id;
            $scope.encuestaDescripcion = descripcion;
			$scope.idAplicacion = getIdAplicacion(id);

			EncuestasFactory.setId(id);
			EncuestasFactory.setDescripcion(descripcion);
			EncuestasFactory.setIdAplicacion(idAplicacion);
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
					console.log(response)
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
				})
				.then(function() {
					var personas = $scope.personas.slice();
					console.log("aplicaciones",$scope.aplicaciones)
        			console.log("inicio",personas)

        			personas.forEach(function(persona) {
						persona.encuestas.forEach(function(encuesta) {
							var id = getIdAplicacionByPersonaEncuesta(persona.id, encuesta.id);
							console.log(id);
							encuesta.idAplicacion = id;
						});
					});
        			console.log("fin",personas)
				});
		}

		function getIdAplicacionByPersonaEncuesta(idPersona, idEncuesta) {
			var i = 0,
				length = $scope.aplicaciones.length;

			for ( ; i < length; i++) {
				console.log($scope.aplicaciones[i].encuesta_id, idEncuesta, ' - ', $scope.aplicaciones[i].persona_id, idPersona)
				if($scope.aplicaciones[i].encuesta_id === idEncuesta && $scope.aplicaciones[i].persona_id === idPersona) {
					return $scope.aplicaciones[i].id;
				}
			};

			return null;
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
