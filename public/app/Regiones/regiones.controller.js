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
        .controller('RegionesController', RegionesController);

    function RegionesController($scope, RegionesFactory) {    	


    	/*
    	* Obtener la lista de regiones almacenadas en la base de datos y asignarla a la lista d eregiones del
    	* scope.
    	*/
       function getRegiones () {
       	 RegionesFactory.getAll()
       	 	.then(function (response) {       	 		
       	 		console.log(response);
       	 	 	$scope.regiones = response;
       	 });       	 	
       }

       getRegiones();

    }  	
})();