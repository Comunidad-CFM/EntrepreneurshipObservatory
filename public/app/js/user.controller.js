(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('UserController', UserController);

	function UserController($scope, $http, $rootScope, API_AUTH) {
		$scope.user;
		$scope.error;
		$scope.getUsers = getUsers;

		function getUsers() {
			$http.get(API_AUTH + '?' + $.param($rootScope.token))
			.success(function(response) {
				$scope.users = response;
			})
			.error(function(err) {
				$scope.error = err;
			});	
		}
	}

})();