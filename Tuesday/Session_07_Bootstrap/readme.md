<a name="IntroToBootstrap" />
# Intro to Bootstrap #
==========

## Overview ##

In previous sessions, we covered the basics of creating web pages using HTML, CSS and JavaScript.  While these languages are mature (they've all been around for years and years by now), that doesn't mean they are necessarily easy to use in the ever-evolving world of standards, browsers, and devices. The end result is that if you plan to focus on creating applications using these languages, you need some tools to make you more effective and productive.  

In this session, we'll take quick look at [Bootstrap](http://getbootstrap.com).  Bootstrap makes it much simpler to create crisp, clean, responsive mobile first layouts for your website.  You can learn more about bootstrap from http://getbootstrap.com 

> **Note:** At the time this is being written, Bootstrap is at **version 3.2**.  The steps we take in this lab assume that version.  The Bootstrap source files are included with the lab so you should be able to follow along using the provided files even if the official version of bootstrap has revved. 

## Objectives ##

At the end of this session, you should be able to 

- Add bootstrap to your own sites
- Understand the basics of how bootstrap works
- Create responsive grid layouts
- Create responsive navigation layouts

## Setup ##

The files you need to get started are included in the directory structure along with this file.  However, it is assumed that:

- You have **Visual Studio 2013** (express for Web or a full version)
- You have the files included with this session:
	- The **"/Assets"** directory contains the various libraries and additional files you will add to the website you build in this session.
	- The **"/EndSolution"** directory contains the completed site for this session.  You can use this as a reference.  

## Exercises ##

This session is broken down into some exercises.  You need to complete them in order.  

1. [Create a New Web Site](#CreateSite)
1. [Add bootstrap to the site](#BootstrapBootstrap)
1. [Learning about Bootstrap's Responsive Breakpoints](#Breakpoints)
1. [Creating the responsive grid layout for our site](#Grids)
1. [Creating the navigation bar for our site](#Navigation)

---


<a name="CreateSite" />
## Create a New Web Site ##

In this exercise, we'll start out by creating a new web site in Visual Studio 2013 with some initial content in it.  Then we'll add bootstrap to the site and apply a few quick styles to see how easy it is to use.  

1. Open **Visual Studio 2013** and from the menu bar, select **"File"** | "**New"** | **"Web Site..."**

	> **Note:** You create web sites with Visual Studio, you have a choice of using a simple "Web Site" or a more formal "Project".  Both have their merits, but we will use a "Web Site" here to keep the Visual Studio involvement in the process to a minimum.  

	![01-010-FileNewWebSite](images/01-010-filenewwebsite.png?raw=true "File New Web Site")

1. In the **"New Web Site"** dialog, select:

	- **"Visual C#"** (we won't actually be using C# at all though)
	- **"ASP.NET Empty Web Site"**	
	- **Web Location: File System** 
	- **Enter the path to the folder where you want the web site to be created"**
	- **Click OK**

	![01-020-NewWebSite](images/01-020-newwebsite.png?raw=true "New Web Site")

1. Once the website has been created, in the Visual Studio **"Solution Explorer"** you should see an empty project (with the exception of the **Web.config** file):

	![01-030-EmptyProject](images/01-030-emptyproject.png?raw=true "Empty Project")

1. Let's save everything right now.  From the Visual Studio menu bar, select **"File"** | **"Save All"**.  

1. Next, we'll add a default document (**index.html**) to the site.  In the **"Solution Explorer"**, **right-click** the **"BartNow"** project and select **"Add"** | **"Add New Item..."** from the pop-up menu:

	![01-040-AddNewItem](images/01-040-addnewitem.png?raw=true "Add New Item")

1. Then in the **"Add New Item"" window, select **"HTML Page"**, name the new file **"index.html"** and click **"Add"**

	![01-050-HtmlDocument](images/01-050-htmldocument.png?raw=true "HTML Document")

1. Replace the contents of the new **index.html** file with the following markup:

	````HTML
	<!DOCTYPE html>
	<html>
	<head>
	  <title>bartNow</title>
	</head>
	<body>

	  <div>
	    <div>
          <h1>Hello, Bootstrap!</h1>
          <p>Don't worry, this is just the beginning! It get's better!</p>
       </div>
	  </div>

	</body>
	</html>
	````

1.  Save **index.html** ( **"File"** | **"Save All"** or **Ctrl-Shift-S**)

1. Then from the Visual Studio toolbar, run the site by pressing the green triangle button next to **"Internet Explorer"** (or press **F5**)  

	> **Note:** Starting the site this way begins a **"Debug"** session.  Visual Studio actually attaches itself to the browser (Internet Explorer in this case) and watches for errors in the site.  If there are any, Visual Studio will help you find out what broke, where and possibly even why! You don't have to use Visual Studio's debugger though. Popular browsers (Internet Explorer included) have **"Developer Tools"** embedded in them that include a debugger.     

	![01-060-DebugWebSite](images/01-060-debugwebsite.png?raw=true "Debug Web Site")

1. Internet Explorer should open, and you should see the rendered **index.html** page:

	![01-070-IndexHtml](images/01-070-indexhtml.png?raw=true "Index.html")

1. Yay!  We have a dev site running! You can close the browser when you are done viewing the web site, or back in Visual studio, you can stop the debug session by clicking on the stop botton on the toolbar:

	![01-080-StopDebug](images/01-080-stopdebug.png?raw=true "Stop Debugging")

---

<a name="BootstrapBootstrap" />
## Create a new web site and add Bootstrap to it ##

Ok, we have a site now, but it doesn't look to great.  We'll start improving that by adding bootstrap.  Normally, you would go download bootstrap from the http://getbootstrap.com site, but to make sure we are all working with the same version of Bootstrap, I've inluded the 3.2.0 distribution files in the **"/Assets"** folder for this session.  

1. Let's see where you would get bootstrap from if you needed to get a fresh copy.  Open http://getbootstrap.com in the browser, and click the **"Download Bootstrap"** button:

	![02-010-DownloadBootstrap](images/02-010-downloadbootstrap.png?raw=true "Download Bootstrap")

1. Normally, you would use the **""Download Bootstrap"** button to grab a .zip file with the latest Bootstrap distribution in it (feel free to download if you like!), but we'll use a version included with the lab files for the subsequent steps. 

	> **Note:** You can see that you can also download the bootstrap **"Source Less, JavaScript and font files**.  **Less** (http://lesscss.org/) is a popular CSS pre-processor.  The team at twitter decided to use Less when they created the complex CSS rules that makes bootstrap so powerful.  If you want to customize core bootstrap features, you may need to grab the source Less files, tweak them, and run them through your own Less compiler to generate the final css.  We won't get into that here though.  

	![02-020-DowloadBootstrap](images/02-020-dowloadbootstrap.png?raw=true "Download Bootstrap")

1. Ok, so that's where you would go to get it if you needed it.  We already have the 3.2.0 distribution files included in the lab files though, and to make sure we are working off the same files, we'll use those instead.  

1. In the Windows Explorer, Open the **"/Assets/bootstrap-3.2.0-dist"** folder from this sessions folder.  Select all the contents of the folder (inluding the **css**, **fonts**, and **js** folders) then right-click and select **"Copy"** from the pop-up menu. 

	![02-030-CopyFiles](images/02-030-copyfiles.png?raw=true "Copy Files")

1.  Then, back in Visual Studio, in the **"Solution Explorer"** window, **right-click** the **"BartNow"** project, and select **"Paste"** from the pop-up menu. 

	![02-040-PasteFiles](images/02-040-pastefiles.png?raw=true "Paste Files")

1. Expand the new folders and review their contents:

	![02-040-BootstrapFiles](images/02-040-bootstrapfiles.png?raw=true "Bootstrap Files")

1. The **"css"** folder contains two basic **"css"** files.  The **"bootstrap.css"** is the heart of bootstrap.  This has all the core styles used by bootstrap.  There is a minified (**"bootstrap.min.css"**) version that is smaller and therefore better for using in a production website to help minimize bandwidth and memory usage.  The **"bootstrap.map.css"** file is used by certain dev tools to help map css styles back to their original **Less** markup.

1. The **"css/bootstrap-theme.css"** file has some enhanced styling for the classes defined in bootstrap.css and is completely optional.  Just include it if you like the way it's enhancements look.  

1.  The **"fonts"** folder contains the [Glyphicons Halflings](http://getbootstrap.com/components/#glyphicons).  These have a lot of cool symbols you can use for the display purposes in your site:

	![02-050-Glyphicons](images/02-050-glyphicons.png?raw=true "Glyphicons")

1. And finally, the **"js"** folder contains the **bootstrap.js** (and minified version, **bootstrap.min.js**).  Bootstrap.js provides the programmatic implementation for a number of the Bootstrap "Components" and is required if you are using any of those components.  

1. Now that we have the files added to the web site, we need to reference them from **index.html**.  Open index.html, make the following changes:

	- Add the bootstrap.css file to the page by dragging it from the **Solution Explorer" into the **index.html** editor, just below the **&lt;title&gt;/&lt;title&gt;** element.  
	- Set the class of the first div to **"container"** - **"[Containers](http://getbootstrap.com/css/#overview-container)"** are required in bootstrap to wrap up the page's content, and to provide the foundation for the grid system.  There are two types, **"container"** which center's itself responsively on the page, and **"container-fluid"** which takes up the full width of the page.    
	- Set the class of the second div to **"jumbotron"** - **"[Jumbotron](http://getbootstrap.com/components/#jumbotron)"** is just a component. It creates a big panel at the top of the page that fills the width (with some padding) of it's parent.   

	<!-- mark:5,9,10 -->
	````HTML
	<!DOCTYPE html>
	<html>
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	</head>
	<body>

	  <div class="container">
		 <div class="jumbotron">
			<h1>Hello, Bootstrap!</h1>
			<p>Don't worry, this is just the beginning! It get's better!</p>
		 </div>
	  </div>

	</body>
	</html>
	````

1. This time, we'll run the page **WITHOUT** debugging (just so we can see how).  In Visual Studio, from the menu bar select **"DEBUG"** | **"Start Without Debugging"** (or press **Ctrl-F5**).  This time when the browser launches, Visual Studio won't attach to it, and the browser will be left to it's own devices if it encounters errors in the code.  We haven't written any code yet though, so it's not likely that we'd encounter any errors anyway!  

	![02-055-StartWithoutDebugging](images/02-055-startwithoutdebugging.png?raw=true "Start Without Debugging")

1. Anyhow, you should see that the site looks pretty different.  COOL!  

	![02-060-BoostrappedSite](images/02-060-boostrappedsite.png?raw=true "Bootstrapped Site!")

1. Ok, we don't have time to really dig into bootstrap in this quick session.  You'll want to go read the docs to find out all the cool stuff you can do, but let's at least see some fun stuff.  Modify the markup of the page by adding some stuff below the jumbotron div....

	````HTML
	<!-- Begin Just For Fun -->
   <div>
     <h2>Fun with buttons:</h2>
     <div>
       <button class="btn btn-default">A Default Button</button>
       <button class="btn btn-xs btn-danger">A Extra Small Danger Button!</button>
       <button class="btn btn-sm btn-info">A Small Info Button!</button>
       <button class="btn btn-lg btn-success">A Large Success Button!</button>
     </div>

     <h2>Fun with tables and images:</h2>
     <div>
       <img src="http://www.buildcamp.io/images/venue.jpg" /> Original Image<br/>
       <img src="http://www.buildcamp.io/images/venue.jpg" class="img-responsive" /> img-responsive<br />
       <img src="http://www.buildcamp.io/images/venue.jpg" class="img-circle" style="width: 120px; height: 80px; margin: 5px;"> img-circle<br />
       <img src="http://www.buildcamp.io/images/venue.jpg" class="img-rounded" style="width: 120px; height: 80px; margin: 5px;"> img-rounded<br />
       <img src="http://www.buildcamp.io/images/venue.jpg" class="img-thumbnail" style="width: 120px; height: 80px; margin: 5px;"> img-thumbnail<br />
     </div>
   </div>
   <!-- End Just For Fun-->
	````


1. Then view the page in the browser and notice the cool button and image styles:

	![02-070-BootstrapStyles](images/02-070-bootstrapstyles.png?raw=true "Bootstrap Styles")

1. When you are done playing with the new styles, remove the **Just For Fun** markup we added above.  The page's markup should look like this again: 

	````HTML
	<!DOCTYPE html>
	<html>
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	</head>
	<body>

	  <div class="container">
		 <div class="jumbotron">
			<h1>Hello, Bootstrap!</h1>
			<p>Don't worry, this is just the beginning! It get's better!</p>
		 </div>
	  </div>

	</body>
	</html>
	````

---

<a name="Breakpoints" />
## Learning about Bootstrap's Responsive Breakpoints ##

1. Open the site in the browser again, and stretch the browser window as wide and as tall as you can make it, without actually maximizing it.  Then grab the side of the window and begin dragging it to make the browser window narrower.  As you do, pay attention to what happens to the text in the jumbotron.  Notice that at certain "points" the jumbotron will re-size, and possibly even the text inside it will resize.

	![03-010-ResponsiveChanges](images/03-010-responsivechanges.png?raw=true "Responsive Changes")

	> **Note:** As you dragged the window, you were seeing "Responive Design" in action.  A "Reponsive" site dynamically changes it's visual appearance and functionality based on the size of the viewport that it is being displayed in.  That means we might have the same site look completely different on a mobile phone that it does on a large desktop monitor.   

1. Bootstrap 3 is built from the ground up as a **"mobile first"** responsive system.  Responsive layout systems use css **"[Media Query Breakpoints](http://getbootstrap.com/css/#grid-media-queries)"** to apply different styles when the viewport size changes.   With Bootstrap 3 it looks for the following screen sizes: 

	- Extra Small: Screen widths < 768px.
	- Small: Screen widths < 992px
	- Medium: Screen widths < 1220px
	- Large: Screen widths >= 1220px

1. When you were re-sizing the window before, the jumbotron's appearance changed whenever the width of the window crossed one of the screen width measurements associated with a breakpoint.  You can tell when you've crossed one of those boundaries because things change!  

1. Let's visualize it a little differently.  Add the **"/Assets/css"** and **"Assets/images"** folders to the web site project the same way we added the bootstrap files previously (and click **Yes** to confirm the existing css folder).  

	![03-015-NewFiles](images/03-015-newfiles.png?raw=true "New Files")

1. The **"/images"** folder contains a number of images we'll use in subsequent demos, but the one we care about is the **"BootstrapBreakpointsBackgroundRed.png":

	![03-020-Background](images/03-020-background.png?raw=true "Background")

1. There is also the **/css/showbootstrapbreakpoints.css"** file that uses that image as the background.

	````HTML
	body {
	  background: url(../images/BootstrapBreakpointsBackgroundRed.png) top left no-repeat; 
	}

	.conatainer, .jumbotron, .well {
	  background-color:rgba(238,238,238,0.8);
	}
	````

1. Add a reference to the **"showbootstrapbreakpoints.css** file to the top of **index.html**: 

	
    <!-- mark:5 -->
	````HTML
   <!-- ... -->
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/showbootstrapbreakpoints.css" rel="stylesheet" />
	</head>
   <!-- ... -->
	````


1. And then view the page in the browser.  Now, as you resize the window it's easy to tell when you are approaching a breakpoint and you can verify that when you cross one, that is when the view changes:

	![03-030-Breakpoints](images/03-030-breakpoints.png?raw=true "Breakpoints")

1. We will eventually want to remove the link to the showbootstrapbreakpoints.css file, but for now we'll leave it there because it will help us understand grids.  That's next!  

---
<a name="Grids" />
## Creating the Responsive Grid Layout##

Bootstrap has powerful grid system that let's you create CSS grid layouts that are not browser, or spec dependent.  With bootstrap grids, you first mark a **"div"** with the **"row"** class.  Each **row** can have up to **12** columns.  Within a **row**, you can nest multiple child **"div"** elements that have a **"col-&#42;-x"** class assigned to them. The **size** of all the columns in a row can't exceed 12.  If they do, the extra cols will wrap.   If you will be working with bootstrap grids, do yourself a favor, and read the [docs](http://getbootstrap.com/css/#grid) (http://getbootstrap.com/css/#grid):

1. We're going to take a shortcut.  Add the following markup below the closing tag of the jumbotron div:   

	````HTML
    <!-- Begin Grid Demo -->

    <!-- define a row of columns that will stay horizontal 
      even on Extra Small devices.  Each colum takes up 4
      units.  With three columns, the total units is 12-->
    <h2>3 Extra Small Cols</h2>
    <div class="row">
      <div class="col-xs-4"><div class="well">1</div></div>
      <div class="col-xs-4"><div class="well">2</div></div>
      <div class="col-xs-4"><div class="well">3</div></div>
    </div>

    <!-- these columns will stay horizontal on any Small or 
      larger devices, but will stack vertically on any 
      Extra Small  devices-->
    <h2>3 Small Cols</h2>
    <div class="row">
      <div class="col-sm-4"><div class="well">1</div></div>
      <div class="col-sm-4"><div class="well">2</div></div>
      <div class="col-sm-4"><div class="well">3</div></div>
    </div>

    <!-- these columns will stay horizontal on any Medium or
      larger devices, but will stack vertically on any 
      Small or smaller
    devices-->
    <h2>3 Medium Cols</h2>
    <div class="row">
      <div class="col-md-4"><div class="well">1</div></div>
      <div class="col-md-4"><div class="well">2</div></div>
      <div class="col-md-4"><div class="well">3</div></div>
    </div>

    <!-- these columns will be horizontal on any Large 
      device, but will stack vertically on anything else-->
    <h2>3 Large Cols</h2>
    <div class="row">
      <div class="col-lg-4"><div class="well">1</div></div>
      <div class="col-lg-4"><div class="well">2</div></div>
      <div class="col-lg-4"><div class="well">3</div></div>
    </div>

    <!-- End Grid Demo -->
	````

1. Then view the page in the browser, and notice that columns will be horizonta on screens equal to or larger than the specified responsive breakpoint, but will stack if the screen is smaller than the associated breakpoint:

	![04-010-GridDemo](images/04-010-griddemo.png?raw=true "GridDemo")

1. Let's get the grid setup for our **"bartNOW"** application.  We need two columns, one for the list of stations, and a second for a map.  When the screen is large enough, they should be horizontal, stations on the left, map on the right.  When the screen gets smaller though, they should re-position with the map on top and the stations below.  Replace the markup for **"index.html"** with:

	````HTML
	<!DOCTYPE html>
	<html>
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/showbootstrapbreakpoints.css" rel="stylesheet" />
	</head>
	<body>

	  <div id="mainContent" class="container">

		 <div class="row">

			<!-- Map Column-->
			<!-- This column should be 8 columns wide on medium 
			  or larger displays.  In addition when being seen 
			  on medium or larger displays it should be "pushed"
			  4 columns to the right.  This makes it show to the 
			  "right" of the stations column below even though 
			  we stated it first.  If the screen is XS or SM, the
			  column will expand to the entire 12 units and push the
			  stations column below it-->
			<div class="col-xs-12 col-md-8 col-md-push-4">
				 <div id="mapDiv" class="map">
					<div class="well"><h2>Show the Map Here</h2></div>
				 </div>
			</div>

			<!-- Stations Column -->
			<!-- This column should be 4 columns wide on medium
			  or larger displays.  In addition when being seen
			  on medium or larger displays it should be "pulled"
			  8 columns to the left.  This makes it show to the
			  "left" of the map column below even though
			  we stated it second.  If the screen is XS or SM, the
			  column will expand to the entire 12 units and display
			  below the map column-->
			<div class="col-xs-12 col-md-4 col-md-pull-8">
			  <div class="well"><h2>Show the Stations Here</h2></div>
			</div>

		 </div>

	  </div>

	</body>
	</html>
	````

1. View the page in the browser, and confirm that when the browser window is larger than the **"Medium"** responsive breakpoint minimum (992px), the columns are horizontal, stations on the left, and map on the right:

	![04-020-HorizontalColumns](images/04-020-horizontalcolumns.png?raw=true "Horizontal Columns")

1. But as soon as the window's width < 992px, the columns re-position to take up the entire width, and with the Map column stacked vertically above the stations column:

	![04-030StackedColumns](images/04-030stackedcolumns.png?raw=true "Stacked Columns")

---
<a name="Navigation" />
## Creating the Navigation Bar##

The last thing we'll do in this session is create our navigation bar.  Bootstrap has number of styles and components that can be used to implement navigtion, but we will be specifically using the **navbar** component.  The **navbar** component is also the first bootstrap feature we'll use that requires the **"bootstrap.js"** file to be referenced. Bootstrap.js also has a dependency on jQuery, so we'll need to add that as well.  

1. Add the **"/Assets/js"** folder to the project as described previously and confirm the existence of the current **"js"** folder.  This adds the **"jquery-1.11.1.js"** file to the **"js"** folder.  

1. Then add the following to the bottom of the **index.html** file just before the closing **&lt;/body&gt;** tag.:

	````HTML
     <!-- ... -->

	  <!-- Bootstrap core JavaScript
	  ================================================== -->
	  <!-- Placed at the end of the document so the pages load faster -->
	  <script src="js/jquery-1.11.1.js"></script>
	  <script src="js/bootstrap.js"></script>

	</body>
	</html>
	````

1. Next, up above the **mainContent** div, add the following to create the navbar:
  
	<!-- mark:4-21 -->
	````HTML
   <!-- ... -->
	<body>

	  <nav class="navbar navbar-default" role="navigation">
		 <div class="container">

			<div class="navbar-header">
			  <!-- Logo -->
			  <a class="navbar-brand" href="#"><img src="images/BartNowLogoWide_154x24.png" alt="" /></a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div id="navbar" >
			  <ul class="nav navbar-nav">
				 <li class="active"><a href="#/stations">Stations</a></li>
				 <li><a href="#/trains">Trains</a></li>
			  </ul>
			</div>

		 </div>
	  </nav>

	  <div id="mainContent" class="container">
     <!-- ... -->
	````

1. If you view the page in the browser, you should see a shiny new navbar along the top.  Cool.  

	![05-010-InitialNavBar](images/05-010-initialnavbar.png?raw=true "Initial Nav Bar")

1.  There are a few issues though.  The first is that the navbar will scroll with the page.  That means the user could scroll down to view stations that were off the bottom of the screen, and the navbar would disappear.  To fix that, we'll add the **"navbar-fixed-top"** class to pin the navbar to the top of the screen always.  

	````HTML
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	````

1. But now we have a new problem.  Because the navbar kind of "floats" on top of the content, it no longer pushes our **"mainContent"** container down and the columns get partially covered up by the navbar:

	![05-020-CoveredColumns](images/05-020-coveredcolumns.png?raw=true "Covered Columns")

1. To fix that problem, we'll use a litte CSS.  Add a new stylesheet to the **"css"** folder named, **"bartNow.css"**, and replace it's content with:

	````HTML
	#mainContent{
	  padding-top: 64px;
	}
	````

1. Then add a link to the style sheet at the top of **"index.html"**:

	<!-- mark:5 -->
	````HTML
   <!-- ... -->
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />  
	  <link href="css/showbootstrapbreakpoints.css" rel="stylesheet" />
	</head>
   <!-- ... -->
	````

1. Verify that the columns are no longer being covered by the navbar (at least unless you scroll down):

	![05-030-ColumnsFixed](images/05-030-columnsfixed.png?raw=true "ColumnsFixed")

1. The next problem is that if the window gets too narrow, the links wrap down:

	![05-040-LinksWrapped](images/05-040-linkswrapped.png?raw=true "Links Wrapped")

1. Really, we want to display those links differently on extra small devices. The common technique lately is to use a **"Hamburger Button"** in the top right corner of the nav bar on extra small devices.  The user can then click on the button to access to the links.  Bootstrap has built in support for this (as long as the bootstrap.js file is added).  

1. Replace the content of the entire **&lt;nav&gt;...&lt;/nav&gt;** element with:

	<!-- mark:9-15,20 -->
	````HTML
   <!-- ... -->
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
   <!-- ... -->
	````

1. Now, if you view the page on an extra small screen, the links in the nav bar disappear and the **"Hamburger Button"** appears:

	![05-050-HamburgerButton](images/05-050-hamburgerbutton.png?raw=true "Hamburger Button")

1. The user can then click on the button to see the links:

	![05-060-ExpandedLinks](images/05-060-expandedlinks.png?raw=true "Expanded Links")

1. Lastly, you can remove the **"showbootstrapbreakpoints.css"** (unless you like seeing the breakpoints), and clean up the comments, etc.  

	````HTML
	<!DOCTYPE html>
	<html>
	<head>
	  <title>bartNow</title>
	  <link href="css/bootstrap.css" rel="stylesheet" />
	  <link href="css/bartNow.css" rel="stylesheet" />  
	</head>
	<body>

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
			  <div class="well"><h2>Show the Stations Here.</h2></div>
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


---



 






