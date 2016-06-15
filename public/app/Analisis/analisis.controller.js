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
		function get() {
			AnalisisFactory.get(3)
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
				$scope.ICEBySector.push(AnalisisFactory.calculateICEBySector(sector.nombre, $scope.answers));
			});

			var ns = AnalisisFactory.calculateNs($scope.ICEBySector),
				n = AnalisisFactory.calculateN(ns),
                ps = AnalisisFactory.calculatePs(ns,n),
                nir,
                pir,
                xir,
                nsir = [],
                psir,
                xsir,
                indicadoresER,
                its,
                iti,
                prom;

            console.log('ICEBySector ->', $scope.ICEBySector);
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
		 	console.log("------------------------------");
		 	$scope.sectores.forEach(function(sector) {
		 		nsir.push(AnalisisFactory.calculateNsir($scope.ICEBySector, $scope.indicadores, sector));
		 	});
		 	console.log('nsir ->', nsir);
		 	console.log("------------------------------");
		 	psir = AnalisisFactory.calculatePsir(nsir, ns);
		 	console.log('psir ->', psir);


		 	console.log("------------------------------");
		 	xsir = AnalisisFactory.calculateXsir(psir);
		 	console.log('xsir ->', xsir);

		 	console.log("------------------------------");
		 	indicadoresER = AnalisisFactory.calculateIndicadoresER("Quesada", xsir);
		 	console.log('Indicadores ER ->', indicadoresER);


		 	console.log("------------------------------");
		 	its = AnalisisFactory.calculateITS(xsir);
		 	console.log('Indicadores ITS ->', its);

		 	console.log("------------------------------");
		 	iti = AnalisisFactory.calculateITI(indicadoresER, ps);
		 	console.log('Indicadores ITI ->', iti);

		 	console.log("------------------------------");
		 	prom = AnalisisFactory.prom(its, ps);
		 	console.log('prom ->', prom);
		 	
		}

 		getSectores();
	 	getIndicadores();
	 	get();
	}
})();