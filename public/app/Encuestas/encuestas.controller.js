(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestasController', EncuestasController);

	function EncuestasController($scope, $timeout, $filter, $cookies, $mdDialog, EncuestasFactory, PreguntasFactory, PersonasFactory, AplicacionesFactory) {
		$scope.descripcion = '';
		$scope.nueva = false;
		$scope.registro = false;
        $scope.texto = 'Mostrar formulario de agregar nueva encuesta';
        $scope.mostrarFormulario = mostrarFormulario;
        $scope.agregar = agregar;
        $scope.modificar = modificar;
        $scope.eliminar = eliminar;
        $scope.editandoEncuesta = editandoEncuesta;
        $scope.cambiarEstado = cambiarEstado;
        $scope.armandoEncuesta = armandoEncuesta;
        $scope.armar = armar;
        $scope.asignandoUsuarios = asignandoUsuarios;
        $scope.asignarUsuarios = asignarUsuarios;
        $scope.marcarTodos = marcarTodos;
        var respaldoPreguntas,
            respaldoEmpresarios;

        function cleanForm() {
            $scope.formEncuesta.$setUntouched();
            $scope.formEditarEncuesta.$setUntouched();
        }
        
        function mostrarFormulario() {
            cleanForm();
            $scope.nueva = !$scope.nueva;
            $scope.descripcion = '';

            if($scope.nueva) {
                $scope.texto = 'Ocultar formulario de agregar nueva encuesta';
            }
            else {
                $scope.texto = 'Mostrar formulario de agregar nueva encuesta';
            }
        }

        function agregar() {
        	var fechaActual = $filter('date')(new Date(), 'yyyy-MM-dd');
        	var encuesta = {
        		descripcion: $scope.descripcion,
        		estado: false,
        		fechaCreacion: fechaActual,
        		fechaModificacion: fechaActual,
        		persona_id: $cookies.getObject('session').id,
        	};

        	EncuestasFactory.store(encuesta)
        	.then(function(response) {
        		if(response === 'true') {
                    getAll();
                    $scope.registro = true;
                    $scope.msgRegistro = 'La encuesta se ha agregado correctamente.';
                    $scope.styleRegistro = 'success-box';
                    $scope.descripcion = '';
                    cleanForm();                   

                    $timeout(function() {
                        $scope.registro = false;
                    }, 5000);
                }
                else {
                    $scope.registro = true;
                    $scope.msgRegistro = 'Ha ocurrido un error al agregar la encuesta.';
                    $scope.styleRegistro = 'error-box';
                }
        	});
        }

        function modificar() {
		    EncuestasFactory.edit($scope.id, $scope.descripcionEditar, $filter('date')(new Date(), 'yyyy-MM-dd'))
            .then(function(response) {
                if(response === 'true') {
                    getAll();
                    cleanForm();
                    $scope.editar = true;
                    $scope.msgEditar = 'La encuesta se ha modificado correctamente.';
                    $scope.styleEditar = 'success-box';
                }
                else {
                    $scope.editar = true;
                    $scope.msgEditar = 'Ha ocurrido un error al modificar la encuesta.';
                    $scope.styleEditar = 'error-box';
                }
            });
        }

        function eliminar(ev, id) {
            var confirm = $mdDialog.confirm()
            .title('¿Desea eliminar la encuesta?')
            .textContent('Si la elimina, se eliminará de todo el sistema.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Sí')
            .cancel('No');
            
            $mdDialog.show(confirm)
            .then(function() {
                EncuestasFactory.remove(id)
                .then(function(response) {
                    if(response === 'true') {
                        getAll();
                    }
                    else {
                        console.log('error');
                    }
                });
            }, function() {});
        }
        function editandoEncuesta(id, descripcion) {
            $scope.editar = false;
            $scope.descripcionEditar = descripcion;
            $scope.id = id;
        }

        function armandoEncuesta(id) {
            $scope.armarOk = false;
            $scope.id = id;
            $scope.preguntas = {
                "banco": [],
                "preguntas": []
            };

            EncuestasFactory.getQuestions(id)
            .then(function(response) {
                respaldoPreguntas = [];
                $scope.preguntas.banco = response;
                
                angular.forEach(response, function(question) {
                    respaldoPreguntas.push(question);
                });
            })
            .then(function() {
                PreguntasFactory.getAll()
                .then(function(response) {
                    $scope.preguntas.preguntas = response;
                })
                .then(function() {
                    $scope.preguntas = EncuestasFactory.removeQuestions($scope.preguntas);
                });
            });
        }

        function cambiarEstado(encuesta) {
            EncuestasFactory.changeState(encuesta.id, 1 - encuesta.estado)
            .then(function(response) {
                encuesta.estado = 1 - encuesta.estado;
            });
        }

        function agregarPreguntas(questions) {
            if(questions.length) {
                EncuestasFactory.addQuestionsToSurvey($scope.id, questions)
                .then(function(response) {
                    return response;
                });
            }

            return 'true';
        }

        function eliminarPreguntas(questions) {
            if(questions.length) {
                EncuestasFactory.deleteQuestionsToSurvey(questions)
                .then(function(response) {
                    return response;
                });
            }

            return 'true';
        }

        function armar() {
            var questionsList = EncuestasFactory.questionsChanged(respaldoPreguntas, $scope.preguntas.banco);

            if(agregarPreguntas(questionsList.agregar) === 'true' && eliminarPreguntas(questionsList.eliminar) === 'true') {
                $scope.msgArmar = 'La encuesta se ha armado correctamente.';
                $scope.styleArmar = 'success-box';
            }
            else {
                $scope.msgArmar = 'Ha ocurrido un error al armar la encuesta.';
                $scope.styleArmar = 'error-box';   
            }

            $scope.armarOk = true;
        }

        function getAll() {
        	EncuestasFactory.getAll()
        	.then(function(response) {
        		$scope.encuestas = response;
        	});
        }

        getAll();

        function asignandoUsuarios(id) {
            $scope.id = id;

            PersonasFactory.getBusinessmen()
            .then(function(response) {
                return response;
            })
            .then(function(empresarios) {
                AplicacionesFactory.getForSurvey($scope.id)
                .then(function(response) {
                    respaldoEmpresarios = [];

                    angular.forEach(response, function(entrepreneur) {
                        respaldoEmpresarios.push(entrepreneur);
                    });

                    return response;
                })
                .then(function(entrepreneurs) {
                    $scope.empresarios = EncuestasFactory.removeEntrepreneur(entrepreneurs, empresarios);
                });
            });
        }

        function asignarUsuarios() {
            console.log('Asignando usuarios a la encuesta ', $scope.id);
            console.log('Nueva',$scope.empresarios);
            console.log('Vieja',respaldoEmpresarios);
        }

        function marcarTodos() {
            var state = document.getElementById('bussMaster').checked;

            angular.forEach($scope.empresarios, function(empresario) {
                empresario.state = state;
            });
        }
	}

})();