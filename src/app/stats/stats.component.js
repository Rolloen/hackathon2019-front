(function() {
  'use strict';

  angular.module('app').component('stats', {
    controller: StatsController,
    controllerAs: 'vm',
    bindings : {
      region : '='
    },
    templateUrl: 'app/stats/stats.view.html',
  });

  /** @ngInject */
  function StatsController($log, $rootScope, $translate, SAMPLE_CONSTANT) {
    const vm = this;

    vm.test = test;

    function test() {
      $log.debug(vm.region);
      
    }

  }

})();
