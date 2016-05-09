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

    /**
    * Factory de auth.
    * @param {Object} Proporciona acceso de lectura/escritura a las cookies de navegador.
    * @param {Object} Servicio utilizado para la renderización de vistas.
    * @param {Object} Servicio que permite la unión entre el HTML y el controlador a un nivel superior.
    * @returns {Object} Objeto con los metodos del factory.
    */
    function Auth($cookies, $location, $rootScope) {
        var cont = 0,
	        factory = {
    	        logIn: logIn,
    	        logOut: logOut,
    	        checkStatus: checkStatus,
    	        inArray: inArray
	        }

        return factory;

        /**
        * Guarda la url a la que un usuario intentó acceder.
        */
        function savePreviousUrl() {
            if (cont === 0) {
                $rootScope.url = $location.path();
                cont++;
            }
        }

        /**
        * Guarda los la información del usuario en las cookies y realiza la renderización a la vista respectiva.
        * @param {Object} Objeto con la información del usuario.
        */
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

        /**
        * Remueve las cookies del usuario y renderiza a la vista de log in.
        */
        function logOut() {
            $cookies.remove('session');
            $location.path('login');
        }

        /**
        * Chequea los permisos con los que cuenta el usuario, si está logueado y renderiza a la vista respectiva.
        */
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

        /**
        * Busca una ruta en la lista de rutas del sistema.
        * @param {string} Ruta a buscar.
        * @param {Array} Lista con las rutas.
        * @returns {bool} True si la encuentra, false si no la encuentra.
        */
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
	
    /**
    * Convierte una sigla a un string.
    * @returns {Object} Objeto con el filtro.
    */
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

    /**
    * Convierte un numero a un string.
    * @returns {Object} Objeto con el filtro.
    */
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

    /**
    * Configuración de los estados de la aplicación.
    * @param {Object} Servicio utilizado para definir los estados o rutas (diferentes vistas) de la aplicación.
    * @param {Object} Servicio utilizado para definir el estado por defecto.
    */
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
            })
            .state('admin.sectores',{
                url: '/sectores',
                templateUrl: './app/Sectores/sectores.html',
                controller: 'SectoresController'
            });
    }

    /**
    * Se ejecuta cada vez que se refrezca la página.
    * @param {Object} Servicio que permite la unión entre el HTML y el controlador a un nivel superior.
    * @param {Object} Servicio que proporciona autenticación y renderización de vistas.
    */
    function run($rootScope, Auth) {
        $rootScope.$on('$stateChangeSuccess', function() {
            Auth.checkStatus();
        });
    }

}());