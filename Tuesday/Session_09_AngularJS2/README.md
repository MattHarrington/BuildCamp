<a name="AngularJSIntro2" />
# Intro to AngularJS - Part 2#
==========

## Overview ##

In the previous session, we learned how to add AngularJS to our website, and use it to implement the display of data in our Application.  We created a **"Model"** which was our Station/Train data, We created a **View** to display that data, which was basically the markup in the **Stations Column** in the **"index.html"** file, and we created a **Controller** called **MainCtrl** in the **"bartNowApp.js"** file.  

In this session we will continue to use AngularJS to enhance our site.  First, we'll use an AngularJS **Service** to retrieve the current position from the web browser's built-in geoLocation capabilities. Then we'll create our own custom **bart-map** directive to allow angular to show a Bing Maps map with the current position, as well as the stations on it.  Then, we'll add a second **page** or **view** to our application to show more detailed data about the trains for a stations and setup routes to navigate between the views.  Lastly, once you have implemented a NodeJS service, we'll point our front end at it! Let's go!

## Objectives ##

At the end of this session, you should be able to 

- Create an Angular Service
- Create and Angular Directive
- Work with Multiple Routes and Views

## Setup ##

The files you need to get started are included in the directory structure along with this file.  However, it is assumed that:

- You have **Visual Studio 2013** 
- You have the files included with this session:
	- The **"/Assets"** directory contains the various libraries and additional files you will add to the website you build in this session.
	- The **/AngularJS2BeginSollution"** directory contains the completed site from the previous AngularJS1 session. If you had a problem with your site from the previous session, you can use this folder as a starting point.  
	- The **"/AngularJS2EndSolution"** directory contains the completed site for this session.  You can use this as a reference.  

## Exercises ##

This session is broken down into some exercises.  You need to complete them in order.  

1. [Create a Service to get our Position](#GetPosition)
1. [Create a Directive to Display the Map](#MapDirective)
1. [Set up Routes and Views](#RoutesAndViews)
1. [AFTER NODEJS LABS - Retrieve Data From Live Service](#LiveService)

---

<a name="GetPosition" />
## Create a Service to get our Position ##

First, let's go ge the position from the browser.  Retrieving the position from the browser is something that you may need to do in multiple places throughout your app.  We happen to only retrieve it in one place as part of this demo, but for a more complete app you may need to get position data multiple times.  For that reason, it would be nice to modularize the code to get the position into a [**Service**](https://docs.angularjs.org/guide/services).  We can then use that service any time we need to get the position.  **Services** get passed into the code that needs them through process/pattern known as **Dependency Injection** (**DI**), and while perhaps confusing at first, DI offers benefits, like testability, that we won't get into here. [You can read up more about them in the AngularJS docs](https://docs.angularjs.org/guide/services).

1. If your web site from the previous session is functional, and matches the end state of the previous session, you can continue to work with it, however if needed you can open the **AngularJS2BeginSolution** web site if needed. In **Visual Studio**, from the menu bar, select **"File"** | **"Open"** | **"Web Site.."** and navigate to the **AngularJS2BeginSolution** folder for this session, and open it. 

	![01-010-OpenWebSite](images/01-010-openwebsite.png?raw=true "Open Web Site")

1. In the **Solution Explorer**, open the **"/js/bartNowApp.js"** file, and add the following code just below the **bartNowApp** declaration:

	<!-- mark:4-27 -->
	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

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
	 
	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

	  // ...

	}]);

	````
	
	> **Note:** Ok, some intense code there.  Let's talk about it briefly.  First, we state dependencies on the **$q** (a promise/deferral utility module), **$window** (so we can talk to the browser and its geolcation features), and **$rootScope** so we can update the bindings across the child **$scope**s when the position data is retrieved.  

	> The body of the function was pilfered from [**Rob Hurring**](http://proccli.com/2013/10/angularjs-geolocation-service), but basically it uses [**promises**](http://blogs.msdn.com/b/ie/archive/2011/09/11/asynchronous-programming-in-javascript-with-promises.aspx) to implement **asynchronous** code.  It basically says, ***"I promise to get you a position, or an error.  Go about your work, and I'll notify you when I have the answer"***. It then calls the brower's **geolocation.getCurrentPosition()** method to retrieve the position.  If it works, it notifies the caller of the position, and for AngularJS data binding purposes notifies the $rootScope that the position has been updated.  That way AngularJS can update any bound controls with the data.  If there were any errors, it notifies the caller that there was an error and passes the error data back.  **WHEW**!  

1. Now, we can update our **MainCtrl** contoller to use the service, and make the position available to the view.  Modify the **MainCtrl** definition to match the following:

	<!-- mark:9-53 -->
	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	bartNowApp.factory("GeolocationService", ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
	  return function () {
		 //...
	}]);

	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', '$http', 'GeolocationService',
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
			$http.get(stationsUrl).success(function (result) {
			  $scope.stations = result;
			});
		 }

		 //Call getPositiion() to get the current position. 
		 //getPosition() then calls getStation() to retrieve the station data for us
		 $scope.getPosition();

	  }]);
	````

