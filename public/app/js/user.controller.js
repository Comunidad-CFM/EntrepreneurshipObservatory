(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('UserController', UserController);

	function UserController($scope, $http, $cookies, Auth, API_AUTH) {
		$scope.user = $cookies.getObject('session');
		$scope.users;
		$scope.error;
		$scope.getUsers = getUsers;
		$scope.logOut = logOut;

		function getUsers() {
			$http.get('api/authenticate/token')
			.then(function(isAuthenticated) {
				if(isAuthenticated.data[0] === 'user_found'){
					$http.get(API_AUTH)
					.success(function(response) {
						$scope.users = response;
					})
					.error(function(err) {
						$scope.error = err;
					});
				}
				else {
					console.log('Error en el token');
				}
            });
		}

		function logOut() {
			Auth.logOut();
		}
	}

})();