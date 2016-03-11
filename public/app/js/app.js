(function() {
	'use strict';

	angular
		.module('observatoryApp', ['satellizer', 'ngRoute', 'ngCookies'])
		.factory('Auth', Auth)
		.config(config)
        .run(run)
        .constant('API_AUTH', '/api/authenticate');

    function Auth($cookies, $location) {
	    return {
	        logIn: logIn,
	        logOut: logOut,
	        checkStatus: checkStatus,
	        inArray: inArray
	    }

	    function logIn(user) {
            $cookies.putObject('session', user);
            
            $location.path('/user');
        }

        function logOut() {
            $cookies.remove('session');
			$location.path('/');
        }

        function checkStatus() {
            var rutasPrivadas = ['/','/user'];
            
            if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) == "undefined") {
                $location.path("/");
            }
            else if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) != "undefined") {
	            $location.path('/user');
            }
        }

        function inArray(needle, haystack) {
            var key = '';
            for(key in haystack) {
                if(haystack[key] == needle) {
                    return true;
                }
            }
            return false;
        }
	}
	
	function config($routeProvider, $authProvider, API_AUTH) {
		// Se le indica a Satellizer cual es la dirección de la API
        $authProvider.loginUrl = API_AUTH;

        $routeProvider
            .when('/', {
                templateUrl: './app/templates/auth.view.html',
                controller: 'AuthController'
            })
            .when('/user', {
                templateUrl: './app/templates/user.view.html',
                controller: 'UserController'  
            })
            .otherwise('/');
	}

    function run($rootScope, Auth) {
        $rootScope.$on('$routeChangeStart', function() {
            Auth.checkStatus();
        });
    }

}());