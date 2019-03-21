(function() {
  'use strict';

  angular.module('app').component('header', {
    controller: HeaderController,
    controllerAs: 'vm',
    templateUrl: 'app/header/header.view.html',
  });

  /** @ngInject */
  function HeaderController() {
    const vm = this;

  }

})();
