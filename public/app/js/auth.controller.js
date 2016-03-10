(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('AuthController', AuthController);

	function AuthController($scope, $auth, $state, $rootScope) {
		$scope.email = 'fauri@gmail.com';
		$scope.password = 'secret';
		$scope.login = login;

		function login() {
			var credentials = {
				email: $scope.email,
				password: $scope.password
			};

			$auth.login(credentials)
			.then(function(response) {
				$rootScope.token = response.data;
				$state.go('users', {});
			})
		}
	}

})();