(function () {
	 'use strict';

	 angular.module('observatoryApp')
	 .controller('AnalisisController', AnalisisController);

	 /**
	* Controlador del análisis.
	* @param {Object} Servicio que permite la unión entre el HTML y el controlador.
	* @param {Object} Servicio que brinda funciones del analisis al controlador.
	*/
	function AnalisisController ($scope, AnalisisFactory) {		
		$scope.get = get;

		function get() {
			AnalisisFactory.get(1)
			.then(function(response) {
				console.log(response);
			});
		}

		get();
	}
})();