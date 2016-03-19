(function() {
    'use strict';

    angular
        .module('observatoryApp')
        .factory('PreguntasFactory', PreguntasFactory);

    function PreguntasFactory($http, $q) {
        var factory = {
            store: store,
            getAll: getAll
        };

        return factory;

        function store(pregunta) {
            var defered = $q.defer();
            var promise = defered.promise;

            $http({
                method: 'POST',
                url: '/api/preguntas/registro',
                data: pregunta
            })
                .success(function(response) {
                    defered.resolve(response);
                })
                .error(function(err) {
                    defered.reject(err);
                });

            return promise;
        }

        function getAll() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get('/api/preguntas/todas')
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