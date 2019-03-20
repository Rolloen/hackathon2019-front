(function () {
    'use strict';


    angular
        .module('app')
        .factory('webservices', WebService);

    WebService.$inject = [
        '$http'
    ];

    /** @ngInject */
    function WebService(
        $http
    ) {

        function Service() {}

        Service.prototype = {
            getNationalStats: getNationalStats
        };

        return new Service();

        function getNationalStats() {

            var url = 'localhost:8080/article/stats-nationales';

            return $http.get(url, {
                params: {
                    'dateDebut' : '2018-01-03',
                    'dateFin' : '2019-01-03'
                },
                responseType : "json"
            })
                .then(getNationalStatsComplete)
                .catch(getNationalStatsFailed);

            function getNationalStatsComplete(response) {
                console.log(response);
                
                // UsersStorageService.setUser(response.data);
            }

            function getNationalStatsFailed() {
                //$log.debug('XHR Failed for sendBetFailed.' + error.data);
            }
        }
    }
})();