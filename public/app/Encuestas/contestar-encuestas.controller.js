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

	function ContestarEncuestasController($scope, EncuestasFactory, $cookies, AplicacionesFactory, AplicacionesRespuestasFactory, $timeout) {
		$scope.encuestador =  $cookies.getObject('session').id;

		$scope.idAplicacion = 0;
        //Encuesta
        $scope.encuestaId = 0;
        $scope.encuestaDescripcion = "";
        //Pregunta
        $scope.preguntaId = 0;
        $scope.preguntaEnunciado = "";
        $scope.preguntaTipo = false;
        $scope.preguntaBloqueNegocio = 0;
        $scope.preguntaRespuesta = "";
        //Preguntas
        $scope.preguntas = null;
        //contestar-encuestas
        $scope.preguntasEncuesta = null;
        $scope.preguntasRespondidas = null;
		// Mensaje
		$scope.mensaje = false;
		$scope.styleEnviarEncuesta = "";
		$scope.msgEnviarEncuesta = "";

        $scope.opcionesRespuesta = [
            {"id": 1, "alternativa": "Muy bueno"},
            {"id": 2, "alternativa": "Bueno"},
            {"id": 3, "alternativa": "Regular"},
            {"id": 4, "alternativa": "Malo"},
            {"id": 5, "alternativa": "Muy malo"}
        ];

        $scope.getpreguntasByEncuesta = getpreguntasByEncuesta;
        $scope.guardarRespuesta = guardarRespuesta;
		$scope.guardarEncuesta = guardarEncuesta;

        function getEncuesta(){
            $scope.encuestaId = EncuestasFactory.getId();
            $scope.encuestaDescripcion = EncuestasFactory.getDescripcion();
			$scope.idAplicacion = EncuestasFactory.getIdAplicacion();
            getpreguntasByEncuesta($scope.encuestaId);
        }

		getEncuesta();

        function getpreguntasByEncuesta(id) {
            EncuestasFactory.getpreguntasEncuestas(id)
                .then(function(response) {
                    $scope.preguntasEncuesta = response;
					var i = 0;
                    $scope.preguntasEncuesta.forEach(function(pregunta) {
                        if (i===0)
                            pregunta.clase = "active";
                        else
                            pregunta.clase = "";

                        pregunta.vistaId = i;
                        i++;

                        if (pregunta.tipo === "f")
                            pregunta.tipo = false;
                        else
                            pregunta.tipo = true;
                    });
                });
        }

        // function getAllOpcionesRespuesta() {
        //     EncuestasFactory.getAll()
        //         .then(function(response) {
        //             $scope.encuestas = response;
        //         });
        // }

        //getAllOpcionesRespuesta();

        function guardarRespuesta(pregunta, respuesta, comentario) {
			if (comentario == null)
				comentario = "";
            
            var data = {
                pregunta_id: pregunta.pregunta_id,
                enunciado: pregunta.enunciado,
                alternativa: respuesta.alternativa,
                comentario: comentario
            };
						
			if ($scope.preguntasRespondidas === null)
				$scope.preguntasRespondidas = [];

			if (existePregunta($scope.preguntasRespondidas, pregunta.pregunta_id))
				modificarPregunta($scope.preguntasRespondidas, pregunta.pregunta_id, respuesta.alternativa, comentario)
			else
				$scope.preguntasRespondidas.push(data);
        }

		function existePregunta (preguntas, idPregunta) {
			var existe = false;
			preguntas.forEach(function(pregunta) {
				if (pregunta.pregunta_id == idPregunta)
					existe = true;
			});
			return existe;
		}

		function modificarPregunta (preguntas, idPregunta, respuesta, comentario) {
			preguntas.forEach(function(pregunta) {
				if (pregunta.pregunta_id == idPregunta){
					pregunta.alternativa = respuesta;
					pregunta.comentario = comentario;
				}
			});
		}

		function getEncuestas() {
			var ids = [];
			$scope.aplicaciones.forEach(function(aplicacion) {
				ids.push(aplicacion.encuesta_id);
			});

			EncuestasFactory.getEncuestas(ids)
			.then(function(response) {
				$scope.encuestas = response;
			});
		}

		function guardarEncuesta() {
			if ($scope.preguntasRespondidas === null){
				console.log("No se ha respondido ni una pregunta");
				$scope.mensaje = true;
				$scope.msgEnviarEncuesta = 'No se ha respondido ni una pregunta';
				$scope.styleEnviarEncuesta = 'error-box';
			}
			else if ($scope.preguntasRespondidas.length < $scope.preguntasEncuesta.length){
				console.log("Faltan pregunta por responder");
				$scope.mensaje = true;
				$scope.msgEnviarEncuesta = 'Faltan preguntas por responder';
				$scope.styleEnviarEncuesta = 'error-box';
			}
			else{
				console.log("Se puede guardar");
				$scope.preguntasRespondidas.forEach(function(pregunta) {
					console.log("Pregunta", pregunta);
					enviarEncuesta(pregunta.enunciado, pregunta.alternativa, $scope.idAplicacion);
				});
			}
			ocultarMensaje();
        }

		function enviarEncuesta(pregunta, respuesta, aplicacion_id) {
			var agregado = false;
            	data = {
					pregunta: pregunta,
					respuesta: respuesta,
					aplicacion_id: aplicacion_id
	            };

            AplicacionesRespuestasFactory.store(data)
				.then(function(response) {
					if(response === 'true') {
						$scope.mensaje = true;
		                $scope.msgEnviarEncuesta = 'La encuesta ha sido guardada y enviada';
		                $scope.styleEnviarEncuesta = 'success-box';
							ocultarMensaje();
							console.log("agrego");

						}
						else {
							$scope.mensaje = true;
			                $scope.msgEnviarEncuesta = 'Error al guardar la encuesta';
			                $scope.styleEnviarEncuesta = 'error-box';
							ocultarMensaje();
							console.log("error");
              			}
				});

        }

		function ocultarMensaje() {
			$timeout(function() {
				$scope.mensaje = false;
			}, 5000);
		}
	}
})();
