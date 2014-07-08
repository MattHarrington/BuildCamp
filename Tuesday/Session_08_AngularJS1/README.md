<a name="AngularJSIntro1" />
# Intro to AngularJS - Part 1#
==========

## Overview ##

In the previous session we used Bootstrap to layout the basic UI for our bartNow web site.  In this session, we'll learn how to use AngularJS to start showing data on the site.   

[AngularJS](http://angularjs.org) is a web application development framework created by Google. It uses the **"Model-View-Controller"** (**MVC**) pattern to help web developers create client side apps (meaning they run in the browser) that are more maintainable and testable.  Although in the interest of making these demos fit in the allotted time, we won't be getting into testing the apps.  

> **Note:** At the time this is being written, AngularJS is at **version 1.2.19**.  The steps we take in this lab assume that version.  The Angular source files are included with the lab so you should be able to follow along using the provided files even if the official version of bootstrap has revved. 

## Objectives ##

At the end of this session, you should be able to 

- Add AngularJS to your own website
- Understand the basics of AngularJS apps
- Create an AngularJS Models, Views and Controllers

## Setup ##

The files you need to get started are included in the directory structure along with this file.  However, it is assumed that:

- You have **Visual Studio 2013** 
- You have the files included with this session:
	- The **"/Assets"** directory contains the various libraries and additional files you will add to the website you build in this session.
	- The **/AngularJS1BeginSollution"** directory contains the completed site from the previous Bootstrap session. If you had a problem with your site from the previous session, you can use this folder as a starting point.  
	- The **"/AngularJS1EndSolution"** directory contains the completed site for this session.  You can use this as a reference.  

## Exercises ##

This session is broken down into some exercises.  You need to complete them in order.  

1. [Add AngularJS to the Site](#AddAngularJS)
1. [Show a Single Station using AngularJS](#ShowSingleStation)
1. [Show a List of Stations](#ShowStationList)
1. [Show the Station Departures](#ShowDepartures)
1. [Load Stations From The Web](#GetStations)

---


<a name="AddAngularJS" />
## Add AngularJS to the Site ##

1. You can download AngularJS for free from http://angularjs.org.  Click on the download button near the middle of the page:

	![01-010-AngularJSSite](images/01-010-angularjssite.png?raw=true "AngularJS Site")

1. Then in the **"Download AngularJS"** popup, you can select the version and format you wish to download.  We'll use the current 1.2.19 release version, and grab it as a .zip file so we get all of the available AngularJS modules.  

	![01-020-DownloadAngularJS](images/01-020-downloadangularjs.png?raw=true "Download AngularJS")

1. Again, though, just to ensure that we are all working off the same version, the AngularJS 1.2.19 files that are needed for this session have already been included in the **"/Assets/AngularJS"** folder.  

1. Let's start out by opening the solution from the previous session.  If you completed the Bootstrap into lab successfully, and your markup matches the end result, you can continue working with it.  Otherwise, start **Visual Studio 2013" and from the menu bar select **"File"** | **"Open"** | **"Web Site..."**, and in the **"Open Web Site"** window, navigate to the **"AngularJS1SBeginSolution"** folder for this session, then click **"Open"** to open the web site. 

	![01-030-OpenStarter](images/01-030-openstarter.png?raw=true "Open Starter Web Site")

1. Go ahead and run the website (**Ctrl-F5**), and verify that it works, then close the browser when you are done. 

	![01-040-VerifyStarter](images/01-040-verifystarter.png?raw=true "Verify Starter Site")

1. Next, we'll add the **angular.js** core script file to the site.  In **Windows Explorer**, navigate to the **"/Assets/angular-1.2.19"** folder that is included with this session.  Right click on the **"angular.js"** file, and select **"Copy"** from th pop-up menu:

	> **Note:** We'll use the "un-minified" version in this session so that if the file pop-ups during debugging, we'll be able to read it.  For production though you would want the **"angular.min.js"** file to reduce its download size. 

	![01-050-CopyAngular](images/01-050-copyangular.png?raw=true "Copy Angular.js")

1. In the Visual Studio **Solution explorer**, right click the **"js"** folder, and select **"Paste"** to add the file to the site:

	![01-060-AddAngular](images/01-060-addangular.png?raw=true "Add Angular.js")

1. Next, open the **index.html** file, and add a reference to the **"/js/angular.js"** file by dragging the **"/js/angular.js"** file from the solution explorer to the end of the current stylesheet **&lt;link&gt;&lt;/link&gt;** tags:

	![01-070-AngularJSReference](images/01-070-angularjsreference.png?raw=true "Angular.js Reference")

1. Or, simply manually add the reference by typing it in...

	<!-- mark:5 -->
	````HTML
	<!-- ... -->
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />  
	  <script src="js/angular.js"></script>
	</head>
	<!-- ... -->
	````
1. Now, we'll use Angular's [**"ng-app"**  directive](https://docs.angularjs.org/api/ng/directive/ngApp) to tell angular that the opening **&lt;html&gt;** tag is going to be the beginning of our AngularJS "App"

	<!-- mark:2 -->
	````HTML
	<!DOCTYPE html>
	<html ng-app>
	<head>
   <!-- ... -->
	````

1. That **ng-app** at the end of the **&lt;html ng-app&gt;** looks kind of strange.  It's not a standard HTML5 attribute.  So what is it?  It's what Angular calls a [**"Directive"**](https://docs.angularjs.org/guide/directive). Angular Directives allow angular to manipute the DOM contents.  [There are a number of Directives included with Angular](https://docs.angularjs.org/api/ng/directive), and you can even create your own (we'll do that later).  

1. The directive naming might also through you off. If you look at the [documentation for the ngApp directive](https://docs.angularjs.org/api/ng/directive/ngApp), you see the name **"ngApp"**, however when we added it to the **&lt;html&gt;** tag as **"ng-app"**.  So, what's the real name?  Well, the real name is **"ngApp"**, but the attribute names in HTML are not case sensitive, so it was safer to have Angular look for **"ng-app"** when trying to locate the directive.  This is a common pattern in angular.  The programmitic objects use **"camel casing"** (called so because there is a **"hump"** or two in the middle) like **"ngApp"**, but the refer to them using an all lowercase dashed format like **"ng-app"**.

1. Ok, so all of that, but if we ran the site right now, it wouldn't look any different.  Let's add a template to the body so we can see AngularJS do some real work.  Add the following div 

	<!-- mark:1 -->
	````HTML
	<div>1 + 5 + 13 + 23 = {{ 1 + 5 + 13 + 23 }}</div>
	````

	to the **Stations Column** markup: 

	<!-- mark:6-7 -->
	````HTML
	<!-- ... -->
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="well">
		 <h2>Show the Stations Here.</h2>
		 <div>1 + 5 + 13 + 23 = {{ 1 + 5 + 13 + 23 }}</div>
	  </div>
	</div>
	<!-- ... -->
	````

1. Ok, more funky looking syntax.  The **{{ 1 + 5 + 13 + 23 }}** syntax is an [**"Angular Expression"**](https://docs.angularjs.org/guide/expression), and in this case we're asking AngularJS to evaluate the expression "1 + 5 + 13 + 23". To see the answer, go ahead and view the page in the browser (**Ctrl-F5**): 

	![01-080-EvaluatedExpression](images/01-080-evaluatedexpression.png?raw=true "Evaluated Expression")

1. Ok, that's pretty cool, if a little contrived.  But at least we can see that Angular is working.  Let's move on to do something a little more interesting, and starting diving into **M**odels, **V**iews, and **C**ontrollers (**MVC**)...

---

<a name="ShowSingleStation" />
## Show a Single Station using AngularJS ##

1. Before we can use Angular more formally, we need to implement some basic constructs.  First, we'll define the **"App"** [module](https://docs.angularjs.org/guide/module).  [Modules](https://docs.angularjs.org/guide/module) Are a key concept in Angular.  They act as a container or the various parts of your app like controllers, services, directives, etc.  The first module we create will represent our **"App"** 

1. In Visual Studio, in the **Solution Explorer** right-click the **"js"** folder, and select **"Add"** | **"JavaScript File"** from the pop-up menu:

	![02-010-AddJavaScriptFile](images/02-010-addjavascriptfile.png?raw=true "Add a JavaScript File")

1. Name the new file **"bartNowApp.js"** and click **"OK"** to create the file:

	![02-020-BartNowAppJS](images/02-020-bartnowappjs.png?raw=true "BartNow App JS")

1. In the new bartNowApp.js file, add the following code, and save the file:

	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);
	````
1. Add a reference to the new bartNowApp.js script file in **index.html**

	<!-- mark:6 -->
	````HTML
	<!-- ... -->
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />  
	  <script src="js/angular.js"></script>
	  <script src="js/bartNowApp.js"></script>
	</head>
	<!-- ... -->
	````

1. Then update the **&lt;html ng-app&gt;** tag to include the **bartNowApp** module name in the **ng-app** directive: 

	<!-- mark:1 -->
	````HTML
	<html ng-app="bartNowApp">
	````

1. There are some scare parts here, and that is all those **"bartNowApp"** literal values (the ones enclosed in single or double quotes).  They are scare because if you mistype them, things won't work.  So make sure that you name it the same everywhere.  Being careful with your typing is going to be just part of life with AngularJS.  

1. Now is a good time to re-run the site in the browser and make sure it works. ***It won't look any different before unless you've broken something*** If you get errors, or the **{{ 1 + 5 + 13 + 23 }}** expression doesn't evaluate properly, go double check your typing and look for any typos.  Close the browser when you are done.  

	![02-030-VerifyApp](images/02-030-verifyapp.png?raw=true "Verify App")

1. Back in the **bartNowApp.js** add a [**Controller**](https://docs.angularjs.org/guide/controller) named **"MainCtrl"** (The **"Ctrl"** suffix is just a common convention, not a requirement)  to the app by adding the following hightlighted code to the bottom of the file.  
 
	<!-- mark:4-18 -->
	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', function ($scope) {

	  //Add a static model for a single bart station 
	  $scope.station = {
		 longitude: -122.271604,
		 latitude: 37.803664,
		 name: "12th St. Oakland City Center",
		 abbr: "12TH",
		 county: "alameda",
		 state: "CA",
		 zipcode: "94612"
	  };

	}]);
	````

	> **Note:** Notice the use of the **$scope** object.  **$scope** is core module included with Angular.  The **$scope** object provides the context for a controller, and thus for the view it is bound to.  By adding items to the **$scope** inside a controller, we can then **bind** to those items from the view.  

1. Then back in **index.html** assign our new controller as the controller for the **&lt;body&gt;** of our page.  In this case the contents of the **&lt;body&gt;...&lt;/body&gt;** make up the **View**.  To make the assignment, modify the opening **&lt;body&gt;** tag to match the following:

	<!-- mark:1 -->
	````HTML
	<body ng-controller="MainCtrl">
	````

	> **Note:** the **"MainCtrl"** name used here in the **"ng-controller"** directive must match the name provided previously when the controller was created. Case sensitive and all.  I can't count how many times simple typos tripped me up while I was planning these labs! 

1. Lastly, modify the **Stations Column** markup we played with before to display the single station from our Model.  In this case, we'll use a table to display the station's properties and values: 

	> **Note:** Notice that the values for the station are being retrieved using **{{ station.&lt;property&gt; }}** Angular expressions.  These are **one-way binding expressions** that tell Angular to watch the $scope.station.* values and any time they change update the **"view"** (display) of the data here in these table cells  with the latest value.  This is a common technique used in many modern programming frameworks called **"Data Binding"**.  


	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="well">
		 <h2>Show the Stations Here.</h2>
		 <table class="table table-bordered">
			<thead>
			  <tr>
				 <th>Property</th>
				 <th>Value</th>
			  </tr>
			</thead>
			<tbody>
			  <tr>
				 <td>Name:</td>
				 <td>{{station.name}}</td>
			  </tr>
			  <tr>
				 <td>Abbreviation:</td>
				 <td>{{station.abbr}}</td>
			  </tr>
			  <tr>
				 <td>County:</td>
				 <td>{{station.county}}</td>
			  </tr>
			  <tr>
				 <td>State:</td>
				 <td>{{station.state}}</td>
			  </tr>
			  <tr>
				 <td>Zip Code::</td>
				 <td>{{station.zipcode}}</td>
			  </tr>
			  <tr>
				 <td>Latitude:</td>
				 <td>{{station.latitude}}</td>
			  </tr>
			  <tr>
				 <td>Longitude:</td>
				 <td>{{station.longitude}}</td>
			  </tr>
			  <tr>
				 <td>Map:</td>
				 <td><a href="http://www.bing.com/maps/?q={{station.latitude}},{{station.longitude}}" target="_blank">link</a></td>
			  </tr>
			</tbody>
		 </table>
	  </div>
	</div>
	````

1. Just in case you need it, here is the current full markup for **index.html**:


	````HTML
	<!DOCTYPE html>
	<html ng-app="bartNowApp">
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <script src="js/bartNowApp.js"></script>
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
			  <div id="mapDiv" class="map">
				 <div class="well"><h2>Show the Map Here</h2></div>
			  </div>
			</div>

			<!-- Stations Column -->
			<div class="col-xs-12 col-md-4 col-md-pull-8">
			  <div class="well">
				 <h2>Show the Stations Here.</h2>
				 <table class="table table-bordered">
					<thead>
					  <tr>
						 <th>Property</th>
						 <th>Value</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						 <td>Name:</td>
						 <td>{{station.name}}</td>
					  </tr>
					  <tr>
						 <td>Abbreviation:</td>
						 <td>{{station.abbr}}</td>
					  </tr>
					  <tr>
						 <td>County:</td>
						 <td>{{station.county}}</td>
					  </tr>
					  <tr>
						 <td>State:</td>
						 <td>{{station.state}}</td>
					  </tr>
					  <tr>
						 <td>Zip Code::</td>
						 <td>{{station.zipcode}}</td>
					  </tr>
					  <tr>
						 <td>Latitude:</td>
						 <td>{{station.latitude}}</td>
					  </tr>
					  <tr>
						 <td>Longitude:</td>
						 <td>{{station.longitude}}</td>
					  </tr>
					  <tr>
						 <td>Map:</td>
						 <td><a href="http://www.bing.com/maps/?q={{station.latitude}},{{station.longitude}}" target="_blank">link</a></td>
					  </tr>
					</tbody>
				 </table>
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
1. As well as here is the complete code for the **"bartNowApp.js"** file:


	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', function ($scope) {

	  //Add a static model for a single bart station 
	  $scope.station = {
		 longitude: -122.271604,
		 latitude: 37.803664,
		 name: "12th St. Oakland City Center",
		 abbr: "12TH",
		 county: "alameda",
		 state: "CA",
		 zipcode: "94612"
	  };

	}]);
	````

1. When you are ready, view the site in the browser and verify that the station data is displayed properly. 

	![02-040-SingleStation](images/02-040-singlestation.png?raw=true "Single Station")

1. In this exercise, we created:

	- An **App** module: bartNowApp
	- A **Model**: The $scope.station single station object
	- A **Controller**: MainCtrl
	- A **View**: the **&lt;body&gt;...&lt;/body&gt;...** element in **index.html** and the various **{{...}}** angular expressions in it.

---

<a name="ShowStationList" />
## Show a List of Stations ##

1. In the previous exercise, we displayed a single station from our **model** (**$scope.station**) in our **view** (the **index.html** **&lt;body&gt;&lt;/body&gt;**. In this exercise, we'll modify the model to be an array of stations, then we'll display them using the awesome [**ng-repeat**](https://docs.angularjs.org/api/ng/directive/ngRepeat) directive.

1. First, modify the definition of the **"MainCtrl** in **"bartNowApp.js"** to match the following: 

	<!-- mark:4-16 -->
	````JavaScript
	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', function ($scope) {

	  //Add a static model for a single bart station 
	  //This time with an array of stations though, not just one
	  $scope.stations = [
		 { name: "12th St. Oakland City Center", abbr: "12TH", zipcode: "94612" },
		 { name: "16th St. Mission", abbr: "16TH", zipcode: "94110" },
		 { name: "19th St. Oakland", abbr: "19TH", zipcode: "94612" },
		 { name: "24th St. Mission", abbr: "24TH", zipcode: "94110" },
		 { name: "Ashby", abbr: "ASHB", zipcode: "94703" },
		 { name: "Balboa Park", abbr: "BALB", zipcode: "94112" },
		 { name: "Bay Fair", abbr: "BAYF", zipcode: "94578" },
		 { name: "Castro Valley", abbr: "CAST", zipcode: "94546" },
		 { name: "Civic Center/UN Plaza", abbr: "CIVC", zipcode: "94102" },
		 { name: "Coliseum/Oakland Airport", abbr: "COLS", zipcode: "94621" }];

	}]);
	````

	> **Note:** This changes our **model** to be an array of stations, not just a single station.  Although we are still statically defining (hard coding) the model for now.  You could say that we modified the **controller** as well, but only in that it now points to an array as a model rather than a single object. 

1. Update the view by changing the **Station Columns** div where the single station was being displayed to instead display the list of stations.  We'll use a table again, but this time the each table row will show a single station, and we'll generate them dynamically using the **ng-repeat** directive: 

	<!-- mark:5-24 -->
	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="well">
		 <h2>Show the Stations Here.</h2>
		 <table class="table table-bordered">
			<thead>
			  <tr>
				 <th>Name</th>
				 <th>Abbr</th>
				 <th>Zip</th>
			  </tr>
			</thead>
			<tbody>

			  <!-- repeat the table row for each station -->
			  <!-- in the $scope.stations array  -->
			  <tr ng-repeat="station in stations">
				 <td>{{station.name}}:</td>
				 <td>{{station.abbr}}</td>
				 <td>{{station.zipcode}}</td>
			  </tr>

			  </tbody>
		 </table>
	  </div>
	</div>
	````

1. Ok, if you view the site in the browser now, you should see the list of stations displayed!  So cool!:

	![03-010-StatoinList](images/03-010-statoinlist.png?raw=true "Station List")

1. And again just in case you need it, here is the current complete markup for **"index.html"**:

	````HTML
	<!DOCTYPE html>
	<html ng-app="bartNowApp">
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <script src="js/bartNowApp.js"></script>
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
			  <div id="mapDiv" class="map">
				 <div class="well"><h2>Show the Map Here</h2></div>
			  </div>
			</div>

			<!-- Stations Column -->
			<div class="col-xs-12 col-md-4 col-md-pull-8">
			  <div class="well">
				 <h2>Show the Stations Here.</h2>
				 <table class="table table-bordered">
					<thead>
					  <tr>
						 <th>Name</th>
						 <th>Abbr</th>
						 <th>Zip</th>
					  </tr>
					</thead>
					<tbody>

					  <!-- repeat the table row for each station -->
					  <!-- in the $scope.stations array  -->
					  <tr ng-repeat="station in stations">
						 <td>{{station.name}}:</td>
						 <td>{{station.abbr}}</td>
						 <td>{{station.zipcode}}</td>
					  </tr>

					  </tbody>
				 </table>
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


1. And for **"bartNowApp.js"**:

	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', function ($scope) {

	  //Add a static model for a single bart station 
	  //This time with an array of stations though, not just one
	  $scope.stations = [
		 { name: "12th St. Oakland City Center", abbr: "12TH", zipcode: "94612" },
		 { name: "16th St. Mission", abbr: "16TH", zipcode: "94110" },
		 { name: "19th St. Oakland", abbr: "19TH", zipcode: "94612" },
		 { name: "24th St. Mission", abbr: "24TH", zipcode: "94110" },
		 { name: "Ashby", abbr: "ASHB", zipcode: "94703" },
		 { name: "Balboa Park", abbr: "BALB", zipcode: "94112" },
		 { name: "Bay Fair", abbr: "BAYF", zipcode: "94578" },
		 { name: "Castro Valley", abbr: "CAST", zipcode: "94546" },
		 { name: "Civic Center/UN Plaza", abbr: "CIVC", zipcode: "94102" },
		 { name: "Coliseum/Oakland Airport", abbr: "COLS", zipcode: "94621" }];

	}]);
	````

