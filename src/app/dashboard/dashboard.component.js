(function () {
  'use strict';

  angular.module('app').component('dashboardPage', {
    controller: DashboardController,
    controllerAs: 'vm',
    templateUrl: 'app/dashboard/dashboard.view.html',
  });

  /** @ngInject */
  function DashboardController($log, $rootScope, $scope, $window, $translate, webservices) {
    const vm = this;

    vm.switchLanguage = switchLanguage;
    vm.selectedRegion = {};
    vm.stats = {};

    activate();

    function activate() {
      initStats();
      var width = 1000,
        height = 1000,
        centered;

      var path = $window.d3.geoPath();

      var projection = $window.d3.geoConicConformal()
        .center([2.454071, 46.279229])
        .scale(5000)
        .translate([width / 2, height / 2]);

      path.projection(projection);

      var svg = $window.d3.select('#map').append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height);

      var deps = svg.append("g");

      $window.d3.json('app/assets/geocoding/franceDepartement.json').then(function (geojson) {
        deps.selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr('class', 'departement')
          .on("click", departClicked);
          // .on("mouseover", handleHover);

      });

      function departClicked(d) {
        if (d && centered !== d) {
          centered = d;
          vm.selectedRegion = d.properties;
        } else {
          centered = null;
          vm.selectedRegion = {};

        }

        deps.selectAll("path")
          .classed("selected", centered && function (d) {
            return d === centered;
          });

        $scope.$apply(vm.selectedRegion);
        
      }

    }
    function initStats() {
      webservices.getNationalStats()
        .then(function(data){
          vm.stats = data;
          console.log(data);
          
          // $scope.$apply(vm.stats);
          
        }, function (err) {
            $log.error(err);          
        });
    }

    function switchLanguage(language) {
      $translate.use(language);
    }

  }

})();