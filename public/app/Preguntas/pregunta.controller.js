(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PreguntaController', PreguntaController);

    function PreguntaController($scope, $timeout, $http, PreguntasFactory, IndicadorFactory) {

        $scope.store = store;
        $scope.store1 = store1;
        $scope.estado = "agregar";

        $scope.modificar = modificar;
        $scope.modificar2 = modificar2;
        $scope.eliminar = eliminar;
        $scope.getPreguntas = getPreguntas;
        $scope.mostrarFormulario = mostrarFormulario;

        $scope.registro = false;
        $scope.nueva = false;
        $scope.texto = 'Mostrar formulario de agregar nueva pregunta';

        function setData() {
            $scope.enunciado = '';
            $scope.tipo = 'false';
            $scope.indicador_id = '1';
        }
        setData();

        function store1(){
            if ($scope.estado === "modificar")
                modificar2();

            else
                store();
        }

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

        function modificar(pregunta) {
            console.log('Modificar ->',pregunta);
            $scope.id = pregunta.id;
            $scope.enunciado = pregunta.enunciado;
            if (pregunta.tipo === 't')
                $scope.tipo = "true";
            else
                $scope.tipo = "false";
            $scope.indicador_id = pregunta.indicador_id.toString();
            mostrarFormulario();
            $scope.estado = "modificar";
        }

        function modificar2() {

            var data = {
                id: $scope.id,
                enunciado: $scope.enunciado,
                tipo: $scope.tipo,
                indicador_id: $scope.indicador_id
            };

            $http({
                method: 'POST',
                url: "/preguntas/update",
                data: $.param(data)
            }).success(function(response) {
                console.log(response);
            }).error(function(response) {
                console.log(response);
                alert('This is embarassing. An error has occured. Please check the log for details');
            });
        }

        //Elimina pregunta
        function eliminar(id) {
            console.log('Eliminar ->',id);
            var isConfirmDelete = confirm('Esta seguro que desea eliminar esta pregunta?');
            if (isConfirmDelete) {
                $http({
                    method: 'DELETE',
                    url: '/api/preguntas/' + id
                }).
                success(function(data) {
                    console.log(data);
                    alert('Se ha eliminado la pregunta');
                }).
                error(function(data) {
                    console.log(data);
                    alert('No se puede eliminar');
                });
            }
        }

        function mostrarFormulario() {
            $scope.nueva = !$scope.nueva;

            if($scope.nueva) {
                $scope.texto = 'Ocultar formulario de agregar nueva pregunta';
            }
            else {
                $scope.texto = 'Mostrar formulario de agregar nueva pregunta';
            }
        }

        function getIndicadores() {
            IndicadorFactory.getAll()
                .then(function(response) {
                    $scope.indicadores = response;
                });

        }
        getIndicadores();

        function getPreguntas() {
            PreguntasFactory.getAll()
                .then(function(response) {
                    $scope.preguntas = response;
                });
        }

        getPreguntas();


    }

})();