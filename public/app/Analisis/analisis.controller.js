/**
* Entrepreneurship Observatory
*
* @authors Fauricio Rojas Hernández, Manfred Artavia Gómez y Carlos Jiménez González.
* @version 1.0
*/
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
			$scope.ICEBySector = [];
			$scope.sectores.forEach(function(sector){
				$scope.ICEBySector.push(AnalisisFactory.calculateICEBySector(sector.nombre,$scope.answers));
			});

			var ns = AnalisisFactory.calculateNs($scope.ICEBySector),
				n = AnalisisFactory.calculateN(ns),
                ps = AnalisisFactory.calculatePs(ns,n),
                nir,
                pir,
                xir;

            console.log('ICEBySector ->',$scope.ICEBySector);
            console.log("------------------------------");
            console.log('ns ->',ns);
		 	console.log('n ->',n);
            console.log('ps ->',ps);
		 	console.log("------------------------------");
		 	nir = AnalisisFactory.calculateNir($scope.ICEBySector, $scope.indicadores);
		 	console.log('nir ->',nir);
		 	console.log("------------------------------");
		 	pir = AnalisisFactory.calculatePir(nir, n);
		 	console.log('pir ->', pir);
		 	console.log("------------------------------");
		 	xir = AnalisisFactory.calculateXir(pir);
		 	console.log('xir ->', xir);
		}

 		getSectores();
	 	getIndicadores();
	 	get();
	}
})();