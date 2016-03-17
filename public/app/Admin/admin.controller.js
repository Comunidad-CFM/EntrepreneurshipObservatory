(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('AdminController', AdminController);

	function AdminController($scope, $http, $cookies, Auth) {
		$scope.user = $cookies.getObject('session');
		$scope.logOut = logOut;

		function logOut() {
			Auth.logOut();
		}
	}

})();