1. Run the site in the browser, if you are prompted to allow the browser to access your location, set it to **"Always Allow"**

	![01-020-AlwaysAllow](images/01-020-alwaysallow.png?raw=true "Always Allow")

1. Finally, verify that the position and status (real or fake) are displayed:
	
	![01-030-PositionDisplay](images/01-030-positiondisplay.png?raw=true "Position Display")

---

<a name="MapDirective" />
## Create a Directive to Display the Map ##

Ok, so we have a position, but that's kind of a boring display.  Let's put it on a map!  For this, you'll need a Bing Maps API key.  They're free so go sign up for one here: https://www.bingmapsportal.com/.  In this exercise, we'll create an AngularJS [**Directive**](https://docs.angularjs.org/guide/directive) named **bart-map**.  This directive will completely replace the **div** element we use it on with a Bing Map complete with push pins for our current location, and all the stations.  Cool! 

1. Open **"bartNowApp.js"** and add the following code for the **"BartMap"** directive:
	<!-- mark:9-79 -->
	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	bartNowApp.factory("GeolocationService", ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
	  return function () {
		 //...
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
	bartNowApp.controller("MainCtrl", ['$scope', '$http', 'GeolocationService',
	  function ($scope, $http, geoLocationService) {
		 //...
	  }]);
	````


1. In the **index.html** file, add a reference to the BingMaps control at the top:
	<!-- mark:8-9 -->
	````HTML
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <script src="js/bartNowApp.js"></script>
	  <!-- Bing Maps Control reference -->
	  <script charset="UTF-8" type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
	</head>
	````



1. In **"index.html"**, replace the markup for the the **"Maps Column"** as follows, (notice the new **"bart-map"** directive to the **mapDiv** **&lt;div&gt;**.  We also got rid of the **"well"** **div**.):
	<!-- mark:3-11 -->
	````HTML
	<!-- Map Column-->
	<div class="col-xs-12 col-md-8 col-md-push-4">
	  <div id="mapDiv" class="map" bart-map></div>

	  <!-- Display the Position or Status-->
	  <div>
		 <p>Position (lat,lon): ({{position.latitude}}, {{position.latitude}})</p>
	  </div>
	  <div>
		 <p>Status: {{ geoLocationStatus }}</p>
	  </div>

	</div>
	````
1. And to position the map properly, open the **"/css/bartNow.css"** file and add a class to style the map:
	<!-- mark:5-11 -->
	````HTML
	#mainContent{
	  padding-top: 64px;
	}

	/* Style the Bing Maps control */
	.map {
	  position: relative;
	  width: 100%;
	  height: 320px;
	  margin-bottom: 15px;
	}
````


1. Now, view the site in the browser, and you should see the map display (if you haven't entered your bing maps api key properly, you'll see a banner across the front of the map, but it still works):

	![02-010-VerifyMap](images/02-010-verifymap.png?raw=true "Verify Map")

1. If you have properly entered your API key in the code above, the banner goes away:

	![02-020-ValidAPIKey](images/02-020-validapikey.png?raw=true "Valid API Key")

1. Here is the final version of the files we modified in this exercise.  First **"index.html"**

	````HTML
	<!DOCTYPE html>
	<html ng-app="bartNowApp">
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <!-- Bing Maps Control reference -->
	  <script charset="UTF-8" type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
	</head>
	<body ng-controller="MainCtrl">

	  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		 <div class="container">

			<div class="navbar-header">
			  <!-- Logo -->
			  <a class="navbar-brand" href="#"><img src="images/BartNowLogoWide_154x24.png" alt="" /></a>

			  <!-- Hamburger Button -->
			  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
				 <span class="sr-only">Toggle navigation</span>
				 <span class="icon-bar"></span>
				 <span class="icon-bar"></span>
				 <span class="icon-bar"></span>
			  </button>

			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div id="navbar" class="collapse navbar-collapse">
			  <ul class="nav navbar-nav">
				 <li class="active"><a href="#/stations">Stations</a></li>
				 <li><a href="#/trains">Trains</a></li>
			  </ul>
			</div>

		 </div>
	  </nav>

	  <div id="mainContent" class="container">

		 <div class="row">

			<!-- Map Column-->
			<div class="col-xs-12 col-md-8 col-md-push-4">
			  <div id="mapDiv" class="map" bart-map></div>

			  <!-- Display the Position or Status-->
			  <div>
				 <p>Position (lat,lon): ({{position.latitude}}, {{position.latitude}})</p>
			  </div>
			  <div>
				 <p>Status: {{ geoLocationStatus }}</p>
			  </div>

			</div>

			<!-- Stations Column -->
			<div class="col-xs-12 col-md-4 col-md-pull-8">
			  <div class="text-center" ng-hide="stations">
				 <h3>Loading Stations...</h3>
				 <img src="../images/loader.gif" alt="" />
			  </div>

			  <div ng-repeat="station in stations">
				 <p>{{station.name}} ({{station.abbr}})</p>
				 <div ng-repeat="train in station.etd">
					{{train.destination}}
					<span ng-repeat="departure in train.estimate"> | <img class="bartlinecolor" ng-src="/images/{{departure.color | lowercase}}.png" /> {{departure.minutes}}</span>
				 </div>
				 <hr />
			  </div>
			</div>

		 </div>

	  </div>

	  <!-- Bootstrap core JavaScript
	  ================================================== -->
	  <!-- Placed at the end of the document so the pages load faster -->
	  <script src="js/jquery-1.11.1.js"></script>
	  <script src="js/bootstrap.js"></script>

	</body>
	</html>
	````


1. And now **"bartNowApp.js"**:

	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

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
	bartNowApp.controller("MainCtrl", ['$scope', '$http', 'GeolocationService',
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
			$http.get(stationsUrl).success(function (result) {
			  $scope.stations = result;
			});
		 }

		 //Call getPositiion() to get the current position. 
		 //getPosition() then calls getStation() to retrieve the station data for us
		 $scope.getPosition();

	  }]);
	````


