(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('AnalisisFactory', AnalisisFactory);

	function AnalisisFactory($http, $q) {
		var factory = {
			get: get
		};

		return factory;

		function get(idPeriodo) {
			var defered = $q.defer();

			$http({
				method: 'GET',
				url: 'api/analisis/get/' + idPeriodo
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
	}
})();