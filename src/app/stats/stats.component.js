(function () {
  'use strict';

  angular.module('app').component('stats', {
    controller: StatsController,
    controllerAs: 'vm',
    bindings: {
      region: '=',
      stats : '='
    },
    templateUrl: 'app/stats/stats.view.html',
  });

  /** @ngInject */
  function StatsController($log, $window, webservices) {
    const vm = this;

    
    init();

    function init() {
        webservices.getStatsByMonth().then(function (data) {
            console.log(data);

            data = JSON.stringify(data)

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

            $window.d3.json("http://127.0.0.1:8000/article/stats-months?dateDebut=20180101&dateFin=20190101").then(function (data) {
                console.log(data);
                x.domain(data.map(function (d) {
                    return d.mois;
                }));
                y.domain([0, $window.d3.max(data, function (d) {
                    return Number(d.nombre_accident);
                })]);
                g.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call($window.d3.axisBottom(x))
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
        }, function (err) {
            $log.error(err);
        });
    }
  }

})();