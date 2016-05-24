(function () {
	 'use strict';

	 angular.module('observatoryApp')
	 .controller('AnalisisController', AnalisisController);

	 /**
	* Controlador del análisis.
	* @param {Object} Servicio que permite la unión entre el HTML y el controlador.
	* @param {Object} Servicio que proporciona autenticación y renderización de vistas.
	* @param {Object} Servicio que brinda funciones del log in al controlador.
	*/
	function AnalisisController ($scope, TerritoriosFactory, SectoresFactory, PersonasSectoresFactory, PersonasFactory, AplicacionesFactory) {		
		var personasSectores = [],
			personasTerritorio = [],
			personas = [],
			sectores = [];
		// obtener todos los enpresarios dado un territorio.
		// obtener las encuestas ligadas a personas de un determinado territorio
		function getPersonas(){
			PersonasFactory.getAll()
				.then(function(response){
					personas = response;
				});
		}
		getPersonas();

		function getPersonasSectores () {
			PersonasSectoresFactory.getAll()
			 	.then(function(response){
					personasSectores = response;
				});
		}
		//getPersonasSectores();

		function getSectores () {
			SectoresFactory.getAll()
			 	.then(function(response){
					sectores = response;
				});
		}
		getSectores();

		
		/*
		* Calcular el porcentaje de personas que contestaron la encuesta en determinado territorio		
		* obtiene la lista de empresarios relacionados a un territorio y la lista de encuestados que
		* respondieron una determinada encuesta.
		* @param {int} id del territorio que se desea analizar
		* @param {int} id de la encuesta a la que pertenece el resultado
		*/
		function calcularPorcentaje (territorio, encuesta) {
			var totalEmpresarios,
				porcentajeTerritorios,
				muestra = 0;
			PersonasFactory.getByTerritory(territorio)
				.then(function (response) {
					totalEmpresarios = response;				

					AplicacionesFactory.getForSurvey(encuesta)
						.then(function (response) {

							totalEmpresarios.forEach( function(empresario) {
								response.forEach( function(element) {
									if(element.idPersona === empresario.id && element.encuestador.length > 0){
										muestra += 1;
									}
								});
							});
							console.log("Muestra: "+muestra);
							console.log(totalEmpresarios.length);
							porcentajeTerritorios = ( muestra * 100)/totalEmpresarios.length;
							console.log('El porcentaje de empresarios del territorio que participaron es de '+porcentajeTerritorios+'%');

						})
				});
		}
		//calcularPorcentaje(2,1);

		/*
		* Calcular el porcentaje de personas que contestaron la encuesta en determinado sector		
		* obtiene la lista de empresarios relacionados a un sector y la lista de encuestados que
		* respondieron una determinada encuesta.
		* @param {int} id del sector que se desea analizar
		* @param {int} id de la encuesta a la que pertenece el resultado
		*/
		function calcularPorcentajeSector (sector, encuesta) {
			var totalEmpresarios,
				porcentajeTerritorios,
				muestra = 0;
			PersonasFactory.getBySector(sector)
				.then(function (response) {
					totalEmpresarios = response;		
					console.log(totalEmpresarios);							
					AplicacionesFactory.getForSurvey(encuesta)
						.then(function (response) {																											
							console.log(response);
							totalEmpresarios.forEach( function(empresario) {
								response.forEach( function(element) {
									if(element.idPersona === empresario.idPersona){
										muestra += 1;
									}
								});
							});
							console.log(muestra);
							console.log(totalEmpresarios.length);
							porcentajeTerritorios = ( muestra * 100)/totalEmpresarios.length;
							console.log('El porcentaje de empresarios del Sector que participaron es de '+porcentajeTerritorios+'%');

						})
				});
		}
		//calcularPorcentaje(3,1);
		 calcularPorcentajeSector(2,1);
		
	}
})();