(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('EncuestasFactory', EncuestasFactory);

	function EncuestasFactory($http, $q) {
		var factory = {
			store: store,
			getAll: getAll,
			edit: edit,
			remove: remove,
			changeState: changeState,
			getQuestions: getQuestions,
			removeQuestions: removeQuestions,
			questionsChanged: questionsChanged,
			addQuestionsToSurvey: addQuestionsToSurvey,
			deleteQuestionsToSurvey: deleteQuestionsToSurvey,
			removeEntrepreneur: removeEntrepreneur
		};

		return factory;

		function store(encuesta) {
			var defered = $q.defer();

			$http({
				method: 'POST',
				url: 'api/encuestas/registro',
				data: encuesta
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
		function getAll() {
			var defered = $q.defer();

			$http.get('api/encuestas/todas')
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		function edit(id, descripcion, fecha) {
			var defered = $q.defer();
			var data = {
				id: id,
				descripcion: descripcion,
				fecha: fecha
			};
			$http({
	            method: 'POST',
	            url: 'api/encuestas/update',
	            data: data
	        })
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		function remove(id) {
			var defered = $q.defer();
			var data = {
				id: id
			};

			$http({
				method: 'POST',
				url: 'api/encuestas/remove',
				data: data
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			})

			return defered.promise;
		}

		function changeState(id, state) {
			var defered = $q.defer();
			var data = {
				id: id,
				state: state
			};
			
			$http({
				method: 'POST',
				url: 'api/encuestas/changeState',
				data: data
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err)
			});

			return defered.promise;
		}

		function getQuestions(id)  {
			var defered = $q.defer(),
				data = {
					id: id
				};

			$http({
				method: 'POST',
				url: 'api/encuestas/getQuestions',
				data: data
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		function removeItem(item, list) {
			list = list.filter(function(question) {
				return question !== item;
			});

			return list;
		}

		function removeQuestions(list) {
			angular.forEach(list.banco, function(question) {
				angular.forEach(list.preguntas, function(item) {
			  		if(question.pregunta_id === item.id) {
			  			list.preguntas = removeItem(item, list.preguntas);
			  		}
				});	  	
			});

			return list;
		}

		function questionsChanged(oldList, currentList) {
			var question = false,
				i = 0,
				j = 0,
				preguntas = {
					'agregar': [],
					'eliminar': []
				};

			// Verifica las preguntas que hay que eliminar de la encuesta.
			for ( ; i < oldList.length; i++) {
				for ( ; j < currentList.length; j++) {
					if(oldList[i].pregunta_id === currentList[j].pregunta_id) {
						question = false;
						break;
			  		}
			  		else {
			  			question = true;	
			  		}
				}

				if(question || !currentList.length) {
					preguntas.eliminar.push(oldList[i].id);
				}

				j = 0;
			}

			i = 0;
			j = 0;
			question = false;

			// Verifica las preguntas que hay que agregar a la encuesta.
			for ( ; i < currentList.length; i++) {
				for ( ; j < oldList.length; j++) {
					if(currentList[i].pregunta_id === oldList[j].pregunta_id) {
						question = false;
						break;
			  		}
			  		else {
			  			question = currentList[i];	
			  		}
				}

				if(question || !oldList.length) {
					preguntas.agregar.push(currentList[i].id);
				}

				j = 0;
			}

			return preguntas;
		}

		function addQuestionsToSurvey(encuestaId, questions) {
			var defered = $q.defer(),
				data = {
					encuestaId: encuestaId,
					questions: questions
				};

			$http({
				method: 'POST',
				url: 'api/encuestasPreguntas/store',
				data: data
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		function deleteQuestionsToSurvey(questions) {
			var defered = $q.defer(),
				data = {
					questions: questions
				};

			$http({
				method: 'POST',
				url: 'api/encuestasPreguntas/remove',
				data: data
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		function removeEntrepreneur(listEntrepreneur, listPersons) {
			angular.forEach(listPersons, function(person) {
				person.state = false;
				angular.forEach(listEntrepreneur, function(entrepreneur) {
			  		if(person.id === entrepreneur.idPersona) {
			  			person.state = true;
			  		}
				});	  	
			});

			return listPersons;
		}
	}
})();