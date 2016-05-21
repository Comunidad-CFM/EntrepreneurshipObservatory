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
		* Calcular el porcentaje de personas que contestaron la encuesta en determinado 		
		*/
		function calcularPorcentaje () {
			var totalEmpresarios,
				porcentajeTerritorios,
				muestra = 0;
			PersonasFactory.getByTerritory(2)
				.then(function (response) {
					totalEmpresarios = response;				

					AplicacionesFactory.getForSurvey(1)
						.then(function (response) {																				

							totalEmpresarios.forEach( function(empresario) {
								response.forEach( function(element) {
									if(element.idPersona === empresario.id){
										muestra += 1;
									}
								});
							});

							console.log(muestra);
							console.log(totalEmpresarios.length);
							porcentajeTerritorios = ( muestra * 100)/totalEmpresarios.length;
							console.log('El porcentaje de empresarios del territorio que participaron es de '+porcentajeTerritorios+'%');

						})
				});
		}

		calcularPorcentaje();
	}
})();