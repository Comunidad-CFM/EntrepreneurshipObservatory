(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('AplicacionesFactory', AplicacionesFactory);

	function AplicacionesFactory($http, $q) {
		var factory = {
			getForSurvey: getForSurvey
		};

		return factory;

		function getForSurvey(idEncuesta) {
			var defered = $q.defer(),
				data = {
					idEncuesta: idEncuesta
				};
			
			$http({
				method: 'POST',
				url: 'api/aplicaciones/getForSurvey',
				data: data
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