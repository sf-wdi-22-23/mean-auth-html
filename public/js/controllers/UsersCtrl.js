'use strict';

/* USER Controllers */

angular.module('basic-auth')
  .controller('CreateCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    $scope.showForm = true;
    $scope.currentDate = new Date().toString();

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
  }])

  .controller('EditCtrl', ['$scope', '$http', '$auth', 'Auth', '$routeParams', '$location', function($scope, $http, $auth, Auth, $routeParams, $location) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    var record_id = $routeParams.id;

    $http.get('/api/posts/'+record_id).success(function(data) {
        $scope.post = data;
    });

    $scope.editPost = function() {
        delete $scope.post._id;
        $http.post('/api/posts/'+record_id, $scope.post).success(function(data) {
            console.log(data);
            $location.url('/records');
        });
    };
  }])

  .controller('RecordsCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').success(function(data) {
      $scope.user = data;
    });

    $http.get('/api/posts').success(function(data) {
      $scope.posts = data;
    });
  }]);
