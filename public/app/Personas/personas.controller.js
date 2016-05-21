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
        .controller('PersonasController', PersonasController);

    function PersonasController($scope, $http, $timeout, PersonasFactory, $mdDialog, SectoresFactory, PersonasSectoresFactory, RegionesFactory, TerritoriosFactory) {
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
        $scope.selectSector = selectSector;
        $scope.selectSectorEdit = selectSectorEdit;
        $scope.cancelEdit = cancelEdit;
        $scope.update = update;
        //vars
        $scope.territorios = [];        

        var currentEmail = "",
        currentCedula = "",
        selectedSectores = [],
        selectedSectoresEditar = [],//sectores que se editan
        todosTerritorios = [];        

        /**
        * Recolectar los arreglos de territorios y regiones para mostrar en la interfaz     
        */
        function collectData(){
            RegionesFactory.getAll()
                .then( function (response) {
                    if(response.length > 0){
                        $scope.regiones = response;
                        $scope.selectedRegion = response[0];                        
                    }
                });
                TerritoriosFactory.getAll()
                    .then(function (response) {                 
                            todosTerritorios = response;                                                                                    
                            update();
                    })
        }
        collectData();

        /**
        * Filtrar los select de acuerdo a la región seleccionada para la lista de territorios de 
        * registro
        */
        function update () {            
            $scope.territorios = [];                    
            todosTerritorios.forEach( function(territorio) {                                
                if(territorio.region_id === $scope.selectedRegion.id){                  
                    $scope.territorios.push(territorio);
                }
            });          
            if($scope.territorios.length > 0){
                $scope.selectedTerritorio = $scope.territorios[0];
            }
        }

        function setData() {
            $scope.persona = {
                cedula: '',
                nombre: '',
                apellido1: '',
                apellido2: '',
                email: '',
                contrasena: '',
                contrasenaConf: '',
                tipo: 'A'
            }            
        }
        setData();

        $scope.$watch('persona.contrasenaConf', validatecontrasena);
        $scope.$watch('persona.contrasenaConf', validate);
        $scope.$watch('persona.contrasena', validate);
        $scope.$watch('persona.nombre', validate);
        $scope.$watch('persona.apellido1', validate);
        $scope.$watch('persona.apellido2', validate);
        $scope.$watch('persona.email', validate);
        $scope.$watch('persona.cedula', validate);

        function validatecontrasena() {
            $scope.errorcontrasena = false;
            if ($scope.persona.contrasena !== $scope.persona.contrasenaConf) {
                $scope.errorcontrasena = true;
            } else {
                $scope.errorcontrasena = false;
            }
        }

        function validate() {         
            $scope.emptyData = false;            
            try {                                                        
                if ($scope.persona.nombre === undefined || $scope.persona.contrasena === undefined || $scope.persona.apellido1 === undefined || $scope.persona.apellido2 === undefined || $scope.persona.cedula  === undefined || $scope.persona.email  === undefined
                    || $scope.persona.nombre.length === 0 || $scope.persona.apellido1.length === 0 || $scope.persona.apellido2.length === 0 || $scope.persona.cedula.length === 0 || $scope.persona.email.length === 0) {                                        
                    $scope.emptyData = true;
                } else {
                    $scope.emptyData = false;
                }
            } catch (e) {

            }            
        }

        function validateEdit() {               
            $scope.emptyData = false;            
            try {                                                        
                if ($scope.persona.nombre === undefined || $scope.persona.apellido1 === undefined || $scope.persona.apellido2 === undefined || $scope.persona.cedula  === undefined || $scope.persona.email  === undefined
                    || $scope.persona.nombre.length === 0 || $scope.persona.apellido1.length === 0 || $scope.persona.apellido2.length === 0 || $scope.persona.cedula.length === 0 || $scope.persona.email.length === 0) {                                        
                    $scope.emptyData = true;
                } else {
                    $scope.emptyData = false;
                }
            } catch (e) {

            }            
        }



        function selectSector(id){                    
            if(!selectedSectores.length){
                selectedSectores.push(id);
            }
            else{                
                var index = selectedSectores.indexOf(id);
                if(index > -1){
                    selectedSectores.splice(index, 1);
                }
                else{
                    selectedSectores.push(id);
                }
            }   
            
        }

        function selectSectorEdit(sector){                         
            var index = selectedSectoresEditar.indexOf(sector);            
            if(index > -1){                                    
                if( selectedSectoresEditar[index].state === true){
                    selectedSectoresEditar[index].state = false;
                }else{
                    selectedSectoresEditar[index].state = true;   
                }                

            }                        
        }

        function store() {            
            $scope.registro = false;
            validateEdit();
            $scope.persona.territorio_id = $scope.selectedTerritorio.id;
            if ($scope.emptyData !== true && selectedSectores.length > 0) {
                PersonasFactory.store($scope.persona)
                    .then(function(response) {
                        if (response === 'true') {
                            PersonasFactory.ifExist($scope.persona.cedula,"cedula")
                            .then(function (insertedPerson) {                                
                                PersonasSectoresFactory.store(insertedPerson.id,selectedSectores);
                                $scope.registro = true;
                                $scope.msgRegistro = 'La persona se ha agregado correctamente.';
                                $scope.styleRegistro = 'success-box';
                                $scope.descripcion = '';

                                $timeout(function() {
                                    $scope.registro = false;
                                }, 5000);
                                getPersonas();
                                setData();
                                getSectores();
                            });                            
                        } else {
                            $scope.registro = true;
                            $scope.msgRegistro = 'Error, el email ya se encuentra registrado.';
                            $scope.styleRegistro = 'error-box';
                        }
                    });
            }else{
                $scope.registro = true;
                $scope.msgRegistro = 'Error, debe seleccionar al menos un sector';
                $scope.styleRegistro = 'error-box';
            }
        }
    
        function editandoPersona(persona) {        
            $scope.persona = persona;     
            
            $scope.nueva = false;
            currentEmail = $scope.persona.email;     
            currentCedula = $scope.persona.cedula;            
            $scope.editar = false;
            // obtener los sectores de la persona, para mostrar los seleccionados
            // en la vista
            PersonasSectoresFactory.getByPersonId(persona.id)
            .then(function (sectoresDePersona) {
                return sectoresDePersona;                     
            })
            .then(function (sectoresDePersona) {    
                var sectores = [];
                $scope.sectores.forEach( function(sector) {
                    sectores.push({id:sector.id, nombre: sector.nombre});
                });            
                
                sectores.forEach( function(sector) {
                   sector.state = false;
                   sectoresDePersona.forEach( function(element) {
                        if(element.sector_id === sector.id){
                            sector.state = true;
                        }
                    });                   
                });                                 
                selectedSectoresEditar = sectores;
                
                $scope.sectoresEditar = selectedSectoresEditar;//lista de sectores para editar              
            });

        }
        function cancelEdit(){
            getPersonas();
            setData();
        }

        //validar cedula existente
        function validateID() {  
            $scope.coincidenciaCedula = false;
             if(isNaN($scope.persona.cedula)) {
                $scope.coincidenciaCedula = true;
                $scope.msgCedula = "La cédula tiene un formato incorrecto, sólo debe contener números."
            }
            else if($scope.persona.cedula != currentCedula){
                $scope.msgCedula = "";                                            
                PersonasFactory.ifExist($scope.persona.cedula,"cedula")
                    .then(function(response) {
                        if (response !== undefined) {
                            $scope.coincidenciaCedula = true;
                            $scope.msgCedula = "El número de cédula ya está registrado.";
                        }
                        else {
                            $scope.coincidenciaCedula = false;
                        }
                    });
            }
        }

        //validar email existente
        function validateEmail() {   
            $scope.errorCorreo = false;

            if ($scope.persona.email !== currentEmail) {
                if(!/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test($scope.persona.email)) {
                    $scope.errorCorreo = true;
                    $scope.msgCorreo = 'El email tiene un formato inválido.';
                }
                else {
                    PersonasFactory.ifExist($scope.persona.email,"email")
                        .then(function(response) {
                            if (response !== undefined) {
                                $scope.msgCorreo = 'Error, el correo ya existe.';
                                $scope.errorCorreo = true;
                            }
                        });
                }
            }
        }

        function mostrarFormulario() {            
            $scope.nueva = !$scope.nueva;
            setData();

            if ($scope.nueva) {
                $scope.texto = 'Ocultar formulario de agregar nueva persona';
            } else {
                $scope.texto = 'Mostrar formulario de agregar nueva persona';
            }
        }

        function modificar(persona) {       
            validate();
            var sectores = [] //lista de sectores a enviar para guardar
            selectedSectoresEditar.forEach( function(sector) {
                if(sector.state === true){
                    sectores.push(sector.id);
                }
            });

            if ($scope.emptyData !== true && sectores.length > 0) {   
                persona.territorio_id = $scope.selectedTerritorio.id;
                PersonasFactory.edit(persona)
                    .then(function(response) {
                        if (response === 'true') {
                            PersonasSectoresFactory.edit(persona.id, sectores)
                                .then(function (response) {
                                    if(response === 'true'){
                                        $scope.editar = true;
                                        selectedSectoresEditar.forEach( function(sector) {
                                            sector.state = false;                                             
                                        });
                                        
                                        $scope.msgEditar = 'La persona se ha modificado correctamente.';
                                        $scope.styleEditar = 'success-box';                                        
                                        setData();   
                                        getPersonas();  
                                    }
                                    else{
                                        $scope.editar = true;
                                        $scope.msgEditar = 'Ha ocurrido un error al modificar los sectores de la persona';
                                        $scope.styleEditar = 'error-box';            
                                    }
                                });
                                /// fin de validar largo de sectores                                                
                        } else {
                            $scope.editar = true;
                            $scope.msgEditar = 'Ha ocurrido un error al modificar la persona.';
                            $scope.styleEditar = 'error-box';
                        }
                    });
            }
            else{
                $scope.editar = true;
                $scope.msgEditar = 'Error, debe seleccionar al menos un sector.';
                $scope.styleEditar = 'error-box';
            }                                        
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

        function getSectores() {
            SectoresFactory.getAll()
                .then(function(response) {
                    $scope.sectores = response;
                });               
        }

        /*function getRegiones() {
            RegionesFactory.getAll()
                .then(function(response) {
                    $scope.regiones = response;                       
                    console.log($scope.regiones);
                });               
        }
        function getTerritorios() {
            TerritoriosFactory.getAll()
                .then(function(response) {
                    $scope.territorios = response;                       
                    console.log($scope.territorios);
                });               
        }*/

        getSectores();
        getPersonas();        
    }

})();