1. And finally **"bartNow.css"*

	````HTML
	#mainContent{
	  padding-top: 64px;
	}

	/* Style the Bing Maps control */
	.map {
	  position: relative;
	  width: 100%;
	  height: 320px;
	  margin-bottom: 15px;
	}
	````

	
---

<a name="RoutesAndViews" />
## Set up Routes and Views ##

All along, the **Stations** and **Trains** links have bee up in the Navigation Bar, but they don't work yet.  In this section, we'll move our content into some **Views** and add some **Routes** to the app so we can navigate.  To expedite things, the **Views** files have been created ahead of time and provided in the **/Assets/views** folder.  

1. In Visual Studio, add the **"Assets/views""** folder to the web site. 

1.  The **"Stations.html"** contains the same basic markup that we have had so far in the **Stations Column** back in **index.html**.  The only real change from the original markup is that we turned the station name and abbreviation into a link that will point to the **#/trains** route and pass along the station abbreviation as a parameter:  

	````HTML
	<div class="row">

	  <!-- Map Column-->
	  <div class="col-xs-12 col-md-8 col-md-push-4">
		 <div id="mapDiv" class="map" bart-map></div>

		 <!-- Display the Position or Status-->
		 <div ng-show="position">
			<p>Position (lat,lon): (**{{**position.latitude**}}**, **{{**position.latitude**}}**)</p>
		 </div>
		 <div>
			<p>Status: **{{** geoLocationStatus **}}**</p>
		 </div>

	  </div>

	  <!-- Stations Column -->
	  <div class="col-xs-12 col-md-4 col-md-pull-8">
		 <div class="text-center" ng-hide="stations">
			<h3>Loading Stations...</h3>
			<img src="../images/loader.gif" alt="" />
		 </div>

		 <div ng-show="stations" ng-repeat="station in stations">
			<p><a href="#/trains/{{station.abbr}}">**{{**station.name**}}** (**{{**station.abbr**}}**)</a></p>
			<div ng-repeat="train in station.etd">
			  **{{**train.destination**}}**
			  <span ng-repeat="departure in train.estimate"> | <img class="bartlinecolor" ng-src="/images/{{departure.color | lowercase}}.png" /> **{{**departure.minutes**}}**</span>
			</div>
			<hr />
		 </div>
	  </div>

	</div>
	````

