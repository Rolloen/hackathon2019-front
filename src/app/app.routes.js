(function() {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      component: 'home',
    });

    $stateProvider.state('profile', {
      url: '/profile',
      component: 'profile',
    });

    $stateProvider.state('dashboard', {
      url: '/dashboard',
      component: 'dashboardPage',
    });

    $urlRouterProvider.otherwise('/');
  }

})();
