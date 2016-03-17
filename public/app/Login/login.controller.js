(function() {
	'use strict';

	angular
	.module('observatoryApp')
	.controller('LoginController', LoginController);

	function LoginController($scope, $http, LoginFactory, Auth) {
		$scope.email = 'fauri@gmail.com';
		$scope.contrasena = '12345';
		$scope.error = false;
		$scope.logIn = logIn;

		function logIn() {
			$scope.error = false;

			LoginFactory.logIn($scope.email, $scope.contrasena)
			.then(function(response) {
				if(response !== undefined) {
					Auth.logIn(response);					
				}
				else {
					$scope.error = true;
				}
			});
		}
	}

})();