(function () {
  'use strict';

  angular.module('app').component('map', {
    controller: MapController,
    controllerAs: 'vm',
    templateUrl: 'app/map/map.view.html',
  });

  /** @ngInject */
  function MapController($log, $rootScope, $window, $translate, SAMPLE_CONSTANT) {
    const vm = this;

    vm.showSampleConstant = showSampleConstant;
    vm.switchLanguage = switchLanguage;

    activate();

    function activate() {
      var width = 1000,
        height = 1000;

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

      });
    }

    function departClicked(d) {
      console.log(d);
      
    }

    function showSampleConstant() {
      alert(SAMPLE_CONSTANT);
    }


    function switchLanguage(language) {
      $translate.use(language);
    }

  }

})();