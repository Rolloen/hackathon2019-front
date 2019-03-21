(function () {
    'use strict';


    angular
        .module('app')
        .factory('webservices', WebService);

    WebService.$inject = [
        '$http',
        '$log'
    ];

    /** @ngInject */
    function WebService(
        $http,
        $log
    ) {

        function Service() {}

        Service.prototype = {
            getNationalStats: getNationalStats
        };

        return new Service();

        function getNationalStats() {

            var url = 'http://localhost:8080/article/stats-nationales';

            return $http.get(url, {
                params: {
                    'dateDebut' : '2018-01-03',
                    'dateFin' : '2019-01-03'
                },
                headers: {
                    // 'Accept': 'text/html, application/json, application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    // 'Access-Control-Allow-Origin' : "*",
                    'Content-Type': 'application/json'
                }
            })
                .then(getNationalStatsComplete)
                .catch(getNationalStatsFailed);

            function getNationalStatsComplete(response) {
                return response.data;
                // UsersStorageService.setUser(response.data);
            }

            function getNationalStatsFailed() {
                $log.debug('XHR Failed for getNationalStats.' + error.data);
            }
        }
    }
})();