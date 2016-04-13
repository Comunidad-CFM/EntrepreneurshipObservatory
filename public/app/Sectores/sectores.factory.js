(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('SectoresFactory', SectoresFactory);

		function getAll() {
			var defered = $q.defer();
			var promise = defered.promise;
			
			$http.get('/api/sectores/todas')
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return promise;
		}
})();