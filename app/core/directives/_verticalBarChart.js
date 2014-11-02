/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.directive("verticalBarChart", function () {
    return {
        scope: {
            "dataSet": "=verticalBarChart",
            "tipTemplate": "="
        },
        link: function (scope, element) {
            //Width and height
            var margin = {top: 20, right: 20, bottom: 70, left: 40},
                width = 600 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select(element[0])
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


            scope.render = function () {

               // width = $(".chart-box").outerWidth(true) - margin.left - margin.right;
                svg.attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

                //calculate max for the scale
                var victimsHighestMax = d3.max(scope.dataSet, function (d) {
                    return +d.highestCasualties;
                });

                //calculate max for the scale
                var victimsLowestMax = d3.max(scope.dataSet, function (d) {
                    return +d.lowestCasualties;
                });



                var victimsMax = victimsHighestMax > victimsLowestMax ?  victimsHighestMax: victimsLowestMax;


                function compare(a,b){
                    if(a.lowestCasualties > b.lowestCasualties)
                    {
                        return 1;
                    }
                    if(a.lowestCasualties < b.lowestCasualties){
                        return -1;
                    }
                    return 0;
                }

                 //console.log(scope.dataSet.sort(compare));


                //create scale for height
                var linearScale = d3.scale.linear()
                    .domain([0, victimsMax + (victimsMax*0.1)])
                    .range([0, height]);

                var bloodColorScale = d3.scale.linear()
                    .domain([0, victimsMax])
                    .range(["#FF0000", "#990000"]);

                var yAxis = d3.svg.axis()
                    .scale(linearScale)
                    .orient("left");

                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(scope.tipTemplate);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate("+margin.left+",0)")
                    .call(yAxis);

                svg.call(tip);

                var bar_width = (width-margin.left-100) / scope.dataSet.length;


                svg.selectAll("bar")
                    .append("g")
                    .data(scope.dataSet)
                    .enter()
                    .append("rect")
                    .attr("x", function(d,i){
                        return i* bar_width + margin.left + 5;
                    })
                    .attr("width", function(){

                        return bar_width;
                    })
                    .attr("y", 0)
                    .attr("height", 0)
                    .attr("fill", function(d){
                        return bloodColorScale(d.highestCasualties);
                    })
                   // .on('mouseover', tip.show)
                   // .on('mouseout', tip.hide)
                    .on("click", function(d){
                        d.blTipVisible = !d.blTipVisible;
                        if(d.blTipVisible)
                        {
                            tip.show(d);
                        }else{
                            tip.hide(d);
                        }
                    })
                    .transition()
                    .duration(2000)
                    .attr("height", function(d){
                        return linearScale(d.highestCasualties);
                    });

                svg.selectAll("bar")
                    .append("g")
                    .data(scope.dataSet)
                    .enter()
                    .append("rect")
                    .attr("x", function(d,i){
                        return i* (bar_width) + margin.left + 5;
                    })
                    .attr("width", function(){
                        return bar_width
                    })
                    .attr("y", 0)
                    .attr("height", 0)
                    .attr("fill", function(d){
                        return bloodColorScale(d.lowestCasualties);
                    })
                    // .on('mouseover', tip.show)
                    // .on('mouseout', tip.hide)
                    .on("click", function(d){
                        d.blTipVisible = !d.blTipVisible;
                        if(d.blTipVisible)
                        {
                            tip.show(d);
                        }else{
                            tip.hide(d);
                        }
                    })
                    .transition()
                    .duration(2000)
                    .attr("height", function(d){
                        return linearScale(d.lowestCasualties);
                    });

            };

            scope.$watch("dataSet", function () {
                scope.render();
            });
        }
    };
});


/*


 var test = victimsMax + "";

 var mainGroupMarginTop= 10;
 var mainGroupMarginLeft = 10 + (test.length*5);


 var mainGroup = svg.append("g")
 .attr("transform", "translate("+mainGroupMarginLeft+","+mainGroupMarginTop+")");

 var axisGroup =  svg.append("g")
 .attr("class", "y axis")
 .attr("transform", "translate("+mainGroupMarginLeft+","+mainGroupMarginTop+")")
 //.call(axis);


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
 var _val = 2*r - w;
 retval += "h" + (_val < 0 ? 0: _val);
 if (bl) { retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r; }
 else { retval += "h" + -r; retval += "v" + -r; }
 retval += "v" + (_val < 0 ? 0: _val);
 if (tl) { retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r; }
 else { retval += "v" + -r; retval += "h" + r; }
 retval += "z";
 return retval;
 }

 svg.selectAll("path")
 .data(scope.dataSet)
 .enter()
 .append("path")
 .attr("fill", "red")
 .attr("d", function (d, i) {
 return rounded_rect(
 (i * (diagramWidth / scope.dataSet.length)) + barPadding ,
 mainGroupMarginTop,
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
 var barHeight = linearScale(d.lowestCasualties);
 if(barHeight < 2){
 barHeight+= 2;
 }

 return rounded_rect(
 (i * (diagramWidth / scope.dataSet.length)) + barPadding,
 mainGroupMarginTop,
 (diagramWidth / scope.dataSet.length) - barPadding,
 barHeight,
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
 */