1.  The **Trains.html** file has a new view that will show more detailed information for a selected station. 

	````HTML
	<div ng-show="station">
	  <h2><small>Trains Departing From:</small><br />{{station.name}} ({{station.abbr}})</h2>
	  <div class="row" ng-repeat="train in station.etd">
		 <div class="col-xs-12 col-md-4">
			<h3><small>To:</small> {{train.destination}}</h3>
		 </div>

		 <div class="col-xs-12 col-md-8">
			<table class="table table-bordered table-responsive" style="">
			  <thead>
				 <tr>
					<th>Line</th>
					<th>Departs(mins)</th>
					<th>Platform</th>
					<th>Cars</th>
				 </tr>
			  </thead>
			  <tbody>
				 <tr ng-repeat="departure in train.estimate">
					<td><img class="bartlinecolor" ng-src="/images/{{departure.color | lowercase}}.png" /></td>
					<td>{{departure.minutes}}</td>
					<td>{{departure.platform}}</td>
					<td>{{departure.length}}</td>
				 </tr>
			  </tbody>
			</table>
		 </div>
	  </div>
	</div>

	<div ng-hide="station">
	  <h1>You must first pick a station from the stations tab!</h1>
	</div>
````



1. Drag the **/Assets/angular-1.2.19/angular-route.js"** file to the **"js"** folder in the site.  This script file implements AngularJS's routing functionality.  

