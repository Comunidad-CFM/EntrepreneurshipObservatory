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
		
	}
})();