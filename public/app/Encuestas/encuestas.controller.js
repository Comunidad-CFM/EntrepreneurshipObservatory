(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.controller('EncuestasController', EncuestasController);

	function EncuestasController($scope, $timeout, $filter, $cookies, $mdDialog, EncuestasFactory, PreguntasFactory, PersonasFactory, AplicacionesFactory, PeriodosFactory) {
		$scope.descripcion = '';
		$scope.nueva = false;
		$scope.registro = false;
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
            $scope.asignar = false;
            $scope.id = id;

            // Se obtienen todos los empresarios.
            PersonasFactory.getBusinessmen()
            .then(function(response) {
                return response;
            })
            .then(function(allEntrepreneurs) {
                // Se obtienen los empresario que están asociados a la encuesta.
                AplicacionesFactory.getForSurvey($scope.id)
                .then(function(entrepreneursSurvey) {
                    respaldoEmpresarios = [];
                    $scope.empresarios = EncuestasFactory.isEntrepreneurAssigned(entrepreneursSurvey, allEntrepreneurs);

                    angular.forEach($scope.empresarios, function(entrepreneur) {
                        respaldoEmpresarios.push({id: entrepreneur.id, state: entrepreneur.state});
                    });
                });
            });
        }

        function asignarEmpresarios(entrepreneurs, idPeriodo) {
            if(entrepreneurs.length) {
                PeriodosFactory.getPeriodoIdForAplicacion()
                .then(function(response) {
                    return response;
                })
                .then(function(idPeriodo) {
                    AplicacionesFactory.store(entrepreneurs, idPeriodo, $filter('date')(new Date(), 'yyyy-MM-dd'), $scope.id)
                    .then(function(response) {
                        return response;
                    });
                })
            }

            return 'true';
        }

        function desasignarEmpresarios(entrepreneurs) {
            if(entrepreneurs.length) {
                AplicacionesFactory.remove(entrepreneurs)
                .then(function(response) {
                    return response;
                });
            }
            
            return 'true';
        }

        function asignarUsuarios() {
            var entrepreneursList = EncuestasFactory.entrepreneursChanged(respaldoEmpresarios, $scope.empresarios);
            
            if (asignarEmpresarios(entrepreneursList.agregar) && desasignarEmpresarios(entrepreneursList.eliminar)) {
                $scope.msgAsignar = 'La asignación se ha realizado correctamente.';
                $scope.styleAsignar = 'success-box';
            }
            else {
                $scope.msgAsignar = 'Ha ocurrido un error al asignar.';
                $scope.styleAsignar = 'error-box';
            }

            $scope.asignar = true;
        }

        function marcarTodos() {
            var state = document.getElementById('bussMaster').checked;

            angular.forEach($scope.empresarios, function(empresario) {
                empresario.state = state;
            });
        }
	}

})();