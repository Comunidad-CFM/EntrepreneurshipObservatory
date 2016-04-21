(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EmpresarioController', EmpresarioController);

	function EmpresarioController($scope, $http, $cookies, Auth) {
		$scope.user = $cookies.getObject('session');
		$scope.logOut = logOut;
		$scope.tipoUsuario = false;

		function logOut() {
			Auth.logOut();
		}
	}

})();