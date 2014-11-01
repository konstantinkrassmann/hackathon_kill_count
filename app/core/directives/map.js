/**
 * Created by Kostja on 01.11.14.
 */
hackAppKillCount.directive("map", function () {
  return {
    scope: {
      "dataSet": "=map",
      "tipTemplate": "="
    },
    link: function (scope, element) {
      scope.render = function() {
        var map = new Datamap({
          element: element,
          fills: {
            RED: 'red',
            defaultFill: 'white'
          },
          data: {
            IRL: {
              fillKey: 'RED',
              casualties: 2002
            },
            USA: {
              fillKey: 'RED',
              casualties: 10381
            }
          },
          geographyConfig: {
            popupTemplate: function(geo, data) {
              return ['<div class="hoverinfo"><strong>',
                      'Number of things in ' + geo.properties.name,
                      ': ' + data.casualties,
                      '</strong></div>'].join('');
            }
          }
        });
      };
    }
  };
});
