/**
* Entrepreneurship Observatory
*
* @authors Fauricio Rojas Hernández, Manfred Artavia Gómez y Carlos Jiménez González.
* @version 1.0
*/
(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('LoginController', LoginController);

	function LoginController($scope, LoginFactory, Auth) {
		$scope.email = 'fauri@gmail.com';
		$scope.contrasena = '12345';
		$scope.error = false;
		$scope.logIn = logIn;
		$scope.goBottom = goBottom;

		function logIn() {		
			$scope.error = false;

			LoginFactory.logIn($scope.email, $scope.contrasena)
			.then(function(response) {
				if(response !== undefined) {
					Auth.logIn(response);					
				}
				else {
					$scope.error = true;
				}
			});
		}

		function goBottom() {
	        $('html, body').animate({ 
	        	scrollTop: $(document).height() 
	        }, 1500);
		}
	}

})();