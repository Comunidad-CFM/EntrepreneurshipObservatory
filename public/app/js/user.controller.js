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
			$http.get(API_AUTH + '?token=' + $scope.user.token)
			.success(function(response) {
				$scope.users = response;
			})
			.error(function(err) {
				$scope.error = err;
			});	
		}

		function logOut() {
			Auth.logOut();
		}
	}

})();