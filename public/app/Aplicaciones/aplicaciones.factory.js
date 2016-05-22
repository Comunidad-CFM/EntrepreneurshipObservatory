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
		.factory('AplicacionesFactory', AplicacionesFactory);

	/**
	* Factory de aplicaciones.
	* @param {Object} Servicio que realiza una solicitud al servidor y devuelve una respuesta.
	* @param {Object} Servicio que ayuda a ejecutar funciones de forma asíncrona.
	* @returns {Object} Objeto con los metodos del factory.
	*/
	function AplicacionesFactory($http, $q) {
		var factory = {
			getForSurvey: getForSurvey,
			store: store,
			remove: remove,
			getAplicacionesByPersona : getAplicacionesByPersona
		};

		return factory;

		/**
		* Obtiene las aplicaciones de una encuesta.
		* @param {integer} Id de la encuesta.
		* @returns {Array} Arreglo con las aplicaciones de la encuesta.
		*/
		function getForSurvey(idEncuesta) {
			var defered = $q.defer(),
				data = {
					idEncuesta: idEncuesta
				};

			$http({
				method: 'POST',
				url: 'api/aplicaciones/getForSurvey',
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

		/**
		* Almacena nuevas aplicaciones.
		* @param {Array} Arreglo con los id de los empresarios a los que se les va a crear una aplicación.
		* @param {integer} Id del periodo al que se va a asignar la encuesta.
		* @param {date} Fecha actual.
		* @param {integer} Id de la encuesta a la que se le va a crear aplicaciones.
		* @returns {string} Resultado del almacenamiento.
		*/
		function store(entrepreneurs, idPeriodo, fecha, idEncuesta) {
			var defered = $q.defer(),
				data = {
					entrepreneurs: entrepreneurs,
					idPeriodo: idPeriodo,
					fecha: fecha,
					idEncuesta: idEncuesta
				};

			$http({
				method: 'POST',
				url: 'api/aplicaciones/store',
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

		/**
		* Elimina aplicaciones.
		* @param {Array} Arreglo con los id de las aplicaciones que se van a eliminar.
		* @returns {string} Resultado de eliminar.
		*/
		function remove(aplications) {
			var defered = $q.defer();

			$http({
				method: 'DELETE',
				url: 'api/aplicaciones/destroy/' + aplications
			})
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		/**
		* Obtiene aplicaciones de encuestas de una persona dada
		* @param {Integer} Id de la persona que se quiere obtener las aplicaciones
		* @returns {Array} Objetos de las aplicaciones
		*/
		function getAplicacionesByPersona(idPersona) {
			var defered = $q.defer(),
				data = {
					persona_id: idPersona
				};

			$http({
				method: 'POST',
				url: 'api/aplicaciones/getAplicacionesByPersona',
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
