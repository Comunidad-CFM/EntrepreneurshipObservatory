(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('PersonasSectoresFactory', PersonasSectoresFactory);

		function PersonasSectoresFactory($http, $q) {
		var factory = {
			store: store,
			getByPersonId: getByPersonId,
			edit: edit
		};

		return factory;

		function store(personaId, sectoresId) {
					
			var defered = $q.defer(),
				data = {
					personaId : personaId,
					sectoresId : sectoresId
				};							
			$http({				
				method: 'POST',
				url: '/api/personasSectores/registro',
				data: data
			})
			.success(function(response) {				
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});
			return defered.promise;
		}

		/*
		Obtener la lista de sectores asignados a la persona
		@Param: id de la persona
		@return: lista de sectores asignados a la persona
		*/
		function getByPersonId(personId) {
			
			 var defered = $q.defer(),
			 data = {	
			 	personId : personId			 	
			 };
			 $http({
			 	method: 'POST',
			 	url:'api/personasSectores/getByPersonId',
			 	data: data
			 }).success(function(response){			 
			 	defered.resolve(response);
			 }).error(function(err){
			 	defered.reject(err);
			 });		 
			 return defered.promise;
		}

		/*
		Obtener la lista de sectores asignados a la persona
		@Param: id de la persona
		@return: True si la respuesta fue correcta
		*/
		function edit(personaId, sectoresId){
            var defered = $q.defer(),
	            data = {
					personaId : personaId,
					sectoresId : sectoresId
				};
            $http({
				method: 'POST',
				url: '/api/personasSectores/update',
				data: data
			})
            .success(function(response){            	
                defered.resolve(response);
            })
            .error(function(err){            	
                defered.reject(err);
            })
            return defered.promise;
        }
	}
})();