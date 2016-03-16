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
		$scope.token;

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
			.then(function(token) {
				$scope.token = token.data.token;
				return $http.get('api/authenticate/token');
			}, function(err) {
				console.log(err);
				$scope.errorLogin = true;
			})
			.then(function(isAuthenticated) {
				if(isAuthenticated.data[0] === 'user_found'){
					//$http.get('api/authenticate/user?email=' + $scope.credentials.email)
					$http.get('api/user?email=' + $scope.credentials.email)
					.success(function(user) {
						user[0].token = $scope.token; // Se agrega el token a la info del user
						Auth.logIn(user[0]); // Se manda a almacenar en las cookies y se renderiza
					})
					.error(function(err) {
						console.log('Error en getUser ->',err);
					});
				}
				else {
					console.log('Error en el token');
				}
            });
		}
	}

})();