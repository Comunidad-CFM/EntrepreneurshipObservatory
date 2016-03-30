(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PersonasController', PersonasController);

    function PersonasController($scope, $http, $timeout, PersonasFactory) {
        $scope.nueva = false;
        $scope.texto = 'Mostrar formulario de agregar nueva persona';
        $scope.registro = false;
        $scope.store = store;
        $scope.mostrarFormulario = mostrarFormulario;
        $scope.modificar = modificar;
        $scope.eliminar = eliminar;
        $scope.getPersonas = getPersonas;
        $scope.editandoPersona = editandoPersona;
        $scope.validateEmail = validateEmail;


        function setData() {
            console.log("Set data");
            $scope.persona = {
                cedula: '',
                nombre: '',
                apellido1: '',
                apellido2: '',
                email: '',
                pass: '',
                passConf: '',
                tipo: 'A'
            }
        }
        setData();

        $scope.$watch('passConf', validatePass);
        $scope.$watch('passConf', validate);
        $scope.$watch('pass', validate);
        $scope.$watch('nombre', validate);
        $scope.$watch('apellido1', validate);
        $scope.$watch('apellido2', validate);
        $scope.$watch('email', validate);
        $scope.$watch('cedula', validate);

        function validatePass() {
            if ($scope.pass !== $scope.passConf) {
                $scope.errorPass = true;
            } else {
                $scope.errorPass = false;
            }
        }

        function validate() {
            try {
                if (!$scope.pass.length || !$scope.nombre.length || !$scope.apellido1.length || !$scope.apellido2.length || !$scope.cedula.length || !$scope.email.length) {
                    $scope.emptyData = true;
                } else {
                    $scope.emptyData = false;
                }
            } catch (e) {
                console.log(e);
            }
        }

        function store() {
            PersonasFactory.store($scope.persona)
                .then(function(response) {
                    if (response === 'true') {
                        $scope.registro = true;
                        $scope.msgRegistro = 'La persona se ha agregado correctamente.';
                        $scope.styleRegistro = 'success-box';
                        setData();

                        $timeout(function() {
                            $scope.registro = false;
                        }, 5000);
                    } else {
                        $scope.registro = true;
                        $scope.msgRegistro = 'Error, el email ya se encuentra registrado.';
                        $scope.styleRegistro = 'error-box';
                    }
                });
        }

        function editandoPersona(persona) {
            $scope.persona = persona;
            console.log(persona);
        }


        //validar email existente
        function validateEmail() {
            $scope.coincidenciaCorreo = false;
            PersonasFactory.ifExist($scope.persona.email)
                .then(function(response) {
                    if (response !== undefined) {
                        $scope.coincidenciaCorreo = true
                    }
                })
        }

        function mostrarFormulario() {
            $scope.nueva = !$scope.nueva;

            if ($scope.nueva) {
                $scope.texto = 'Ocultar formulario de agregar nueva persona';
            } else {
                $scope.texto = 'Mostrar formulario de agregar nueva persona';
            }
        }

        function modificar(persona) {
            PersonasFactory.edit($scope.persona)
                .then(function(response){
                console.log("hola desde la respuesta de modificar");   
            });

        }
        
        function eliminar(id){
            
            PersonasFactory.remove(id)
            .then(function(response){
                console.log(response);
            });
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