(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestadorController', EncuestadorController);

	function EncuestadorController($scope, $http, $cookies, Auth) {
		$scope.user = $cookies.getObject('session');
		$scope.logOut = logOut;
		$scope.tipoUsuario = false;

		function logOut() {
			Auth.logOut();
		}
	}

})();
