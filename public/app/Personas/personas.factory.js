(function() {
	'use strict';

	angular
		.module('observatoryApp')
		.factory('PersonasFactory', PersonasFactory);

	function PersonasFactory($http, $q) {
		var factory = {
			store: store,
			getAll: getAll,
			getBusinessmen: getBusinessmen,
            ifExist: ifExist,
            edit: edit,
            remove: remove
		};

		return factory;

		function store(persona) {
			var defered = $q.defer();
			var promise = defered.promise;

			$http({
				method: 'POST',
				url: '/api/personas/registro',
				data: persona
			})
			.success(function(response) {				
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return promise;
		}
        function remove(id){
            var data = {
				id: id
			};

            var defered = $q.defer();
            $http({
                method: 'DELETE',
                url: 'api/personas/destroy/' + id,
            }).success(function(response){
                defered.resolve(response);
            })
            .error(function(err){
                defered.reject(err);
            })
            return defered.promise;
        }

		function getAll() {
			var defered = $q.defer();
			var promise = defered.promise;
			
			$http.get('/api/personas/todas')
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return promise;
		}

		function getBusinessmen() {
			var defered = $q.defer();

			$http.get('/api/personas/empresarios')
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}
        

        function ifExist(field,fieldToValidate){             
            var defered = $q.defer();            
            $http({
				method: 'POST',
				url: '/api/personas/ifExist',
				data: {
					field:field,
					fieldToValidate: fieldToValidate }                
			})
            .success(function(response){            	    
                defered.resolve(response[0]);
            })
            .error(function(err){
                defered.reject(err);
            })
            return defered.promise;
        }
        
        function edit(persona){
            var defered = $q.defer();            
            $http({
				method: 'POST',
				url: '/api/personas/update',
				data: persona
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