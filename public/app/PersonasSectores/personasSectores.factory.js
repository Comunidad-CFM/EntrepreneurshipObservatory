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
		.factory('PersonasSectoresFactory', PersonasSectoresFactory);

		function PersonasSectoresFactory($http, $q) {
		var factory = {
			store: store
		};

		return factory;

		function store(personaId, sectoresId) {
					
			var defered = $q.defer(),
				data = {
					personaId : personaId,
					sectoresId : sectoresId
				};							
			$http({				
				method: 'POST',
				url: '/api/personasSectores/registro',
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