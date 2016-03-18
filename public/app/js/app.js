(function() {
	'use strict';

	angular
		.module('observatoryApp', ['ngRoute', 'ngCookies'])
		.factory('Auth', Auth)
        .directive('userType', tipoUsuario)
		.config(config)
        .run(run);

    function Auth($cookies, $location) {
	    return {
	        logIn: logIn,
	        logOut: logOut,
	        checkStatus: checkStatus,
	        inArray: inArray
	    }

	    function logIn(user) {
            $cookies.putObject('session', user);
            
            if(user.tipo === 'A')
               $location.path('/admin');
        }

        function logOut() {
            $cookies.remove('session');
			$location.path('/');
        }

        function checkStatus() {
            var rutasPrivadas = ['/','/admin'];
            
            if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) == "undefined") {
                $location.path("/");
            }
            else if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) != "undefined") {
                if($cookies.getObject('session').tipo === 'A')
	               $location.path('/admin');
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
	
    function tipoUsuario(tipo) {
        switch(tipo) {
            case 'A':
                return 'Administrador';
                break;
            case 'B':
                return 'Empresario';
                break;
            case 'E':
                return 'Encuestador';
                break;
            default:
                return '';
                break;
        }
    }

	function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './app/Login/login.view.html',
                controller: 'LoginController'
            })
            .when('/admin', {
                templateUrl: './app/Admin/admin.view.html',
                controller: 'AdminController'
            })
            .otherwise('/');
	}

    function run($rootScope, Auth) {
        $rootScope.$on('$routeChangeStart', function() {
            Auth.checkStatus();
        });
    }

}());