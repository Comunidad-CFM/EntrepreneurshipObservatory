(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('AplicacionesRespuestasFactory', AplicacionesRespuestasFactory);

	function AplicacionesRespuestasFactory($http, $q) {
		var factory = {
			store: store,
			remove: remove,
			getAll: getAll
		};

		return factory;

		function store(data) {
			var defered = $q.defer();

			$http({
				method: 'POST',
				url: 'api/aplicaciones-respuestas/store',
				data: data
			})
			.success(function(response) {
				console.log("agrego");
				defered.resolve(response);
			})
			.error(function(err) {
				console.log(err);
				defered.reject(err);
			});

			return defered.promise;
		}

		function remove(id) {
			var defered = $q.defer(),
				data = {
					id: id
				};

			$http({
				method: 'POST',
				url: '/aplicaciones-respuestas/remove',
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

		function getAll() {
			var defered = $q.defer();

			$http.get('api/aplicaciones-respuestas/todas')
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