---

<a name="ShowDepartures" />
## Show the Station Departures ##

1.  We're gradually making our model more complex.  We started with just a single station, then we stepped up to an array of stations.  This time, let's add a nested array of departing trains for each station.  When we are done we'll have a model that more closely matches the data we'll retrieve dynamically from the web later.  Modify the **"MainCtrl"** in **"bartNowApp.js"** with as follows (complete code for the file shown):


	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', function ($scope) {

	  //Add a static model for a single bart station 
	  //This time with an array of stations each with it's
	  //own nested array of estimate times of departure for 
	  //multiple remote stations, as welll as individual estimates
	  //for individual trains on to those target destinations
	  //The sample data here is trimmed significantly to help
	  //visualize it.
	  $scope.stations = [{
		 name: "12th St. Oakland City Center",
		 abbr: "12TH",
		 etd: [
			{
			  destination: "24th Street",
			  estimate: [
				 { minutes: "25", color: "YELLOW" },
				 { minutes: "40", color: "YELLOW" }]
			},
			{
			  destination: "Fremont",
			  estimate: [
				 { minutes: "5", color: "ORANGE" },
				 { minutes: "20", color: "ORANGE" }]
			}]
	  },
	  {
		 name: "16th St. Mission",
		 abbr: "16TH",
		 etd: [
			{
			  destination: "24th Street",
			  estimate: [
				 { minutes: "43", color: "YELLOW" },
				 { minutes: "58", color: "YELLOW" }]
			},
			{
			  destination: "Daly City",
			  estimate: [
				 { minutes: "3", color: "GREEN" },
				 { minutes: "9", color: "BLUE" }]
			}]
	  }
	  ];

	}]);
	````

