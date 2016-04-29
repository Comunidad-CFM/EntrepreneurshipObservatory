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
		.controller('ContestarEncuestasController', ContestarEncuestasController);

	function ContestarEncuestasController($scope, EncuestasFactory) {
        function getAll() {
            EncuestasFactory.getAll()
                .then(function(response) {
                    $scope.encuestas = response;
                });
        }

        getAll();
    }
    

})();