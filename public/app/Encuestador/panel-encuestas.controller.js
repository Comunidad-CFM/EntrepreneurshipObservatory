(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestadorPanelEncuestasController', EncuestadorPanelEncuestasController);

	function EncuestadorPanelEncuestasController($scope, EncuestasFactory, $cookies, AplicacionesFactory, PersonasFactory) {
		$scope.encuestador = $cookies.getObject('session').id;

		$scope.idsAplicaciones =  [];	//Ids Aplicaciones
		$scope.aplicaciones =  null;	//Aplicaciones
        //Encuesta
        $scope.encuestaId = 0;
        $scope.encuestaDescripcion = "";
		//Persona
		$scope.personas = [];
		// Funciones
		$scope.getAplicaciones = getAplicaciones;
		$scope.contestarEncuesta = contestarEncuesta;
		$scope.logOut = logOut;

		function logOut() {
			Auth.logOut();
		}

        function contestarEncuesta(idAplicacion, id, descripcion){
            $scope.encuestaId = id;
            $scope.encuestaDescripcion = descripcion;
			$scope.idAplicacion = idAplicacion;

			EncuestasFactory.setId(id);
			EncuestasFactory.setDescripcion(descripcion);
			EncuestasFactory.setIdAplicacion(idAplicacion);
        }

		function isInArray(value, array) {
			return array.indexOf(value) > -1;
		}

		// function borrarPersonasRepetidas(personas) {
		// 	var idsPersonas = [];
		// 	personas.forEach(function(persona) {
		// 		if (isInArray(persona.id, idsPersonas))
		// 			personas.splice(personas.indexOf(persona), 1);
		// 		else
		// 			idsPersonas.push(persona.id);
		// 	});
		// 	return personas;
		// }
		function destroyAplicacion(aplicaciones, aplicacion) {
			aplicaciones = aplicaciones.filter(function(item) {
				return aplicacion !== item;
			});
			return aplicaciones;
		}

		function groupByPerson(aplicaciones) {
			var i = 0,
				j = 0,
				index = 0,
				personas = [];

			for ( ; i < aplicaciones.length; i++) {
				personas.push({
					id: aplicaciones[i].idEmpresario,
					nombre: aplicaciones[i].nombre + ' ' + aplicaciones[i].apellido1 + ' ' + aplicaciones[i].apellido2,
					encuestas: []
				});
				
				for ( ; j < aplicaciones.length; j++) {
					if (personas[index].id === aplicaciones[j].idEmpresario) {
						personas[index].encuestas.push({
							id: aplicaciones[j].idEncuesta,
							descripcion: aplicaciones[j].descripcion,
							estado: aplicaciones[j].estado,
							idAplicacion: aplicaciones[j].idAplicacion
						});
						aplicaciones = destroyAplicacion(aplicaciones, aplicaciones[j]);
						j--;
					}
				}
				i = -1;
				j = 0;
				index++;
			}

			return personas;
		}
		console.log("cargo");
        //
		// function getAplicaciones() {
		// 	console.log("dfsgvdfs.vn sadlknsl");
        //
		// 	AplicacionesFactory.getAplicacionesPersonasEncuestas()
		// 		.then(function(response) {
		// 			$scope.personas = groupByPerson(response);
		// 			console.log("dfsgvdfs.vn sadlknsl");
        //
		// 			$scope.personas.forEach(function(persona) {
		// 				console.log("dfsgvdfs.vn sadlknsl");
		// 				persona.encuestas.forEach(function(encuesta) {
		// 					console.log(encuesta);
		// 				});
        //
		// 			});
        //
		// 		});
		// }
        //
		// getAplicaciones();
		
		// function getEncuestas() {
		// 	var ids = [];
		// 	var idPersonas = [];
		// 	$scope.aplicaciones.forEach(function(aplicacion) {
		// 		ids.push(aplicacion.encuesta_id);
		// 		idPersonas.push(aplicacion.persona_id);
		// 	});
        //
		// 	EncuestasFactory.getEncuestas(ids)
		// 		.then(function(response) {
		// 			$scope.encuestas = response;
		// 			$scope.encuestas.forEach(function(encuesta) {
		// 				console.log(encuesta);
		// 			});
		// 			matchPersonasEncustas();
		// 		});
		// }
        //
		// //Agrega a la persona sus correspondientes encuestas
		// function matchPersonasEncustas() {
		// 	$scope.aplicaciones.forEach(function(aplicacion) {
		// 		findPersona(aplicacion.persona_id, aplicacion.encuesta_id);
		// 	});
		// 	$scope.personas.forEach(function(persona) {
		// 		persona.encuestas.forEach(function(encuesta) {
		// 			encuesta.idAplicacion = getIdAplicacion(persona.id,encuesta.id);
		// 		});
		// 		console.log("persona aplicacion", persona);
        //
		// 	});
        //
		// }
        //
		// function getIdAplicacion(idPersona, idEncuesta) {
		// 	var id = null;
		// 	$scope.idsAplicaciones.forEach(function(idApl) {
		// 		if (idApl[0] === idPersona && idApl[1] === idEncuesta){
		// 			id = idApl[2];
		// 		}
		// 	});
		// 	return id;
		// }
        //
		// function getEncuesta(idPersona, idEncuesta) {
		// 	var encuestaAux = null;
		// 	$scope.encuestas.forEach(function(encuesta) {
        //
		// 		if (encuesta.id === idEncuesta){
		// 			findAplicacion(idPersona, idEncuesta);
		// 			encuestaAux = encuesta;
		// 		}
		// 	});
		// 	return encuestaAux;
		// }
        //
		// function findPersona(idPersona, idEncuesta) {
		// 	$scope.personas.forEach(function(persona) {
		// 		if (persona.id === idPersona){
		// 			persona.encuestas.push(getEncuesta(idPersona, idEncuesta));
		// 		}
		// 	});
		// }
        //
		// function findAplicacion(idPersona, idEncuesta) {
		// 	$scope.aplicaciones.forEach(function(aplicacion) {
		// 		if (aplicacion.persona_id === idPersona && aplicacion.encuesta_id === idEncuesta){
		// 			$scope.idsAplicaciones.push([aplicacion.persona_id,aplicacion.encuesta_id,aplicacion.id]);
		// 		}
		// 	});
		// }
	}
})();
