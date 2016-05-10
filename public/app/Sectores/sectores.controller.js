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
        .controller('SectoresController', SectoresController);

    function SectoresController($scope, $timeout, SectoresFactory, RegionesFactory, TerritoriosFactory, filterFilter, TerritoriosSectoresFactory,$mdDialog) {    	
    	//functions
    	$scope.store = store;
    	$scope.eliminar = eliminar;
    	$scope.update = update;
    	$scope.editandoSector = editandoSector;
    	$scope.modificar = modificar;
        $scope.selectTerritorio = selectTerritorio;
        $scope.selectTerritorioEdit = selectTerritorioEdit;
    	//vars
    	$scope.territorios = [];
    	$scope.regiones = [];
    	var todosTerritorios,
    		viejoTerritorio,
            selectedTerritorios = [],
            selectedTerritoriosEditar = [];//sectores que se editan;


    	$scope.$watch('sector.nombre', validate);
    	$scope.$watch('sector.descripcion', validate);
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

        function selectTerritorio(id){                    
            if(!selectedTerritorios.length){
                selectedTerritorios.push(id);
            }
            else{                
                var index = selectedTerritorios.indexOf(id);
                if(index > -1){
                    selectedTerritorios.splice(index, 1);
                }
                else{
                    selectedTerritorios.push(id);
                }
            }   

            console.log(selectedTerritorios);
            
        }

        function selectTerritorioEdit(territorio){                                     
            var index = selectedTerritoriosEditar.indexOf(territorio);            
            if(index > -1){                                    
                if( selectedTerritoriosEditar[index].state === true){
                    selectedTerritoriosEditar[index].state = false;
                }else{
                    selectedTerritoriosEditar[index].state = true;   
                }                

            }                        
            console.log(selectedTerritoriosEditar);
        }
    	
    	/**
		* Filtrar los select de acuerdo a la región seleccionada
		*/
    	function update () {						
			$scope.territorios = [];	
            selectedTerritorios = [];
			todosTerritorios.forEach( function(territorio) {								
				if(territorio.region_id === $scope.selectedRegion.id){					
					$scope.territorios.push(territorio);
				}
			});		     
			if($scope.territorios.length > 0){
				$scope.selectedTerritorio = $scope.territorios[0];
			}
		}

		collectData();		

        function setData () {
	    	$scope.sector = {
	    		nombre: "",
	    		descripcion: "",
	    		region_id: "",
	    	}
        }		
        setData();

		/*
		* Obtiene la lista de sectores registrados
        */
        function getSectores() {
            SectoresFactory.getAll()
                .then(function(response) {                	
                    $scope.sectores = response;
                });               
        }
        getSectores();

        /*
		* Valida que no existan espacion en blanco
        */
        function validate () {
        	$scope.emptyData = false;        
        	
        	if ($scope.sector.nombre === undefined || $scope.sector.descripcion === undefined || $scope.sector.nombre.length === 0 || $scope.sector.descripcion.length === 0 ) {                                                	        			
                $scope.emptyData = true;            	
            }
            else{
              	$scope.emptyData = false;
            }
        }

        /*
		* Preparar los datos para la vista de editar
        */
        function editandoSector (sector) {
        	$scope.sector = sector;    
        	viejoTerritorio = $scope.selectedTerritorio.id;    	        	
        	                       
            // obtener los territorios del sector, para mostrar los seleccionados
            // en la vista
            TerritoriosSectoresFactory.getBySectorId(sector.id)
            .then(function (territoriosDeSector) {
                return territoriosDeSector;                     
            })
            .then(function (territoriosDeSector) {    
                var territorios = [];
                $scope.territorios.forEach( function(territorio) {
                    territorios.push({id:territorio.id, nombre: territorio.nombre});
                });            
                
                territorios.forEach( function(territorio) {
                   territorio.state = false;                   
                   territoriosDeSector.forEach( function(element) {                        
                        if(element.territorio_id === territorio.id){
                            territorio.state = true;
                        }
                    });                   
                });                                 
                selectedTerritoriosEditar = territorios;
                console.log(territorios);
                
                $scope.territoriosEditar = selectedTerritoriosEditar;//lista de sectores para editar              
            });

        }

        function modificar(sector){    
            var territorios = [] //lista de sectores a enviar para guardar
            selectedTerritoriosEditar.forEach( function(territorio) {
                if(territorio.state === true){
                    territorios.push(territorio.id);
                }
            });

			$scope.sector.region_id = $scope.selectedRegion.id;//asignar la region seleccionada
			if ($scope.emptyData !== true && territorios.length > 0) {   
                SectoresFactory.update(sector)
                    .then(function(response) {
                        if (response === 'true') {
                            TerritoriosSectoresFactory.update(sector.id, territorios)
                                .then(function (response) {
                                    if(response === 'true'){
                                        $scope.editar = true;
                                        selectedTerritoriosEditar.forEach( function(sector) {
                                            sector.state = false;                                             
                                        });
                                        
                                        $scope.msgEditar = 'El sector se ha modificado correctamente.';
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
                            $scope.msgEditar = 'Ha ocurrido un error al modificar el sector.';
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

        function store() {            
            $scope.registro = false;            
            if ($scope.emptyData !== true && selectedTerritorios.length > 0) {
                SectoresFactory.store($scope.sector)
                    .then(function(response) {                        
                        TerritoriosSectoresFactory.store(response,selectedTerritorios).then(function (response) {
                             console.log(response);
                        });
                        $scope.registro = true;
                        $scope.msgRegistro = 'El sector se ha agregado correctamente.';
                        $scope.styleRegistro = 'success-box';
                        $scope.descripcion = '';

                        $timeout(function() {
                            $scope.registro = false;
                        }, 5000);

                        getSectores();
                        setData();                                                            
                    });
            }else{
                $scope.registro = true;
                $scope.msgRegistro = 'Error, debe seleccionar al menos un sector';
                $scope.styleRegistro = 'error-box';
            }
        }

		function eliminar(ev, id) {
	        var confirm = $mdDialog.confirm()
	            .title('¿Desea eliminar el sector?')
	            .textContent('Si lo elimina, se eliminará de todo el sistema.')
	            .ariaLabel('Lucky day')
	            .targetEvent(ev)
	            .ok('Sí')
	            .cancel('No');

	        $mdDialog.show(confirm)
	            .then(function() {
	                SectoresFactory.destroy(id)
	                    .then(function(response) {
	                        getSectores();
	                    });
	            }, function() {});
        }                
    }
})();