1. Next, we'll modify the view to display the new data, let's start by moving away from a table for display and start to use repeating divs instead.  Modify the **Stations Column** as follows (we won't show the entire page markup here, but we'll show it in a few steps if you need it):

	<!-- mark:5-8 -->
	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="well">
		 <h2>Show the Stations Here.</h2>
		 <div ng-repeat="station in stations">
			<p>{{station.name}} ({{station.abbr}})</p>
			<hr />
		 </div>
	  </div>
	</div>
	````

1. View the page in the browser and verify that the stations appear in repeating divs with horizontal rules between them (remember the sample data has been trimmed to to only two stations):

	![04-010-RepeatingStationDivs](images/04-010-repeatingstationdivs.png?raw=true "Repeating Station Divs")

1. Now, we'll augment the ***"template"** for each station to include a nested set of repeating **divs** for each possible destination:

	<!-- mark:7-9 -->
	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="well">
		 <h2>Show the Stations Here.</h2>
		 <div ng-repeat="station in stations">
			<p>{{station.name}} ({{station.abbr}})</p>
			<div ng-repeat="train in station.etd">
			  {{train.destination}}
			</div>
			<hr />
		 </div>
	  </div>
	</div>
	````

1. Again, view the site in the browser.  You should now see that for each origin station, there is a list of possible destination displayed:

	![04-020-StationDestinations](images/04-020-stationdestinations.png?raw=true "Station Destinations")

