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