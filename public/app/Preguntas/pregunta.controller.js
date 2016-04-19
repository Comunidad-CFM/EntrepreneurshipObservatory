(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PreguntaController', PreguntaController);

    function PreguntaController($scope, $timeout, $http, PreguntasFactory, IndicadorFactory, $mdDialog) {
        $scope.store = store;
        var indicadores = '';
        $scope.indicadores = indicadores;
        $scope.editandoPregunta = editandoPregunta;
        $scope.modificar = modificar;
        $scope.eliminar = eliminar;
        $scope.getPreguntas = getPreguntas;
        $scope.mostrarFormulario = mostrarFormulario;

        $scope.registro = false;
        $scope.nueva = false;
        $scope.texto = 'Mostrar formulario de agregar nueva pregunta';

        function setData() {
            $scope.enunciado = '';
            $scope.tipo = 'false';
            $scope.indicador_id = 1;
        }
        setData();

        function store() {
            var data = {
                enunciado: $scope.enunciado,
                tipo: $scope.tipo,
                indicador_id: $scope.indicador_id
            };

            PreguntasFactory.store(data)
                .then(function(response) {
                    if(response === 'true') {
                        $scope.registro = true;
                        $scope.msgRegistro = 'La pregunta se ha agregado correctamente.';
                        $scope.styleRegistro = 'success-box';
                        setData();
                        $scope.preguntas = "";
                        getPreguntas();

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

        function editandoPregunta(pregunta) {
            $scope.id = pregunta.id;
            $scope.enunciado = pregunta.enunciado;
            $scope.editar = false;            
            if (pregunta.tipo === 't') {
                $scope.tipo = "true";
            }
            else {
                $scope.tipo = "false";
            }

            $scope.indicador_id = pregunta.indicador_id.toString();
        }

        function getTipo(tipo){
            if (tipo === "true")
                return 't';
            else if (tipo === "false")
                return 'f';
            else
                return tipo;
        }

        function getIndicador(nombre){
            console.log(typeof(nombre));
            for (var i=0; i<$scope.indicadores.length; i++){
                if ($scope.indicadores[i].nombre === nombre) {
                    return i;
                }
            }
        }

        function modificar() {
            var data = {
                id: $scope.id,
                enunciado: $scope.enunciado,
                tipo: getTipo($scope.tipo),
                indicador_id: parseInt($scope.indicador_id)
            };

            PreguntasFactory.edit(data)
                .then(function(response) {
                    if(response === 'true') {
                        $scope.msgEditar = 'La pregunta se ha modificado correctamente.';
                        $scope.styleEditar = 'success-box';
                        getPreguntas();
                    }
                    else {
                        $scope.msgEditar = 'Ha ocurrido un error al modificar la pregunta.';
                        $scope.styleEditar = 'error-box';
                    }

                    $scope.editar = true;
                });
        }

        //Elimina pregunta
        function eliminar(ev, id) {
            var confirm = $mdDialog.confirm('?')
                .title('¿Esta seguro que desea eliminar esta pregunta?')
                .textContent('La pregunta se eliminará de todo el sistema.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sí')
                .cancel('No');

            $mdDialog.show(confirm)
                .then(function() {
                    PreguntasFactory.remove(id)
                        .then(function(response) {
                            getPreguntas();
                        });
                }, function() {});
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
                    indicadores = response;
                });

        }
        getIndicadores();

        function getPreguntas() {
            PreguntasFactory.getAll()
                .then(function(response) {
                    $scope.preguntas = response;
                    setNombreIndicador();
                });
        }

        getPreguntas();

        function setNombreIndicador() {
            if ($scope.preguntas.length>0){
                for (var i=0; i<$scope.preguntas.length; i++){
                    $scope.preguntas[i].indicador_id = $scope.indicadores[$scope.preguntas[i].indicador_id - 1].nombre;
                    if ($scope.preguntas[i].tipo === 't') {
                        $scope.preguntas[i].tipo = "Abierta";
                    }
                    else {
                        $scope.preguntas[i].tipo = "Cerrada";
                    }
                }
            }
        }
    }

})();