1. Replace the contents of **index.html** with the following (basically we removed the content in the **mainContent** div, and replaced it with a **&lt;div ng-view&gt;**.  We also added a reference to the new **angular-route.js" script file, and finally we set the **active** status for the **Stations** and **Trains** links along the top to be based on the current route info:

	<!-- mark:8,35-36,43-47 -->
	````HTML
	<!DOCTYPE html>
	<html ng-app="bartNowApp">
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <script src="js/angular-route.js"></script>
	  <script src="js/bartNowApp.js"></script>
	  <!-- Bing Maps Control reference -->
	  <script charset="UTF-8" type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
	</head>
	<body ng-controller="MainCtrl">

	  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		 <div class="container">

			<div class="navbar-header">
			  <!-- Logo -->
			  <a class="navbar-brand" href="#"><img src="images/BartNowLogoWide_154x24.png" alt="" /></a>

			  <!-- Hamburger Button -->
			  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
				 <span class="sr-only">Toggle navigation</span>
				 <span class="icon-bar"></span>
				 <span class="icon-bar"></span>
				 <span class="icon-bar"></span>
			  </button>

			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div id="navbar" class="collapse navbar-collapse">
			  <ul class="nav navbar-nav">
				 <li ng-class="{active: $route.current.activetab == 'stations'}"><a href="#/stations">Stations</a></li>
				 <li ng-class="{active: $route.current.activetab == 'trains'}"><a href="#/trains">Trains</a></li>
			  </ul>
			</div>

		 </div>
	  </nav>

	  <div id="mainContent" class="container">

		 <div ng-view></div>

	  </div>

	  <!-- Bootstrap core JavaScript
	  ================================================== -->
	  <!-- Placed at the end of the document so the pages load faster -->
	  <script src="js/jquery-1.11.1.js"></script>
	  <script src="js/bootstrap.js"></script>

	</body>
	</html>
	````

1. Replace the contents of **"bartNowApps.js"**.  The first big change is that we added a dependency to the on on **ngRoute**, and then used the **$routeProvider** to configure the routes. Then we moved the current code for the **MainCtrl** into a new controller named **StationsCtrl** wich will be used for the **#/stations** route.  We added a new controller named **TrainsCtrl** which will be used on the ""#/trains" routes, and then left just basic route info in the **MainCtrl** : 

	<!-- mark:1-26,126-204 -->
	````JavaScript
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

		 //Go get all the stations from the data source
		 $http.get(stationsUrl).success(function (result) {
			//If you call a service, and get a single station back just set the station to the result
			//$scope.station = result[0];

			//Use using the sample data though, all stations are returned
			//Loop through them until you find the matching one
			for(var i in result){
			  if(result[i].abbr === $scope.stationAbbr){
				 $scope.station = result[i];
				 break;
			  }
			}
		 });
	  }

	  $scope.getStations();

	}]);
	````
1. If you view the site in the browser now, the initial view shouldn't look much different, with the exception of the Station names now being links:

	![03-010-StationsView](images/03-010-stationsview.png?raw=true "Stations View")

1. If you click on one of the links, you'll be taken to the **#/trains" page for that station, were you can see more detailed info about the trains:

	![03-020-Trains](images/03-020-trains.png?raw=true "Trains")

1. Rather than re-state the many files here, you can find them all in the AngularJSEndSolution if you need them!  


---

<a name="LiveService" />
## AFTER NODEJS LABS - Retrieve Data From Live Service ##

Our site is basically done, EXCEPT, that it is still pulling fake static station data from the **"/data/stations.js"** file.  Once you have completed the subsequent labs to create the NodeJS server, you can come back and change the **StationsCtrl** and **TrainsCtrl** to get data from the live service instead. 

1. Open the **"bartNowApp.js"** app, and inside the **StationsCtrl** definition, modify the **$scope.getStations()** function to instead get code from your live site, and even pass in the lat/lon to get stations sorted by their distance from you:

	<!-- mark:5 -->
	````JavaScript
	$scope.getStations = function () {
	  //var stationsUrl = 'data/stations.json';
	  //var stationsUrl = 'http://bartnowapidemo.azurewebsites.net/api/stations?lat=' + $scope.position.latitude + '&lon=' + $scope.position.longitude;

	  var stationsUrl = 'http://YOURWEBSITENAME.azurewebsites.net/api/stations?lat=' + $scope.position.latitude + '&lon=' + $scope.position.longitude;

	  $http.get(stationsUrl).success(function (result) {
		 $scope.stations = result;
	  });
	}
	````

1. Similarly, you can modify the **TrainsCtrl**'s **$scope.getStations()** method to call the live api, and now request just single station:

	<!-- mark:4,8-9 -->
	````JavaScript
	$scope.getStations = function () {
	  //var stationsUrl = 'data/stations.json';
	  //var stationsUrl = 'http://bartnowapidemo.azurewebsites.net/api/etd/' + $scope.stationAbbr;
	  var stationsUrl = 'http://YOURWEBSITENAME.azurewebsites.net/api/etd/' + $scope.stationAbbr;

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
	````

---