1. And finally, for each possible destination display the estimated times of departure (in minutes) for trains to that destination along with a graphical icon indicating the bart **"line"** the train is running on (Red, Orange, Yellow, Green or Blue):

	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="well">
		 <h2>Show the Stations Here.</h2>
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
	````
1. Run the site in the browser and verify the display of the estimated depature times for multiple destinations:

	![04-030-EstimatedDepartures](images/04-030-estimateddepartures.png?raw=true "Estimated Departures")

1. Finally, we can get rid of the extra markup in the **Stations Column** that displays the **"Show the Stations Here"** header, as well as the **"well"** div around the stations. The **"well"** has been a handy way to visualize the column but now that we have data in it, we don't need it.  Getting rid of the **"well"** will help free up some space for smaller displays as well. 

	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div ng-repeat="station in stations">
		 <p>{{station.name}} ({{station.abbr}})</p>
		 <div ng-repeat="train in station.etd">
			{{train.destination}}
			<span ng-repeat="departure in train.estimate"> | <img class="bartlinecolor" ng-src="/images/{{departure.color | lowercase}}.png" /> {{departure.minutes}}</span>
		 </div>
		 <hr />
	  </div>
	</div>
	````

1. And take one more look in the browser (a much cleaner look):

	![04-040-CleanedUp](images/04-040-cleanedup.png?raw=true "Cleaned Up")

