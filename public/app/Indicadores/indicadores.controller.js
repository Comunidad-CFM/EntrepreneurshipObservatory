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
		.controller('IndicadoresController', IndicadoresController);

	/**
    * Controlador de indicadores.
    * @param {Object} Servicio que permite la unión entre el HTML y el controlador.
    * @param {Object} Promesa que resolverá cierto trozo de código cuando determinado tiempo ha pasado.
    * @param {Object} Servicio utilizado para mostrar ventanas de confirmación.
    * @param {Object} Servicio que brinda funciones de los indicadores que ayudan a la funcionalidad del controlador.
    * @param {Object} Servicio que brinda funciones de los sectores que ayudan a la funcionalidad del controlador.
    * @param {Object} Servicio que brinda funciones de los sectores indicadores que ayudan a la funcionalidad del controlador.
    */
	function IndicadoresController($scope, $timeout, $mdDialog, IndicadoresFactory, SectoresFactory, SectoresIndicadoresFactory) {
		$scope.selectedSectores = [];
		$scope.store = store;
		$scope.editandoIndicador = editandoIndicador;
		$scope.update = update;
		$scope.remove = remove;
		$scope.setData = setData;

		$scope.$watch('selectedSectores', validate);

		/**
		 * Valida que se haya seleccionado al menos un sector para el indicador.
		 */
		function validate() {
			if (!$scope.selectedSectores.length) {
				$scope.sectoresState = false;
			}
			else {
				$scope.sectoresState = true;
			}
		}

		/**
		 * Manda a almacenar los sectores a los que pertenece el indicador recién agregado.
		 * @param  {int} indicadorId Id del indicador recién agregado.
		 */
		function storeSectoresIndicadores(indicadorId) {
			var sectoresId = [];

			$scope.selectedSectores.forEach((indicador) => {
				sectoresId.push(indicador.id);
			});

			$scope.selectedSectores = [];

			SectoresIndicadoresFactory.store(indicadorId, sectoresId)
			.then(function(response) { });
		}

		/**
		 * Almacena un nuevo indicador en la base de datos.
		 * @return {String} Resultado de almacenar el indicador.
		 */
		function store() {
			IndicadoresFactory.store($scope.indicador)
			.then(function(response) {
				try {
					response = parseInt(response);

					$scope.indicadorMsg = 'El indicador se ha agregado correctamente.';
					$scope.indicadorClass = 'alert success-box';
					cleanForm();
					setData();
					getAll();
				} catch (e) {
					$scope.indicadorMsg = 'Ha ocurrido un error al agregar el indicador.';
					$scope.indicadorClass = 'alert error-box';
				}

				$timeout(function() {
					$scope.indicadorMsg = '';
				}, 5000);

				return(response);
			})
			.then(function(indicadorId) {
				if (typeof(indicadorId) === 'number') { 
					storeSectoresIndicadores(indicadorId);
				}
			});
		}

		/**
		 * Prepara la información para editar un indicador.
		 * @param  {Object} Información del indicador a editar.
		 */
		function editandoIndicador(indicador) {
			$scope.id = indicador.id;
			$scope.indicador = {
				name: indicador.nombre,
				description: indicador.descripcion
			};
		}

		/**
		 * Edita un indicador en la base de datos.
		 * @return {String} Resultado de editar el indicador.
		 */
		function update() {
			$scope.indicador.id = $scope.id;

			IndicadoresFactory.update($scope.indicador)
			.then(function(response) {
				if (response === 'true') {
					$scope.indicadorMsg = 'El indicador se ha editado correctamente.';
					$scope.indicadorClass = 'alert success-box';
					cleanForm();
					setData();
					getAll();
				}
				else {
					$scope.indicadorMsg = 'Ha ocurrido un error al editar el indicador.';
					$scope.indicadorClass = 'alert error-box';
				}

				$timeout(function() {
					$scope.indicadorMsg = '';
				}, 5000);
			});
		}

		/**
		 * Elimina un indicador de la base de datos.
		 * @param  {Object} Evento.
		 * @param  {int} Id del indicador a eliminar.
		 * @return {String} Resultado de eliminar el indicador.
		 */
		function remove(ev, id) {
			var confirm = $mdDialog.confirm('?')
                .title('¿Esta seguro que desea eliminar este indicador?')
                .textContent('El indicador se eliminará de todo el sistema.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sí')
                .cancel('No');

            $mdDialog.show(confirm)
                .then(function() {
                    IndicadoresFactory.remove(id)
                        .then(function(response) {
                            getAll();
                        });
                }, function() {});
		}

		/**
		 * Limpia las variables.
		 */
		function setData() {
			$scope.indicador = {};
		}

		/**
		 * Obtiene todos los indicadores de la base de datos.
		 */
		function getAll() {
			IndicadoresFactory.getAll()
			.then(function(response) {
				$scope.indicadores = response;
			});
		}

		/**
		 * Obtiene todos los sectores.
		 */
		function getSectores() {
			SectoresFactory.getAll()
			.then(function(response) {
				$scope.sectores = response;
			});
		}

		/**
		* Limpia el formulario del cambio de contraseña.
		*/
		function cleanForm() {
            $scope.formIndicador.$setPristine();
        }

		getAll();
		getSectores();
	}

})();