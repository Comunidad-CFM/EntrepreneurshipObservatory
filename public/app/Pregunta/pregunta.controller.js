(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PreguntaController', PreguntaController);

    function PreguntaController($scope) {
        $scope.algo = 'esto es un string';


    }

})();