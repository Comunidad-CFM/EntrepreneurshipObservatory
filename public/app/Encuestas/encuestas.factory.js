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
			removeItems: removeItems,
			questionsChanged: questionsChanged,
			addQuestionsToSurvey: addQuestionsToSurvey,
			deleteQuestionsToSurvey: deleteQuestionsToSurvey
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

		function removeItems(list) {
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
			var question = null,
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
						question = null;
						break;
			  		}
			  		else {
			  			question = oldList[i];	
			  		}
				}

				if(question !== null) {
					preguntas.eliminar.push(question);
				}

				j = 0;
			}

			i = 0;
			j = 0;
			question = null;

			// Verifica las preguntas que hay que agregar a la encuesta.
			for ( ; i < currentList.length; i++) {
				for ( ; j < oldList.length; j++) {
					if(currentList[i].pregunta_id === oldList[j].pregunta_id) {
						question = null;
						break;
			  		}
			  		else {
			  			question = currentList[i];	
			  		}
				}

				if(question !== null) {
					preguntas.agregar.push(question);
				}

				j = 0;
			}

			return preguntas;
		}

		function addQuestionsToSurvey(id, question) {
			var defered = $q.defer(),
				data = {
					encuesta_id: id,
					pregunta_id: question.pregunta_id
				};

			$http({
				method: 'POST',
				url: 'api/encuestaPreguntas/store',
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

		function deleteQuestionsToSurvey(question) {
			var defered = $q.defer(),
				data = {
					id: question.id
				};

			$http({
				method: 'POST',
				url: 'api/encuestaPreguntas/remove',
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
	}
})();