'use strict';

// Declare app level module which depends on views, and components
var hackAppKillCount = angular.module('hackAppKillCount', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/start/start.tpl.html',
                controller: 'StartController as startCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
}])
.value("Settings", {
    BASE_URL: "https://killcount.herokuapp.com"
});