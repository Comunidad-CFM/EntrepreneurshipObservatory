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
	function AnalisisController ($scope, TerritoriosFactory, PersonasSectoresFactory, PersonasFactory) {
		var personasSectores = [],
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
		getPersonasSectores();

		function getSectores () {
			SectoresFactory.getAll()
			 	.then(function(response){
					sectores = response;
				});
		}
		getSectores();

		function calcularPorcentaje () {
			personasSectores.forEach( function(personaSector) {
				
			});
		}
	}
})();