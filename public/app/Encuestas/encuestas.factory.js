(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('EncuestasFactory', EncuestasFactory);

	function EncuestasFactory($http, $q) {
		var factory = {
			store: store,
			getAll: getAll,
			edit: edit
		};

		return factory;

		function store(encuesta) {
			var defered = $q.defer();

			$http({
				method: 'POST',
				url: 'api/encuestas/registro',
				data: encuesta
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

			$http.get('api/encuestas/todas')
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		function edit(id, descripcion, fecha) {
			var defered = $q.defer();
			var data = {
				id: id,
				descripcion: descripcion,
				fecha: fecha
			};
			$http({
	            method: 'POST',
	            url: 'api/encuestas/update',
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