1. Here's the final markup for **"index.html"**:

	````HTML
	<!DOCTYPE html>
	<html ng-app="bartNowApp">
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <script src="js/bartNowApp.js"></script>
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
			  <div id="mapDiv" class="map">
				 <div class="well"><h2>Show the Map Here</h2></div>
			  </div>
			</div>

			<!-- Stations Column -->
			<div class="col-xs-12 col-md-4 col-md-pull-8">
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

1. And for **"bartNowApp.js"**:

	````JavaScript
	//Create a new Angular Module for the bartNowApp. 
	var bartNowApp = angular.module("bartNowApp", []);

	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', function ($scope) {

	  //Add a static model for a single bart station 
	  //This time with an array of stations each with it's
	  //own nested array of estimate times of departure for 
	  //multiple remote stations, as welll as individual estimates
	  //for individual trains on to those target destinations
	  //The sample data here is trimmed significantly to help
	  //visualize it.
	  $scope.stations = [{
		 name: "12th St. Oakland City Center",
		 abbr: "12TH",
		 etd: [
			{
			  destination: "24th Street",
			  estimate: [
				 { minutes: "25", color: "YELLOW" },
				 { minutes: "40", color: "YELLOW" }]
			},
			{
			  destination: "Fremont",
			  estimate: [
				 { minutes: "5", color: "ORANGE" },
				 { minutes: "20", color: "ORANGE" }]
			}]
	  },
	  {
		 name: "16th St. Mission",
		 abbr: "16TH",
		 etd: [
			{
			  destination: "24th Street",
			  estimate: [
				 { minutes: "43", color: "YELLOW" },
				 { minutes: "58", color: "YELLOW" }]
			},
			{
			  destination: "Daly City",
			  estimate: [
				 { minutes: "3", color: "GREEN" },
				 { minutes: "9", color: "BLUE" }]
			}]
	  }
	  ];

	}]);
	````

