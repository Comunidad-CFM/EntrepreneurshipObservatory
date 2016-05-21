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
		.factory('PersonasFactory', PersonasFactory);

	function PersonasFactory($http, $q) {
		var factory = {
			store: store,
			getAll: getAll,
			getByType: getByType,
            ifExist: ifExist,
            edit: edit,
            remove: remove,
            isPass: isPass,
            changePass: changePass,
            getByTerritory: getByTerritory
		};

		return factory;

		function store(persona) {
            console.log(persona);
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

		function getByType(type) {
			var defered = $q.defer();

			$http.get('/api/personas/getByType/' + type)
			.success(function(response) {
				defered.resolve(response);
			})
			.error(function(err) {
				defered.reject(err);
			});

			return defered.promise;
		}

        //obtener los registros de personas que coinciden con un determinado territorio
        function getByTerritory(territory) {
            var defered = $q.defer();

            $http.get('/api/personas/getByTerritory/' + territory)
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
            console.log(persona);
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

        function isPass(id, currentPass) {
        	var defered = $q.defer();

        	$http({
        		method: 'GET',
        		url: '/api/personas/isPass/' + id + '/'+ currentPass
        	})
        	.success(function(response) {
        		defered.resolve(response[0]);
        	})
        	.error(function(err) {
        		defered.reject(err);
        	});

        	return defered.promise;
        }

        function changePass(id, pass) {
        	var defered = $q.defer(),
        		data = {
        			id: id,
        			pass: pass
        		};

        	$http({
        		method: 'POST',
        		url: '/api/personas/changePass',
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
	}

})();