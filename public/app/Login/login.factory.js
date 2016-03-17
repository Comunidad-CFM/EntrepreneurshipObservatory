(function() {
	'use strict';

	angular
	.module('observatoryApp')
	.factory('LoginFactory', LoginFactory);

	function LoginFactory($http, $q) {
		var factory = {
			logIn: logIn
		};

		return factory;

		function logIn(email, contrasena) {
			var defered = $q.defer();
			var promise = defered.promise;

			var data = {
				email: email,
				contrasena: contrasena
			}

			$http({
				method: 'POST',
				url: '/api/personas/login',
				data: data
			})
			.success(function(response) {
				defered.resolve(response[0]);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return promise;
		}
	}

})();