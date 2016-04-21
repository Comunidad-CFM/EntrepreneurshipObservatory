(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('AplicacionesFactory', AplicacionesFactory);

	function AplicacionesFactory($http, $q) {
		var factory = {
			getForSurvey: getForSurvey,
			store: store,
			remove: remove
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

		function store(entrepreneurs, idPeriodo, fecha, idEncuesta) {
			var defered = $q.defer(),
				data = {
					entrepreneurs: entrepreneurs,
					idPeriodo: idPeriodo,
					fecha: fecha,
					idEncuesta: idEncuesta
				};

			$http({
				method: 'POST',
				url: 'api/aplicaciones/store',
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

		function remove(aplications) {
			var defered = $q.defer(),
				data = {
					aplications: aplications
				};

			$http({
				method: 'POST',
				url: 'api/aplicaciones/remove',
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