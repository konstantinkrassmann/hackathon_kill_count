/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.directive("pieChart", function () {
    return {
        scope: {
            "dataSet": "=pieChart"
        },
        templateUrl:'core/directives/piechart.tpl.html',
        link: function (scope, element) {
            var r = 200;

            var color = d3.scale.ordinal()
                .range(["#E60000", "#FF3300", "#661400"]);

            var canvas = d3.select($(element).find(".pie-chart-box")[0])
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);

            scope.render = function (data)
            {
                scope.displayData = data;
                var group = canvas.append("g")
                .attr("transform", "translate(300,300)");

                var arc = d3.svg.arc()
                    .innerRadius(100)
                    .outerRadius(r);

                var pie = d3.layout.pie()
                    .value(function(d){
                        return d.totalCasualties;
                    });
                var arcs = group.selectAll(".arc")
                    .data(pie(data))
                    .enter()
                    .append("g")
                    .attr("class", "arc");

                arcs.append("path")
                    .attr("d", arc)
                    .attr("data-legend", function(d){return d.data.label+":"+d.data.totalCasualties})
                    .attr("fill", function(d){
                        return color(d.data.totalCasualties);
                    });

                var labelr = r + 10

                arcs.append("text")
                    .attr("transform", function(d){
                        var c = arc.centroid(d),
                            x = c[0],
                            y = c[1],
                        // pythagorean theorem for hypotenuse
                            h = Math.sqrt(x*x + y*y);
                        return "translate(" + (x/h * labelr) +  ',' +
                            (y/h * labelr) +  ")";
                    })
                    .attr("stroke", "white")
                    .attr("text-anchor", "middle")
                    .attr("font-size", "1.5em")
                    .text(function(d,i){
                        return d.data.totalCasualties;
                    });

                var legend = canvas.append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(100,200)")
                    .style("font-size", "12px")
                    .call(d3.legend);
            };

            scope.transformDataSetForChart = function(dataToTransform)
            {
                var arrSummary = {};

                for(var i in dataToTransform)
                {
                    if(typeof arrSummary[dataToTransform[i].faction] == "undefined")
                    {
                        arrSummary[dataToTransform[i].faction] = {
                            "label": dataToTransform[i].faction,
                            "totalCasualties": 0,
                            "event": []
                        };
                    }

                    arrSummary[dataToTransform[i].faction].totalCasualties += dataToTransform[i].casualties;
                    arrSummary[dataToTransform[i].faction].event.push(dataToTransform[i]);
                }
                scope.summary = arrSummary;

                var arrOutput = [];

                for(var i in arrSummary)
                {
                    arrOutput.push(arrSummary[i]);
                }
                return arrOutput;
            };

            scope.$watch("dataSet", function (newValue) {
                if(typeof newValue != "undefined")
                    newValue = scope.transformDataSetForChart(newValue);
                    scope.render(newValue);
            });
        }
    };
});

