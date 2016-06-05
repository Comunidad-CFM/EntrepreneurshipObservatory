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

		 /**
		  * Agrupa las respuestas de las encuestas por sector
		  * @param{Array} lista de respuestas de la encuesta del presente periodo
		  * @return {Array} lista con los resultados para cada sector
		  */
	 	function groupByEntrepreneur(answers){
			$scope.answers = AnalisisFactory.groupByEntrepreneur(answers);
			console.log($scope.answers);
			$scope.sectoresScores = [];
			$scope.sectores.forEach(function(sector){
				$scope.sectoresScores.push(AnalisisFactory.calculateICEBySector(sector.nombre,$scope.answers));
			});
			 var ns = AnalisisFactory.calculateNs($scope.sectoresScores),
                 ps = AnalisisFactory.calculatePs(ns);

            console.log($scope.sectoresScores);
            console.log("------------------------------");
            console.log(ns);
            console.log("------------------------------");
            console.log(ps);
		}



 		getSectores();
	 	getIndicadores();
	 	get();
	}
})();