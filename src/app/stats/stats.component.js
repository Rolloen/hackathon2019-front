(function () {
  'use strict';

  angular.module('app').component('stats', {
    controller: StatsController,
    controllerAs: 'vm',
    bindings: {
      region: '=',
      stats : '=',
      dateLimit : '='
    },
    templateUrl: 'app/stats/stats.view.html',
  });

  /** @ngInject */
  function StatsController($log, $window, webservices) {
    const vm = this;

    
    init();

    function init() {
      var svg = $window.d3.select("svg"),
        margin = {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var x = $window.d3.scaleBand()
          .rangeRound([0, width])
          .padding(0.1);

        var y = $window.d3.scaleLinear()
          .rangeRound([height, 0]);

        $window.d3.json("app/assets/temp.json", function (data) {
          console.log('alloosqijfoiazjts');
          
          $log.debug(data);
        });
      }
  }

})();