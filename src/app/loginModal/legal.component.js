(function () {
  'use strict';

  angular.module('app').component('login', {
    controller: LoginController,
    controllerAs: 'vm',
    templateUrl: 'app/login/login.view.html',
  });

  /** @ngInject */
  function LoginController($log, $rootScope, $scope, $window, $translate, webservices) {

  }

})();