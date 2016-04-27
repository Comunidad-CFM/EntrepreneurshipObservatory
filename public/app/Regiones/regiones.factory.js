/**
* Entrepreneurship Observatory
*
* @authors Fauricio Rojas Hernández, Manfred Artavia Gómez y Carlos Jiménez González.
* @version 1.0
*/
(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('RegionesFactory', RegionesFactory);

		function RegionesFactory($http, $q) {
		var factory = {
			getAll: getAll
		};

		return factory;

		function getAll() {
			var defered = $q.defer();
			var promise = defered.promise;
			
			$http.get('/api/regiones/todas')
			.success(function(response) {				
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return promise;
		}
	}
})();