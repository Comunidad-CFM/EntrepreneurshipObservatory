(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .factory('IndicadoresFactory', IndicadoresFactory);

    function IndicadoresFactory($http, $q) {
        var factory = {
            getAll: getAll
        };

        return factory;


        function getAll() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/api/indicadores/todos')
                .success(function(response) {
                    defered.resolve(response);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

    }

})();