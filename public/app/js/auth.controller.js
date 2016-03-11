(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('AuthController', AuthController);

	function AuthController($scope, $http, $auth, Auth) {
		$scope.credentials = {
			email: 'fauri@gmail.com',
			password: 'secret'
		};
		$scope.emptyData = false;
		$scope.errorLogin = false;
		$scope.login = login;

		$scope.$watch('credentials.email', validate);
        $scope.$watch('credentials.password', validate);

        function validate() {
            if (!$scope.credentials.email.length || !$scope.credentials.password.length) {
                $scope.emptyData = true;
            } else {
                $scope.emptyData = false;
            }
        }  

		function login() {
			$scope.errorLogin = false;

			$auth.login($scope.credentials)
			.then(function(response) {
				var inData = {
					email: $scope.credentials.email
				}
				$http({
					method: 'POST',
					url: 'api/authenticate/user' + $.param(response.data),
					data: inData
				})
				.then(function(data) {
					data.data[0].token = response.data.token;
					Auth.logIn(data.data[0]);
					
				}, function(err) {
					console.log(err);	
				});
			}, function(err) {
				console.log(err);
				$scope.errorLogin = true;
			});
		}
	}

})();