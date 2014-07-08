//Create a new Angular Module for the bartNowApp. 
var bartNowApp = angular.module("bartNowApp", []); 
 
//Create the MainCtrl Controller...
bartNowApp.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

  $scope.stations = [];

  $scope.getStations = function () {
    var stationsUrl = 'data/stations.json';
    $http.get(stationsUrl).success(function (result) {
      $scope.stations = result;
    });
  }

  $scope.getStations();

}]);
