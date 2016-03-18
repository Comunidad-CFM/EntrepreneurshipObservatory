(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('EncuestasFactory', EncuestasFactory);

	function EncuestasFactory($http, $q) {
		var factory = {
			store: store,
			getAll: getAll
		};

		return factory;

		function store(encuesta) {
			var defered = $q.defer();
			var promise = defered.promise;
		}
		function getAll() {
			var defered = $q.defer();
			var promise = defered.promise;
		}
	}
})();