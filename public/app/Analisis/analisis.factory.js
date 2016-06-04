(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('AnalisisFactory', AnalisisFactory);

	function AnalisisFactory($http, $q) {
		var factory = {
			get: get,
			calculateICEBySector: calculateICEBySector,
			groupByEntrepreneur: groupByEntrepreneur
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

		function calculateICEBySector(sector, entrepreneurs) {
			
		}

		/*
		*
		* */
		function destroyAnswer(answers, answer) {
			answers = answers.filter(function(item) {
				return answer !== item;
			});

			return answers;
		}

		/*
		* */
		function groupByEntrepreneur(answers){
			var i = 0,
				j = 0,
				index = 0,
				entrepreneurs = [];
			console.log(answers);
			for ( ; i < answers.length; i++) {

				entrepreneurs.push({
					id: answers[i].id,
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
	}
})();