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

    function SectoresController($scope, SectoresFactory, RegionesFactory, TerritoriosFactory, filterFilter, TerritoriosSectoresFactory,$mdDialog) {    	
    	//functions
    	$scope.store = store;
    	$scope.eliminar = eliminar;
    	$scope.update = update;

    	//vars
    	$scope.territorios = [];
    	$scope.regiones = [];
    	var todosTerritorios;

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
    	
    	/**
		* Filtrar los select de acuerdo a la región seleccionada
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

		collectData();		
        function setData () {
	    	$scope.sector = {
	    		nombre: "",
	    		descripcion: "",
	    		region_id: "",
	    	}
        }		
        setData();

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

        function store() {        
        	$scope.sector.region_id = $scope.selectedRegion.id;//asignar la region seleccionada
        	
            SectoresFactory.store($scope.sector)
                .then(function(response) {                                                    
                    setData();
                    getSectores();
                    TerritoriosSectoresFactory.store(response,$scope.selectedTerritorio.id)
            			.then(function (response) {
            				 if(response === 'true'){
            				 	console.log("Lanzar notificación de éxito");
            				 }
            			})
                });                	              
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