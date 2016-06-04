(function () {
	 'use strict';

	 angular.module('observatoryApp')
	 .controller('AnalisisController', AnalisisController);

	 /**
	* Controlador del análisis.
	* @param {Object} Servicio que permite la unión entre el HTML y el controlador.
	* @param {Object} Servicio que brinda funciones del analisis al controlador.
	*/
	function AnalisisController ($scope, AnalisisFactory, IndicadoresFactory, SectoresFactory) {		
		// $scope.get = get;

		function get() {
			AnalisisFactory.get(1)
			.then(function(response) {
				return response;
			})
			.then(function (response) {
				groupByEntrepreneur(response);
			});
		}

		function getIndicadores () {
			IndicadoresFactory.getAll()
				.then(function (response) {
					$scope.indicadores = response;
				});
		}

		function getSectores () {
			SectoresFactory.getAll()
				.then(function (response) {
					$scope.sectores = response;
				});
		}

	 	function groupByEntrepreneur(answers){
			$scope.answers = AnalisisFactory.groupByEntrepreneur(answers);
			console.log($scope.answers);
		}

	 	get();
		getSectores();
	 	getIndicadores();


	}
})();