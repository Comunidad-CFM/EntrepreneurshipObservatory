(function() {
	'use strict';

	angular
		.module('observatoryApp', ['ui.router', 'satellizer'])
		.factory('Auth', Auth)
		.config(config)
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
            
            if(user.type === "A") {
	            $location.path('/admin');
	        }
	        else {
	            $location.path('/user');
	        }
        }

        function logOut() {
            $cookies.remove('session');
			$location.path('/');
        }

        function checkStatus() {
            var rutasPrivadas = ["/","/user","/admin"];
            
            if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) == "undefined") {
                $location.path("/");
            }
            else if(this.inArray($location.path(), rutasPrivadas) && typeof($cookies.get('session')) != "undefined") {
            	if($cookies.getObject('session').type === 'A') {
                	$location.path('/admin');
		        }
		        else {
		            $location.path('/user');
		        }
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
	
	function config($stateProvider, $urlRouterProvider, $authProvider, API_AUTH) {
		// Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = API_AUTH;

        // Redirect to the auth state if any other states
        // are requested other than users
        $urlRouterProvider.otherwise('/auth');
        
        $stateProvider
            .state('auth', {
                url: '/auth',
                templateUrl: '../templates/auth.view.html',
                controller: 'AuthController'
            })
            .state('users', {
                url: '/users',
                templateUrl: '../templates/user.view.html',
                controller: 'UserController'
            });
	}

}());