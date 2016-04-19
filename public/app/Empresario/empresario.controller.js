(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EmpresarioController', EmpresarioController);

	function EmpresarioController($scope, $http, $cookies, Auth) {
		$scope.user = $cookies.getObject('session');
		$scope.logOut = logOut;
		$scope.tipoUsuario = false;
		$scope.s = s;

		function logOut() {
			Auth.logOut();
		}

		function s () {
			if($cookies.getObject('session').tipo === 'B'){
				$scope.tipoUsuario = false;
			}

		}
		s();
	}

})();