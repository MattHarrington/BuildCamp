//Create a new Angular Module for the bartNowApp. 
var bartNowApp = angular.module("bartNowApp", ['ngRoute']);

bartNowApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/stations', {
        templateUrl: 'views/stations.html',
        controller: 'StationsCtrl',
        activetab: 'stations'
      }).
      when('/trains', {
        templateUrl: 'views/trains.html',
        controller: 'TrainsCtrl',
        activetab: 'trains'
      }).
      when('/trains/:stationAbbr', {
        templateUrl: 'views/trains.html',
        controller: 'TrainsCtrl',
        activetab: 'trains'
      }).
      otherwise({
        redirectTo: '/stations'
      });
  }]);


bartNowApp.factory("GeolocationService", ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
  return function () {
    //Credit to Rob Hurring: http://proccli.com/2013/10/angularjs-geolocation-service
    var deferred = $q.defer();

    if (!$window.navigator) {
      $rootScope.$apply(function () {
        deferred.reject(new Error("Geolocation is not supported"));
      });
    } else {
      $window.navigator.geolocation.getCurrentPosition(function (position) {
        $rootScope.$apply(function () {
          deferred.resolve(position);
        });
      }, function (error) {
        $rootScope.$apply(function () {
          deferred.reject(error);
        });
      });
    }

    return deferred.promise;
  }
}]);

bartNowApp.directive("bartMap", function () {

  //Initialize a variable to reference the Bing map control.
  var map;

  return {
    restrict: 'A', //require the bart-map "A"ttribute on the target element
    link: function (scope, elem, attrs) {

      var map = null;
      var stationPinLayer = new Microsoft.Maps.EntityCollection();

      //Create the map, and replace the initial div with it
      Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', {
        callback: function () {

          //Setup the default map options, and set your API key....
          var mapOptions = {
            credentials: "YOUR API KEY GOES HERE", //get your api key from http://www.bingmapsportal.com 
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 14,
            theme: new Microsoft.Maps.Themes.BingTheme(),

            //Play with these other options if you like:
            //showDashboard: true,
            //showScalebar: false,
            //enableClickableLogo: false,
            //enableSearchLogo: false,
            //showMapTypeSelector: true,
            //showBreadcrumb: false
          };

          //Initialize the map control
          map = new Microsoft.Maps.Map(elem[0], mapOptions);

          //Add the (initially empty) stationPinLayer
          map.entities.push(stationPinLayer);
        }
      });

      //Watch for the $scope.position value to change.  If it doesn, re-center the view
      scope.$watch('position', function (value) {
        if (value.latitude && map) {
          var centerLocation = new Microsoft.Maps.Location(scope.position.latitude, scope.position.longitude);
          map.setView({ center: centerLocation });
          var pin = new Microsoft.Maps.Pushpin(centerLocation);
          map.entities.push(pin);
        }
      });

      //Watch for the $scope.stations to change.  If they do, create their pushpins
      scope.$watch('stations', function (stations) {
        if (Object.prototype.toString.call(stations) == "[object Array]" && map) {
          //Empty the collection
          stationPinLayer.clear();
          stations.forEach(function (station) {
            var stationLocation = new Microsoft.Maps.Location(station.latitude, station.longitude);
            var bartPin = {
              icon: '../images/BartPushPin_18x24.png',
              width: 18,
              height: 24
            };
            var stationPushPin = new Microsoft.Maps.Pushpin(stationLocation, bartPin);
            stationPinLayer.push(stationPushPin);
          });

        }
      });
    }
  }
});


//Create the MainCtrl Controller...
bartNowApp.controller("MainCtrl", ['$scope', '$http', '$route', 'GeolocationService', function ($scope, $http, $route, geoLocationService) {
  $scope.$route = $route;
}]);

//Create the StationsCtrl Controller...
bartNowApp.controller("StationsCtrl", ['$scope', '$http', 'GeolocationService',
  function ($scope, $http, geoLocationService) {

    $scope.stations = [];
    //Start with an empty position and a default status...
    $scope.position = {};
    $scope.geoLocationStatus = "Determing Position....";

    $scope.getPosition = function () {
      //Get the position from our GeoLocationService
      geoLocationService().then(function (position) {
        //If we got a position back, save it to the $scope.position
        $scope.position = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        //And update the status
        $scope.geoLocationStatus = "Position Retrieved! (" + $scope.position.latitude + "," + $scope.position.longitude + ")";
      }, function (reason) {
        //otherwise, there was an error.  
        //Use a fake position if you can't use GPS on your device...
        //Microsoft SF Office: (37.785027,-122.406749 - http://binged.it/TZjpC6)
        $scope.position = { latitude: 37.785027, longitude: -122.406749 };
        $scope.geoLocationStatus = "Position could not be determined: " + reason + " Using Fake Position! (" + $scope.position.latitude + "," + $scope.position.longitude + ")";

      });

      //regardless of the position, get the stations.  
      //we waited to get stations because if the position is available
      //we can (eventually) pass it to the backend service to get 
      //stations sorted by their distance from our position 
      $scope.getStations();
    };

    $scope.getStations = function () {
      var stationsUrl = 'data/stations.json';
      //var stationsUrl = 'http://bartnowapidemo.azurewebsites.net/api/stations?lat=' + $scope.position.latitude + '&lon=' + $scope.position.longitude;
      //var stationsUrl = 'http://YOURWEBSITENAME.azurewebsites.net/api/stations?lat=' + $scope.position.latitude + '&lon=' + $scope.position.longitude;

      $http.get(stationsUrl).success(function (result) {
        $scope.stations = result;
      });
    }

    //Call getPositiion() to get the current position. 
    //getPosition() then calls getStation() to retrieve the station data for us
    $scope.getPosition();

  }]);

//Create the Trains Controller...
bartNowApp.controller("TrainsCtrl", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  $scope.stationAbbr = $routeParams.stationAbbr;
  $scope.station = null;


  $scope.getStations = function () {
    var stationsUrl = 'data/stations.json';
    //var stationsUrl = 'http://bartnowapidemo.azurewebsites.net/api/etd/' + $scope.stationAbbr;
    //var stationsUrl = 'http://YOURWEBSITENAME.azurewebsites.net/api/etd/' + $scope.stationAbbr;

    //Go get all the stations from the data source
    $http.get(stationsUrl).success(function (result) {
      //If you call a service, and get a single station back just set the station to the result
      $scope.station = result[0];

      //Use using the sample data though, all stations are returned
      //Loop through them until you find the matching one
      //for(var i in result){
      //  if(result[i].abbr === $scope.stationAbbr){
      //    $scope.station = result[i];
      //    break;
      //  }
      //}
    });
  }

  $scope.getStations();

}]);

