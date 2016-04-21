(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('AdminController', AdminController);

	function AdminController($scope, $http, $cookies, Auth) {
		$scope.user = $cookies.getObject('session');
		$scope.logOut = logOut;
		$scope.update = update;
		$scope.changePass = changePass;

		setData();

		function setData() {
			$scope.currentPass = '';
			$scope.newPass = '';
			$scope.passConf = '';
		}
		function cleanForm() {
            $scope.formPass.$setPristine();
        }

		function update() {
			console.log('UPDATE');
		}

		function changePass() {
			console.log('CHANGE');
			setData();
			cleanForm();
		}

		function logOut() {
			Auth.logOut();
		}
	}

})();