---

<a name="GetStations" />
## Load Stations From The Web ##

Ok, so far, we have been getting the station data for our **"model"** by hard coding it into our controller's scope.  That's just not how you would do it in the real world.  A more likely scenario is that you will be retrieving that data dynamically from a web services of some kind.  In subsequent sessions we'll see how to create those actual web services, but for now we can at least put a static document of actual data from a certain point in time up on the server.  We can then at least see the process for retrieving data (albeit static data) from the web.  Then later, when we have created our own web service, we can point our site to the real live data.  

1.  The first thing we need to do is configure the development web server (IIS Express) that Visual Studio uses when we debug our apps.  We need to tell it that it is allowed to send .json files to the client.  In the Visual Sudio **Solution Explorer**, open the **"Web.config"" file, and add the following XML to the bottom just before the closing **&lt;/configuration&gt;** tag, then save and close **"Web.config"**:

	<!-- mark:4-9 -->
	````XML
	  <!-- ... -->
	  </system.web>

	  <system.webServer>
		 <!-- Allow .json files to be downloaded -->
		 <staticContent>
			<mimeMap fileExtension=".json" mimeType="application/json" />
		 </staticContent>
	  </system.webServer>

	</configuration>
	````

1. Add the **"/Assets/data"** folder to the web site using the methods described previously, then open the **/data/stations.json** file to review it:

	![05-010-StationsJson](images/05-010-stationsjson.png?raw=true "Stations.json Data File")

	> **Note:** This file is a copy of the output from the actual **Node.JS** server you will create later.  Of course since this data was captured previously, it is a ***static*** document, and the trains have all ***left the stations*** so to speak.  However, this will server as a valid web resource we can download until we have the actual service running.  

