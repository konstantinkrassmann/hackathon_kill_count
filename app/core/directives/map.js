/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.directive("map", function ($modal) {
    return {
        scope: {
            "dataSet": "=map",
            "mapModalUrl": "@",
            "mapCountryTooltip": "="
        },
        link: function (scope, element) {
            scope.render = function (processedData) {
                processedData.fills.defaultFill = '#ffffff';
                var map = new Datamap({
                    element: element[0],
                    fills: processedData.fills,
                    data: processedData.summary,
                    geographyConfig: {
                        popupTemplate: function (geo, data) {
                            if (typeof data != "undefined") {

                                var strOutput = scope.mapCountryTooltip(data);
                                return strOutput;

                                return "";
                            }
                        },
                        onClick: function (geo, data) {
                            if (typeof scope.mapModalUrl != "undefined") {
                                var modalInstance = $modal.open({
                                    templateUrl: scope.mapModalUrl,
                                    controller: function ($scope, $modalInstance) {
                                        $scope.data = data;

                                        $scope.cancel = function () {
                                            $modalInstance.dismiss('cancel');
                                        };
                                    }
                                });
                            }
                        },
                        borderColor: "#ababab"
                    }
                });

            };
            scope.transformDataSetForMap = function (newDataSet) {
                var summary = {};
                for (var i in newDataSet) {

                    if(newDataSet[i].region == "Soviet Union")
                    {
                        var sovietBelongings = [
                            "Armenia", "Azerbaijan","Belarus",
                            "Estonia", "Georgia", "Kazakhstan",
                            "Kyrgyzstand", "Latvia", "Lithuania",
                            "Moldova", "Russia", "Tajikistan",
                            "Turkmenistan", "Ukraine", "Uzbekistan"
                        ];
                        for(var j in sovietBelongings)
                        {
                            summary[sovietBelongings[j]] = angular.copy(newDataSet[i]);
                            summary[sovietBelongings[j]].casualties = newDataSet[i].lowestCasualties;
                            summary[sovietBelongings[j]].event = [newDataSet[i]];
                        }
                        continue;
                    }


                    if (typeof summary[newDataSet[i].region] == 'undefined') {
                        summary[newDataSet[i].region] = {}
                        summary[newDataSet[i].region].event = [];
                        summary[newDataSet[i].region].casualties = 0;
                    }

                    summary[newDataSet[i].region].casualties += newDataSet[i].lowestCasualties;
                    summary[newDataSet[i].region].event.push(newDataSet[i]);
                }

                var casualties = [];
                for (var i in summary) {
                    casualties.push(summary[i].casualties);
                }

                //calculate max for the scale
                var maxCasualties = casualties.reduce(function (a, b) {
                    return Math.max(a, b);
                }, 0);


                var bloodColorScale = d3.scale.linear()
                    .domain([0, maxCasualties])
                    .range(["#FF9900", "#FF0000"]);

                var fills = {};

                for (var i in summary)
                {
                    var fillKey = bloodColorScale(summary[i].casualties);
                    summary[i].fillKey = fillKey;
                    fills[fillKey] = fillKey;
                }

                return {
                    summary: summary,
                    fills: fills
                };
            };

            //scope.render();

            scope.$watch("dataSet", function (newDataSet) {
                if (typeof newDataSet != 'undefined') {
                    var processedData = scope.transformDataSetForMap(newDataSet);
                    scope.render(processedData);
                }
            });
        }
    };
});
