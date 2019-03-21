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

    $stateProvider.state('faq', {
      url: '/faq',
      component: 'faq',
    });

    $stateProvider.state('about', {
      url: '/about',
      component: 'about',
    });

    $stateProvider.state('legal', {
      url: '/legal',
      component: 'legal',
    });

    $stateProvider.state('private', {
      url: '/private',
      component: 'private',
    });

    $stateProvider.state('media', {
      url: '/media',
      component: 'media',
    });



    $urlRouterProvider.otherwise('/');
  }

})();
