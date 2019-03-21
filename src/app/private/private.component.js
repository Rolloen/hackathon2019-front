(function () {
  'use strict';

  angular.module('app').component('private', {
    controller: PrivateController,
    controllerAs: 'vm',
    templateUrl: 'app/private/private.view.html',
  });

  /** @ngInject */
  function PrivateController($log, $rootScope, $scope, $window, $translate, webservices) {

  }

})();