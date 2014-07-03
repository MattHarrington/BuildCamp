Creating a Cooking Website with Express, Styus and Jade
=============

#Objective

In this lab we will use Express to create [**Node Recipies**](http://noderecipies.azurewebsites.net) a full fledged website which can scale to mobile browsers as well as to the desktop. By the end of this lab you will know

	1. How to write html templates with jade
	2. Rendering an html view with an html template and a model

#Getting Started

To get started open up the [**StartProject/ExpressWebsite.sln**](StartProject/ExpressWebsite.sln) in Visual Studio 2013. You will notice a few things different about this project than before.

The solution contains a few more things than before:

![](ScreenShots/ss1.png)

###Jade Files

Jade is a language used to create HTML templates on the server. This allows us to write HTML much easier because it avoid having to write as many brackets and also allows for us to **bind** to bind a view to the data model (similar to what Angular.js does in the browser).

###Stylus Files

Stylus is the Jade for CSS. It allows us to write CSS much easier than the raw CSS language.

###App.js

You will notice that there is considerably more stuff in your **app.js** than in the last lab. Lets take a peek at the setup:

The first new thing that happens is we set the views section of the app to the current directory, __dirname/views folder:

	
	//mounts the 'views' directory so that it is reachable by the client
	app.set('views', path.join(__dirname, 'views'));

We then instruct that our view engine that we will be using is jade. Express can be used with a variety of view engines, but jade is the most popular choice:
	
	app.set('view engine', 'jade');

This will set the favicon of the website to the default express.js image:
	
	app.use(express.favicon());

We will set that we want to use stylus and that the stylus styling files are in the **public** folder:

	app.use(require('stylus').middleware(path.join(__dirname, 'public')));

Lastly, we set our **public** folder to be publicly accessible by the client. After this call, you can access anything in this folder by browsing to it (such as **/stylesheets/style.styl**

	app.use(express.static(path.join(__dirname, 'public')));

Run the application and you'll see the placeholder 'Express' title:

![](ScreenShots/ss2.png)