'use strict';

/* USER Controllers */

angular.module('basic-auth')
  .controller('ProfileCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    $scope.showForm = true;

    $scope.createPost = function() {
    	$http.post('/api/posts', $scope.post)
    		.success(function(response) {
                $scope.showSuccess = true;
    		})
    		.error(function(response) {
    			console.log(response);
    		});
    };

    $scope.anotherCase = function() {
        $scope.showForm = true;
        $scope.showSuccess = false;
        $scope.posts = {};
    };
  }]);

angular.module('basic-auth')
  .controller('RecordsCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    $http.get('/api/posts').success(function(data) {
      $scope.posts = data;
    });
  }]);
