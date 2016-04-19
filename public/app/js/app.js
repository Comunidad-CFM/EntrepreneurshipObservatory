(function() {
	'use strict';

	angular
		.module('observatoryApp', ['ngCookies', 'ngMaterial', 'ui.router', 'dndLists'])
		.factory('Auth', Auth)
        .filter('user', user)
        .filter('estado', estado)
		.config(config)
        .run(run);

    function Auth($cookies, $state) {
	    return {
	        logIn: logIn,
	        logOut: logOut,
	        checkStatus: checkStatus,
	        inArray: inArray
	    }

	    function logIn(user) {
            $cookies.putObject('session', user);
            
            if (user.tipo === 'A') {
                $state.go('admin');
            }
        }

        function logOut() {
            $cookies.remove('session');
            $state.go('login');
        }

        function checkStatus() {
            var rutasPrivadas = ['login','admin'];
            
            if (this.inArray($state.go(), rutasPrivadas) && typeof($cookies.get('session')) == "undefined") {
                $state.go('login');
            }
            else if (this.inArray($state.go(), rutasPrivadas) && typeof($cookies.get('session')) != "undefined") {
                if ($cookies.getObject('session').tipo === 'A') {
                    $state.go('admin');
                }
            }
        }

        function inArray(needle, haystack) {
            var key = '';
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
            return false;
        }
	}
	
    function user() {
        var filter = function(usuario) {
            if (usuario === 'A') {
                return 'Administrador';
            }
            else if (usuario === 'B') {
                return 'Empresario';
            }
            else {
                return 'Encuestador';
            }
        }

        return filter;
    }

    function estado() {
        var filter = function(estado) {
            if (estado === 0) {
                return 'inactiva';
            }
            else {
                return 'activa';
            }
        }

        return filter;
    }

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('admin', {
                url: '/admin',
                templateUrl: './app/Admin/admin.view.html',
                controller: 'AdminController'
            })
            .state('login', {
                url: '/',
                templateUrl: './app/Login/login.view.html',
                controller: 'LoginController'
            })
    }
    function run($rootScope, Auth) {
        $rootScope.$on('stateChangeSuccess', function() {
            Auth.checkStatus();
        });
    }

}());