1. Lastly, we'll modify the **Controller** to get the stations data from the data file via **http** rather than hard coding a subset of data.  In the **"bartNowApp.js"** file, modify the **MainCtrl** controller code to match the following  (the entire **"bartNowApp.js"** file contents are shown):

	<!-- mark:4-22 -->
	````JavaScript
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
	````

1. Notice a few things from the code above.  First we added a dependency on the built-in Angular **$http** module, and passed it in to our controller as an argument.  

	<!-- mark:2 -->
	````JavaScript
	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

	  // ...

	}]);
	````

1. Then we initialized **$scope.stations** to an empty array.  

	<!-- mark:4 -->
	````JavaScript
	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

	  $scope.stations = [];

	  // ...

	}]);
	````


1. Then we added the **$scope.getStations** function to retrieve stations data via **$http**:

	<!-- mark:6-11 -->
	````JavaScript
	//Create the MainCtrl Controller...
	bartNowApp.controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

	  $scope.stations = [];

	  $scope.getStations = function () {
		 var stationsUrl = 'data/stations.json';
		 $http.get(stationsUrl).success(function (result) {
			$scope.stations = result;
		 });
	  }

	  // ...

	}]); 
	````
1.  Then lastly, we called the **$scope.getStations()** data to load the station data automatically when the controller gets created:

	<!-- mark:16 -->
	````JavaScript
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
	````

