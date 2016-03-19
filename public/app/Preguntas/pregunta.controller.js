(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PreguntaController', PreguntaController);

    function PreguntaController($scope, $timeout, PreguntasFactory, IndicadorFactory) {

        $scope.store = store;
        $scope.registro = false;

        function setData() {
            $scope.enunciado = '';
            $scope.tipo = 'false';
            $scope.indicador_id = '1';
        }
        setData();

        function store() {
            console.log("enunciado:", $scope.enunciado);
            console.log("tipo:", $scope.tipo);
            console.log("indicador:", $scope.indicador_id);

            var data = {
                enunciado: $scope.enunciado,
                tipo: $scope.tipo,
                indicador_id: $scope.indicador_id
            };

            PreguntasFactory.store(data)
                .then(function(response) {
                    console.log(response);

                    if(response === 'true') {
                        $scope.registro = true;
                        $scope.msgRegistro = 'La pregunta se ha agregado correctamente.';
                        $scope.styleRegistro = 'success-box';
                        setData();

                        $timeout(function() {
                            $scope.registro = false;
                        }, 5000);
                    }
                    else {
                        $scope.registro = true;
                        $scope.msgRegistro = 'Ha ocurrido un error al guardar la pregunta';
                        $scope.styleRegistro = 'error-box';
                    }
                });
        }

        function getIndicadores() {
            IndicadorFactory.getAll()
                .then(function(response) {
                    $scope.indicadores = response;
                });

        }
        getIndicadores();


    }

})();