(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('SectoresIndicadoresFactory', SectoresIndicadoresFactory);

	/**
	* Factory de sectores indicadores.
	* @param {Object} Servicio que realiza una solicitud al servidor y devuelve una respuesta.
	* @param {Object} Servicio que ayuda a ejecutar funciones de forma asíncrona.
	* @returns {Object} Objeto con los metodos del factory.
	*/
	function SectoresIndicadoresFactory($http, $q) {
		var factory = {
			store: store,
			remove: remove,
			gerForIndicador: gerForIndicador
		};

		return factory;

		function store(indicadorId, sectoresId) {
			var defered = $q.defer(),
				data = {
					indicadorId: indicadorId,
					sectoresId: sectoresId
				};

			$http({
				method: 'POST',
				url: '/api/sectoresIndicadores/store',
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

		function remove(sectoresIndicadoresId) {

		}

		function gerForIndicador(id) {
			var defered = $q.defer();

			$http({
				method: 'GET',
				url: '/api/sectoresIndicadores/getForIndicador/' + id
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