(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('PeriodosFactory', PeriodosFactory);

	function PeriodosFactory($http, $q) {
		var factory = {
			getPeriodoIdForAplicacion: getPeriodoIdForAplicacion
		};

		return factory;

		function getQuarter(month) {
			if (month >= 1 && month <= 4) {
				return 1;
			}
			else if (month >= 5 && month <= 8) {
				return 2;
			}
			else {
				return 3;
			}
		}

		function getPeriodoIdForAplicacion() {
			var date = new Date(),
			    defered = $q.defer();

			$http.get('api/periodos/getForAplicacion?anio='+date.getFullYear()+'&cuatrimestre='+getQuarter(date.getMonth()+1))
			.success(function(response) {
				defered.resolve(response[0].id);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
	}
})();