1. Finally, let's add a **loading** indicator to the view that will display when the stations are still being downloaded from the web.  Add the following to the top of the **Stations Column** in **""index.html"**

	<!-- mark:3-7 -->
	````HTML
	<!-- Stations Column -->
	<div class="col-xs-12 col-md-4 col-md-pull-8">
	  <div class="text-center" ng-hide="stations">
		 <h3>Loading Stations...</h3>
		 <img src="../images/loader.gif" alt="" />
	  </div>

	  <div ng-repeat="station in stations">
		 <!-- ... -->
	  </div>
	</div>
	````
1.  Now, run the site in the browser.  Notice the initial **"Loading Stations..."** display while the **/data/stations.json** data file is being retrieved:

	![05-020-Loading](images/05-020-loading.png?raw=true "Loading...")

1. Then, the **Stations Column** should populate with the view of the data: 

	![05-030-StationsLoaded](images/05-030-stationsloaded.png?raw=true "StationsLoaded")

1. Ok, here is the complete markup for the files that changed (other than th e newly added **/data/stations.json**).  First **"index.html"**

	````HTML
	<!DOCTYPE html>
	<html ng-app="bartNowApp">
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />
	  <script src="js/angular.js"></script>
	  <script src="js/angular-resource.js"></script>
	  <script src="js/bartNowApp.js"></script>
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
			  <div id="mapDiv" class="map">
				 <div class="well"><h2>Show the Map Here</h2></div>
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


1. Then **"bartNowApp.js"**: 

	````JavaScript
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
	````

1. And don't forget **"Web.config"**:

	````XML
	<?xml version="1.0"?>
	<configuration>

	  <system.web>
		 <compilation debug="true" targetFramework="4.5" />
		 <httpRuntime targetFramework="4.5" />
	  </system.web>

	  <system.webServer>
		 <!-- Allow .json files to be downloaded -->
		 <staticContent>
			<mimeMap fileExtension=".json" mimeType="application/json" />
		 </staticContent>
	  </system.webServer>

	</configuration>
	````
---


