/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.directive("pieChart", function () {
    return {
        scope: {
            "dataSet": "=pieChart"
        },
        link: function (scope, element) {

            scope.render = function ()
            {

            };

            scope.$watch("dataSet", function () {
                scope.render();
            });
        }
    };
});

