(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('AnalisisFactory', AnalisisFactory);

	function AnalisisFactory($http, $q) {
		var factory = {
			get: get,
			calculateICEBySector: calculateICEBySector,
			groupByEntrepreneur: groupByEntrepreneur,
            calculateNs: calculateNs
		};

		return factory;

		function get(idPeriodo) {
			var defered = $q.defer();

			$http({
				method: 'GET',
				url: 'api/analisis/get/' + idPeriodo
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

        function calculateValue(value){
            var result;
            switch (value){
                case 'Muy bueno':
                    result = 1;
                    break;
                case 'Bueno':
                    result = 2;
                    break;
                case 'Regular':
                    result = 3;
                    break;
                case 'Malo':
                    result = 4;
                    break;
                case 'Muy malo':
                    result = 5;
                    break;
            }
            return result;
        }

		function calculateICEBySector(sector, entrepreneurs) {
            var ICEbySector = {
                sector: sector,
                scores: []
            },
                index = 0;

            entrepreneurs.forEach(function(entrepreneur){

                ICEbySector.scores.push({
                    resultadoNegocios: 0,
                    empleo: 0,
                    inversiones: 0,
                    precios: 0,
                    costesTotales: 0
                });

                if(entrepreneur.sector === sector) {
                    entrepreneur.answers.forEach(function(answer){
                       switch (answer.indicador){
                           case 'Monto de negocio':
                               ICEbySector.scores[index].resultadoNegocios += calculateValue(answer.answer);
                               break;
                           case 'Empleo':
                               ICEbySector.scores[index].empleo += calculateValue(answer.answer);
                               break;
                           case 'Inversion':
                               ICEbySector.scores[index].inversiones += calculateValue(answer.answer);
                               break;
                           case 'Precio':
                               ICEbySector.scores[index].precios += calculateValue(answer.answer);
                               break;
                           case 'Coste total':
                               ICEbySector.scores[index].costesTotales += calculateValue(answer.answer);
                               break;
                       }
                    });
                    index ++;
                }
            });

            return ICEbySector;
		}

		function destroyAnswer(answers, answer) {
			answers = answers.filter(function(item) {
				return answer !== item;
			});

			return answers;
		}

		function groupByEntrepreneur(answers){
			var i = 0,
				j = 0,
				index = 0,
				entrepreneurs = [];

			for ( ; i < answers.length; i++) {

				entrepreneurs.push({
					id: answers[i].id,
                    sector: answers[i].sector,
					answers: []
				});

				for ( ; j < answers.length; j++) {
					if (entrepreneurs[index].id === answers[j].id) {
						entrepreneurs[index].answers.push({
							indicador: answers[j].nombre,
							answer: answers[j].respuesta,
						});
						answers = destroyAnswer(answers, answers[j]);
						j--;
					}
				}
				i = -1;
				j = 0;
				index++;
			}
			return entrepreneurs;

		}

        /*
        * Calcular el Ns de las encuestas
        *
        * */
        function calculateNs(entrepreneurs){
            var nsResults = {
                agricola: 0,
                manufactura: 0,
                comercio: 0,
                turismo: 0,
                servicios: 0
            };

            entrepreneurs.forEach(function(entrepreneur){
                entrepreneur.scores.forEach(function (score) {
                    if(score.costesTotales !== 0 || score.empleo !== 0 || score.inversiones !== 0
                        || score.precios !== 0 || score.resultadoNegocios !== 0){
                        switch(entrepreneur.sector){
                            case 'Agricultura y pesca':
                                nsResults.agricola ++;
                                break;
                            case 'Industria manufacturera':
                                nsResults.manufactura ++;
                                break;
                            case 'Comercio y reparación':
                                nsResults.comercio ++;
                                break;
                            case 'Turismo':
                                nsResults.turismo ++;
                                break;
                            case 'Otros servicios':
                                nsResults.servicios ++;
                                break;
                        }
                    }
                })
            });
            return nsResults;
        }
	}
})();