'use strict';

/* MAIN Controller */

angular.module('basic-auth')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$auth', '$http',  function ($scope, $rootScope, $location, $auth, $http) {

    // LOGIN/REGISTER
    $scope.user = {};

    $scope.types = [
      { name: 'nurse' },
      { name: 'investigator' }
    ];

    $scope.isAuthenticated = function() {
      $http.get('/api/me').then(function (data) {
        if (!!data.data) {
          $scope.currentUser = data.data;
        } else {
          $auth.removeToken();
        }
      }, function (data) {
        $auth.removeToken();
        $location.path('/');
      });
    };

    $scope.isAuthenticated();

    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          console.log(response)
          $auth.setToken(response);
          $scope.isAuthenticated();
          $scope.user = {};
        })
        .catch(function(response) {
          console.log(response)
        });
    };

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $auth.setToken(response.data.token);
          $scope.isAuthenticated();
          $scope.user = {};
        })
        .catch(function(response) {
          console.log(response)
        });
    };

    $scope.logout = function() {
      $auth.logout()
        .then(function() {
          $auth.removeToken();
          $scope.currentUser = null;
          $location.path('/')
        });
    };
  }]);
