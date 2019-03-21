(function () {
  'use strict';

  angular.module('app').component('stats', {
    controller: StatsController,
    controllerAs: 'vm',
    bindings: {
      region: '=',
      stats: '=',
      dateLimit: '='
    },
    templateUrl: 'app/stats/stats.view.html',
  });

  /** @ngInject */
  function StatsController($log, $window, $scope, moment) {
    const vm = this;

    vm.changeDisplayedStats = changeDisplayedStats;
    vm.changeShowGraph = changeShowGraph;
    vm.displayedStats = 'all';
    vm.accidentsDisplayed = 0;
    vm.showGraph = true;

    $scope.$on('DATE_CHANGED', init);
    init();

    function init() {
      if (vm.dateLimit && vm.showGraph) {
        var dateDebut = vm.dateLimit.replace(/-/g, '');
        var dateFin = moment().format('YYYY-MM-DD').replace(/-/g, '');
        console.log(dateDebut);
        console.log(dateFin);
        $window.d3.select("#graphique").html("");

        var svg = $window.d3.select("#graphique"),
          margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
          },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var parseTime = $window.d3.timeParse("%d-%b-%y");
        var x = $window.d3.scaleBand()
          .rangeRound([0, width])
          .padding(0.1);
        var y = $window.d3.scaleLinear()
          .rangeRound([height, 0]);
  
        $window.d3.json("http://localhost:8080/article/stats-months?dateDebut=" + dateDebut + "&dateFin=" + dateFin).then(function (data) {
          console.log(data);
          x.domain(data.map(function (d) {
            return d.mois;
          }));
          y.domain([0, $window.d3.max(data, function (d) {
            return Number(d.nombre_accident);
          })]);
          g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call($window.d3.axisBottom(x));
          g.append("g")
            .call($window.d3.axisLeft(y))
            .append("text");
          g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
              return x(d.mois);
            })
            .attr("y", function (d) {
              return y(Number(d.nombre_accident));
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
              return height - y(Number(d.nombre_accident));
            });
  
        });
      } else {

      }
      
    }

    function changeDisplayedStats(type) {
      console.log(vm.stats);
      if (type === 'all') {
        vm.displayedStats = type;
      } else if (vm.displayedStats === 'all') {
        vm.displayedStats = [];
        vm.displayedStats.push(type);
      } else if (Array.isArray(vm.displayedStats) && !vm.displayedStats.includes(type)) {
        vm.displayedStats.push(type);
      }

      calculateDisplayedAccidents();
    }

    function changeShowGraph() {
      vm.showGraph = !vm.showGraph;
    }

    function calculateDisplayedAccidents() {
      if (vm.displayedStats !== 'all') {
        for (var type of vm.displayedStats) {
          vm.accidentsDisplayed += vm.stats[type];
        }
      }
    }

  }

})();