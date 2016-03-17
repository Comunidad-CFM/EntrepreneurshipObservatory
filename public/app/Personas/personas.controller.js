(function () {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PersonasController', PersonasController);

    function PersonasController($scope,$http) {        
        $scope.cedula = "123456789";
        $scope.nombre = "Manfred";
        $scope.apellido1 = "Artavia";
        $scope.apellido2 = "Gomez";
        $scope.email = "m@gmai.com";
        $scope.pass = "123";
        $scope.passConf = "123";
        $scope.tipo='A';
        $scope.$watch('passConf', validate);
        function validate (){
         if($scope.pass !== $scope.passConf){
             
             $scope.errorPass = true;
         }else{
             $scope.errorPass = false;
         }                    
        }
        
        
        $scope.store = function() {
            
			var data = {
                cedula: $scope.cedula,
                nombre: $scope.nombre,
                apellido1: $scope.apellido1,
                apellido2: $scope.apellido2,
				email: $scope.email,
				contrasena: $scope.pass,
                tipo: $scope.tipo
                
			}

			$http({
				method: 'POST',
				url: '/api/personas/registro',
				data: data
			})
			.success(function(response) {
				console.log(response);
			})
			.error(function(err) {
				console.log(err);
			});
		}
    }




})();