(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .controller('PersonasController', PersonasController);

    function PersonasController($scope, $http, $timeout, PersonasFactory, $mdDialog) {
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
        $scope.validateID = validateID;
        var currentEmail = "";
        var currentCedula = "";

        function setData() {
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

            }
        }

        function store() {
            $scope.registro = false;
            validate();
            if ($scope.emptyData !== true) {
                PersonasFactory.store($scope.persona)
                    .then(function(response) {
                        console.log(response);
                        if (response === 'true') {
                            $scope.registro = true;
                            $scope.msgRegistro = 'La persona se ha agregado correctamente.';
                            $scope.styleRegistro = 'success-box';
                            $scope.descripcion = '';

                            $timeout(function() {
                                $scope.registro = false;
                            }, 5000);
                            getPersonas();
                            setData();

                        } else {
                            $scope.registro = true;
                            $scope.msgRegistro = 'Error, el email ya se encuentra registrado.';
                            $scope.styleRegistro = 'error-box';
                        }
                    });
            }
        }
    
        function editandoPersona(persona) {
            $scope.persona = persona;
            currentEmail = $scope.persona.email;     
            currentCedula = $scope.persona.cedula;            
            $scope.editar = false;
        }

//validar cedula existente
        function validateID() {  
            $scope.coincidenciaCedula = false;
             if(isNaN($scope.persona.cedula)) {
                $scope.coincidenciaCedula = true;
                $scope.msgCedula = "El número de cédula tiene un formato incorrecto, debe ir sin guiones o espacios"
            }
            else if($scope.persona.cedula != currentCedula){
                $scope.msgCedula = "";                                            
                PersonasFactory.ifExist($scope.persona.cedula,"cedula")
                    .then(function(response) {
                        if (response !== undefined) {
                            $scope.coincidenciaCedula = true;
                            $scope.msgCedula = "El número de cédula ya está registrado";
                        }
                        else{
                            $scope.coincidenciaCedula = false;
                        }
                    })
            }
        }

        //validar email existente
        function validateEmail() {   
            $scope.coincidenciaCorreo = false;
            if($scope.persona.email != currentEmail){                     
            PersonasFactory.ifExist($scope.persona.email,"email")
                .then(function(response) {
                    if (response !== undefined) {
                        $scope.coincidenciaCorreo = true;
                    }
                    else{
                        $scope.coincidenciaCorreo = false;
                    }
                })
            }
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
            PersonasFactory.edit(persona)
                .then(function(response) {
                    if (response === 'true') {
                        setData();
                        getPersonas();
                        $scope.editar = true;
                        $scope.msgEditar = 'La persona se ha modificado correctamente.';
                        $scope.styleEditar = 'success-box';
                        
                    } else {
                        $scope.editar = true;
                        $scope.msgEditar = 'Ha ocurrido un error al modificar la persona.';
                        $scope.styleEditar = 'error-box';
                    }
                });

        }

        function eliminar(ev, id) {

            var confirm = $mdDialog.confirm()
                .title('¿Desea eliminar la persona?')
                .textContent('Si la elimina, se eliminará de todo el sistema.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Sí')
                .cancel('No');

            $mdDialog.show(confirm)
                .then(function() {
                    PersonasFactory.remove(id)
                        .then(function(response) {
                            getPersonas();
                        });
                }, function() {});
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