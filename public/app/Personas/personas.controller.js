(function () {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PersonasController', PersonasController);

    function PersonasController($scope, $http, $timeout, PersonasFactory) {
        $scope.nueva = false;
        $scope.texto = 'Mostrar formulario';
        $scope.registro = false;
        $scope.store = store;
        $scope.getPersonas = getPersonas;
        $scope.mostrarFormulario = mostrarFormulario;

        function setData() {
            $scope.cedula = '';
            $scope.nombre = '';
            $scope.apellido1 = '';
            $scope.apellido2 = '';
            $scope.email = '';
            $scope.pass = '';
            $scope.passConf = '';
            $scope.tipo ='A';
        }
        setData();

        $scope.$watch('passConf', validate);

        function validate (){
         	if($scope.pass !== $scope.passConf) {
            	$scope.errorPass = true;
	         }
    	     else {
        	    $scope.errorPass = false;
         	}                    
        }
        
        function store() {
            var data = {
                cedula: $scope.cedula,
                nombre: $scope.nombre,
                apellido1: $scope.apellido1,
                apellido2: $scope.apellido2,
                email: $scope.email,
                contrasena: $scope.pass,
                tipo: $scope.tipo
            }

            PersonasFactory.store(data)
            .then(function(response) {
                if(response === 'true') {
                    $scope.registro = true;
                    $scope.msgRegistro = 'La persona se ha agregado correctamente';
                    $scope.styleRegistro = 'success-box';
                    setData();

                    $timeout(function() {
                        $scope.registro = false;
                    }, 5000);
                }
                else {
                    $scope.registro = true;
                    $scope.msgRegistro = 'Error, el email ya se encuentra registrado.';
                    $scope.styleRegistro = 'error-box';
                }
            });
		}

        function mostrarFormulario() {
            $scope.nueva = !$scope.nueva;

            if($scope.nueva) {
                $scope.texto = 'Ocultar formulario';
            }
            else {
                $scope.texto = 'Mostrar formulario';
            }
        }

        function getPersonas() {
            PersonasFactory.getAll()
            .then(function(response) {
                $scope.personas = response;
            });
        }

        getPersonas();
    }

})();