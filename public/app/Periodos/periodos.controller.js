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
		.controller('PeriodosController', PeriodosController);

	function PeriodosController($scope, $timeout, $mdDialog, PeriodosFactory) {
		$scope.store = store;
		$scope.editandoPeriodo = editandoPeriodo;
		$scope.remove = remove;
		$scope.update = update;

		function store() {
			var data = {
				year: $scope.selectedYear.year,
				quarter: parseInt($scope.quarter)
			};

			PeriodosFactory.store(data)
			.then(function(response) {
				if (response === 'true') {
					$scope.periodoMsg = 'El periodo se ha agregado correctamente.';
					$scope.peridoClass = 'alert success-box';
					getAll
					setData();
				}
				else {
					$scope.periodoMsg = 'Ha ocurrido un error al agregar el periodo.';
					$scope.peridoClass = 'alert error-box';
				}

				$timeout(function() {
					$scope.periodoMsg = '';
				}, 5000);
			});
		}

		function editandoPeriodo(periodo) {
			$scope.id = periodo.id;
			$scope.quarter = periodo.cuatrimestre.toString();
			$scope.years.forEach((year) => {
				if (year.year === periodo.anio) {
					$scope.selectedYear = year;
				}
			});
		}

		function remove(ev, id) {
			var confirm = $mdDialog.confirm('?')
                .title('¿Esta seguro que desea eliminar este periodo?')
                .textContent('El periodo se eliminará de todo el sistema.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sí')
                .cancel('No');

            $mdDialog.show(confirm)
                .then(function() {
                    PeriodosFactory.remove(id)
                        .then(function(response) {
                            getAll();
                        });
                }, function() {});
		}

		function update() {
			var data = {
				id: $scope.id,
				year: $scope.selectedYear.year,
				quarter: parseInt($scope.quarter)
			};

			PeriodosFactory.update(data)
			.then(function(response) {
				if (response === 'true') {
					$scope.periodoMsg = 'El periodo se ha editado correctamente.';
					$scope.peridoClass = 'alert success-box';
					getAll();
					setData();
				}
				else {
					$scope.periodoMsg = 'Ha ocurrido un error al editar el periodo.';
					$scope.peridoClass = 'alert error-box';
				}

				$timeout(function() {
					$scope.periodoMsg = '';
				}, 5000);
			});
		}

		function setData() {
			$scope.quarter = '1';
			$scope.selectedYear = $scope.years[0];
		}
		function getYears() {
			$scope.years = PeriodosFactory.generateyYears();
			$scope.selectedYear = $scope.years[0];
		}

		function getAll() {
			PeriodosFactory.getAll()
			.then(function(response) {
				$scope.periodos = response;
			});
		}

		getAll();
		getYears();
		setData();
	}
})();