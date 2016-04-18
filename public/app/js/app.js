(function() {
	'use strict';

	angular
		.module('observatoryApp', ['ngCookies', 'ngMaterial', 'ngRoute', 'dndLists'])
		.factory('Auth', Auth)
        .filter('user', user)
        .filter('estado', estado)
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
            else if(user.tipo === 'B')
                $location.path('/empresario');
        }

        function logOut() {
            $cookies.remove('session');
			$location.path('/');
        }

        function checkStatus() {
            var rutasPrivadas = ['/','/admin','/empresario'];
            
            if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) == "undefined") {
                $location.path("/");
            }
            else if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) != "undefined") {
                if($cookies.getObject('session').tipo === 'A')
	               $location.path('/admin');
            }
            else if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) != "undefined") {
                if($cookies.getObject('session').tipo === 'B')
                    $location.path('/empresario');
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
	
    function user() {
        var filter = function(usuario) {
            if(usuario === 'A')
                return 'Administrador';
            else if(usuario === 'B')
                return 'Empresario';
            else
                return 'Encuestador';
        }

        return filter;
    }

    function estado() {
        var filter = function(estado) {
            if(estado === 0)
                return 'inactiva';
            else
                return 'activa';
        }

        return filter;
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
            .when('/empresario', {
                templateUrl: './app/Empresario/empresario.view.html',
                controller: 'EmpresarioController'
            })
            .otherwise('/');
	}

    function run($rootScope, Auth) {
        $rootScope.$on('$routeChangeStart', function() {
            Auth.checkStatus();
        });
    }

}());