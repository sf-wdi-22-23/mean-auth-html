'use strict';

// Declare app level module which depends on filters, and services
angular.module('basic-auth', ['basic-auth.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      });

      $routeProvider.when('/create', {
        templateUrl: 'templates/create',
        controller: 'CreateCtrl'
      });

      $routeProvider.when('/records/:id/edit', {
        templateUrl: 'templates/edit',
        controller: 'EditCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }]);
