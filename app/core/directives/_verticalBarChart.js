/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.directive("verticalBarChart", function () {
    return {
        scope: {
            "dataSet": "=verticalBarChart"
        },
        link: function (scope, element) {
            //Width and height
            var diagramWidth = 600,
                diagramHeight = 300,
                barWidth = 20,
                barPadding = 2,
                svgPaddingLeft = 25,
                svgPaddingTop = 0;



            var svg = d3.select("body")
                .append("svg")
                .attr("width", diagramWidth)
                .attr("height", diagramHeight)
                .append("g")
                .attr("transform", "translate("+svgPaddingLeft+", "+svgPaddingTop+")")



            scope.render = function () {
                //calculate max for the scale
                var victimsMax = d3.max(scope.dataSet, function (d) {
                    return +d.lowestCasualties;
                });

                //create scale for height
                var linearScale = d3.scale.linear()
                    .domain([0, victimsMax])
                    .range([0, diagramHeight]);

                var bloodColorScale = d3.scale.linear()
                    .domain([0, victimsMax])
                    .range(["#FF0000", "#990000"]);

                var axis = d3.svg.axis()
                    .scale(linearScale)
                    .orient("left")
                var mainGroup = svg.append("g")
                    .attr("transform", "translate(10,10)");


                var axisGroup =  mainGroup.append("g")
                    .attr("class", "y axis")
                    .call(axis)
/*
                var rects = svg.selectAll("rect")
                    .data(scope.dataSet)
                    .enter()
                    .append("rect")
                    .attr("x", function (d, i) {
                        return (i * (diagramWidth / scope.dataSet.length)) + barPadding;
                    })
                    .attr("y", 0)
                    .attr("width", (diagramWidth / scope.dataSet.length) - barPadding)
                    .attr("height", 0)
                    .attr("fill", function (d) {
                        return "rgb(" + (d.lowestCasualties * 10) + ", 0, 0)";
                    })
                    .transition()
                    .duration(2000)
                    .attr("height", function (d) {
                        return linearScale(d.lowestCasualties);
                    })
                    .attr("fill", function (d) {
                        return bloodColorScale(d.lowestCasualties);
                    });
*/
                // Returns path data for a rectangle with rounded right corners.
// The top-left corner is ?x,y?.
                function rounded_rect(x, y, w, h, r, tl, tr, bl, br) {
                    var retval;
                    retval  = "M" + (x + r) + "," + y;
                    retval += "h" + (w - 2*r);
                    if (tr) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r; }
                    else { retval += "h" + r; retval += "v" + r; }
                    retval += "v" + (h - 2*r);
                    if (br) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r; }
                    else { retval += "v" + r; retval += "h" + -r; }
                    retval += "h" + (2*r - w);
                    if (bl) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r; }
                    else { retval += "h" + -r; retval += "v" + -r; }
                    retval += "v" + (2*r - h);
                    if (tl) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r; }
                    else { retval += "v" + -r; retval += "h" + r; }
                    retval += "z";
                    return retval;
                }

                mainGroup.selectAll("path")
                    .data(scope.dataSet)
                    .enter()
                    .append("path")
                    .attr("fill", "red")
                    .attr("d", function (d, i) {
                        return rounded_rect(
                            (i * (diagramWidth / scope.dataSet.length)) + barPadding ,
                            0,
                            (diagramWidth / scope.dataSet.length) - barPadding,
                            0,
                            8,
                            false,
                            false,
                            true,
                            true
                        )
                    })
                    .transition()
                    .duration(2000)
                    .attr("d", function (d, i) {
                        return rounded_rect(
                            (i * (diagramWidth / scope.dataSet.length)) + barPadding,
                            0,
                            (diagramWidth / scope.dataSet.length) - barPadding,
                            linearScale(d.lowestCasualties),
                            8,
                            false,
                            false,
                            true,
                            true
                        )
                    })
                    .attr("fill", function (d) {
                        return bloodColorScale(d.lowestCasualties);
                    });

                svg.selectAll("text")
                    .data(scope.dataSet)
                    .enter()
                    .append("text")
                    .text(function (d) {
                        return d.lowestCasualties;
                    })
                    .attr("x", function (d, i) {
                        return i * (diagramWidth / scope.dataSet.length) - 10;  // +5
                    })
                    .attr("y", function (d) {
                        return linearScale(d.lowestCasualties);              // +15
                    })
                    .attr("text-anchor", "middle")
                    .attr("rotate", 90)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("fill", "white")
                //    .attr("text-anchor", "middle");
                     //.attr("transform", "rotate(90)");

                /*.delay(1000)
                 .attr("x", function(d, i){
                 return i* (barWidth+barPadding);
                 })*/
            };

            scope.$watch("dataSet", function () {
                scope.render();
            });
        }
    };
});

hackAppKillCount.directive("verticalBloodBarChart", function () {
    return {
        scope: {
            "dataSet": "=verticalBloodBarChart"
        },
        template:'<div class="blood-chart-container"> ' +
            '<div data-ng-repeat="killer in dataSet"><div class="blood-drip"></div></div>' +
            '</div>',
        link: function (scope, element) {
            //Width and height
            var diagramWidth = 50,
                diagramHeight = 300,
                svgPaddingLeft = 25,
                svgPaddingTop = 0;

            var bar_width = 20;

            var svg = d3.select("body")
                .append("svg")
                .attr("width", diagramWidth)
                .attr("height", diagramHeight)
                .append("g")
                .attr("transform", "translate("+svgPaddingLeft+", "+svgPaddingTop+")");

            scope.render = function () {
                //calculate max for the scale
                var victimsMax = d3.max(scope.dataSet, function (d) {
                    return +d.lowestCasualties;
                });

                //create scale for height
                var linearScale = d3.scale.linear()
                    .domain([0, victimsMax])
                    .range([0, diagramHeight]);

                var killerCharts = $(element).find(".blood-chart-container>div");
                console.log(killerCharts);

                killerCharts.each(function(index){
                    console.log(arguments)
                   $(this).css("width",bar_width)
                    .css("height", linearScale(scope.dataSet[index].lowestCasualties))
                });

                var axis = d3.svg.axis()
                    .scale(linearScale)
                    .orient("left");
                var axisGroup =  svg.append("g")
                    .attr("class", "y axis")
                    .call(axis)
            };

            scope.$watch("dataSet", function () {
                scope.render();
            });
        }
    };
});