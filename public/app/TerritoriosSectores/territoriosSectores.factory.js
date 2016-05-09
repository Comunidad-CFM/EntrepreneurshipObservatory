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
		.factory('TerritoriosSectoresFactory', TerritoriosSectoresFactory);

		function TerritoriosSectoresFactory($http, $q) {
		var factory = {						
			store: store,
		};

		return factory;

		/**
		* Almacenar un sector
		* @param {Object} Sector: Objeto a almacenar	
		* @returns {Object} El resultado del request de almacenar, si es correcto, da true
		*/
		function store(sector_id, territorio_id){
			var defered = $q.defer();
			var promise =  defered.promise;

			var data = {
				sector_id: sector_id,
				territorio_id: territorio_id
			};
			console.log(data);
			$http({
				method: 'POST',
				url: 'api/territoriosSectores/registro',
				data: data
			})
				.success(function(response){
					defered.resolve(response);
				})
				.error(function(err){
					defered.reject(err);
				});			

			return promise;
		}			
	}
})();