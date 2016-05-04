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
		.factory('PeriodosFactory', PeriodosFactory);

	/**
	* Factory de periodos.
	* @param {Object} Servicio que realiza una solicitud al servidor y devuelve una respuesta.
	* @param {Object} Servicio que ayuda a ejecutar funciones de forma asíncrona.
	* @returns {Object} Objeto con los metodos del factory.
	*/
	function PeriodosFactory($http, $q) {
		var factory = {
			getPeriodoIdForAplicacion: getPeriodoIdForAplicacion,
			getAll: getAll
		};

		return factory;

		/**
		* Obtiene el cuatrimestre a partir de un mes.
		* @param {integer} Número del mes.
		* @returns {integer} Cuatrimestre.
		*/
		function getQuarter(month) {
			if (month >= 1 && month <= 4) {
				return 1;
			}
			else if (month >= 5 && month <= 8) {
				return 2;
			}
			else {
				return 3;
			}
		}

		/**
		* Obtiene el id de un periodo para una aplicación.
		* @returns {integer} Id del periodo.
		*/
		function getPeriodoIdForAplicacion() {
			var date = new Date(),
			    defered = $q.defer();

			$http.get('api/periodos/getForAplicacion?anio='+date.getFullYear()+'&cuatrimestre='+getQuarter(date.getMonth()+1))
			.success(function(response) {
				defered.resolve(response[0].id);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

		/**
		* Obtiene todos los peridos de la base de datos.
		* @returns {Array} Lista con los peridos.
		*/
		function getAll() {
			var defered = $q.defer();

			$http({
				method: 'GET',
				url: 'api/periodos/getAll'
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