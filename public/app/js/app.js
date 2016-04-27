/**
* Entrepreneurship Observatory
*
* @authors Fauricio Rojas Hernández, Manfred Artavia Gómez y Carlos Jiménez González.
* @version 1.0
*/
(function() {
	'use strict';

	angular
		.module('observatoryApp', ['ngCookies', 'ngMaterial', 'ui.router', 'dndLists'])
		.factory('Auth', Auth)
        .filter('user', user)
        .filter('estado', estado)
		.config(config)
        .run(run);

    function Auth($cookies, $location, $rootScope) {
        var cont = 0;
	    return {
	        logIn: logIn,
	        logOut: logOut,
	        checkStatus: checkStatus,
	        inArray: inArray
	    }

        function savePreviousUrl() {
            if (cont === 0) {
                $rootScope.url = $location.path();
                cont++;
            }
        }

	    function logIn(user) {
            $cookies.putObject('session', user);

            if ($rootScope.url !== undefined) {
                $location.path($rootScope.url);
                cont = 0;
            }
            else {
                if (user.tipo === 'A') {
                    $location.path('admin');
                }
                else if (user.tipo === 'B') {
                    $location.path('empresario');
                }
            }
        }

        function logOut() {
            $cookies.remove('session');
            $location.path('login');
        }

        function checkStatus() {            
            var rutasPrivadas = ['/','/admin', '/admin/encuestas', '/admin/personas', '/admin/preguntas', '/empresario', '/empresario/contestar'];
            
            if ($location.path() !== '/' && typeof($cookies.get('session')) === "undefined") {
                savePreviousUrl();
                $location.path('autenticacion');
            }
            else if (this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) === "undefined") {
                $location.path('login');
            }
            else if (this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) !== "undefined") {
                if($cookies.getObject('session').tipo === 'A') {
                    if ($location.path() === '/admin' || $location.path() === '/') {
                        $location.path('admin');
                    }
                }
                else if($cookies.getObject('session').tipo === 'B') {
                    if ($location.path() === '/empresario' || $location.path() === '/') {
                        $location.path('empresario');
                    }
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
            .state('login', {
                url: '/',
                templateUrl: './app/Login/login.html',
                controller: 'LoginController'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: './app/Admin/admin.html',
                controller: 'AdminController'
            })
            .state('admin.perfil', {
                url: '/perfil',
                templateUrl: './app/Admin/perfil.html',
                controller: 'AdminController'
            })
            .state('admin.encuestas', {
                url: '/encuestas',
                templateUrl: './app/Encuestas/encuestas.html',
                controller: 'EncuestasController'
            })
            .state('admin.personas', {
                url: '/personas',
                templateUrl: './app/Personas/personas.html',
                controller: 'PersonasController'
            })
            .state('admin.preguntas', {
                url: '/preguntas',
                templateUrl: './app/Preguntas/preguntas.html',
                controller: 'PreguntasController'
            })
            .state('empresario', {
                url: '/empresario',
                templateUrl: './app/Empresario/empresario.html',
                controller: 'EmpresarioController'
            })
            .state('empresario.contestar', {
                url: '/contestar',
                templateUrl: './app/Encuestas/contestar-encuestas.html',
                controller: 'ContestarEncuestasController'
            })
            .state('autenticacion', {
                url: '/autenticacion',
                templateUrl: './app/Autenticacion/autenticacion.html',
                controller: 'AutenticacionController'
            });
    }

    function run($rootScope, Auth) {
        $rootScope.$on('$stateChangeSuccess', function() {
            Auth.checkStatus();
        });
    }

}());