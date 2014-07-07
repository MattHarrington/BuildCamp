#Dev Environment Setup #
## (aka Node Tools for Visual Studio) ##

Welcome to Christine's tutorial on now to set up your development environment. I'm going to try to make this as easy and painless as possible, promise.

### Step 0: Install Visual Studio 2013###

Download Visual Studio 2013 Professional, Premium, or Ultimate from your Dreamspark account.  If you did not receive a Dreamspark account, contact the BuildCamp coordinator.  You must use one of those Visual Studio editions.  You can't use the Express Edition.  Visual Studio is a large download, so do this on a fast broadband connection.

### Step 1: Install Node Tools for Visual Studio (NTVS) ###

If you're running Visual Studio, close it.  Then download and install the Node Tools for Visual Studio from https://nodejstools.codeplex.com.  Make sure you get the version for Visual Studio 2013.

### Step 3: Verify Installation Worked ###

1. Open Visual Studio
2. Click on the **View** menu (top tool bar)
3. Click on **Other Windows** 
4. Click on **Node.js Interactive Window**

Now that the interactive window is open lets type some JavaScript. The interactive window supports everything you can do in code. Let's keep it simple, showing a variable and the location of the Node.js interpreter.

    > var  i = 100
    undefined
	> i
	100
	> process.title
	'C:\\Program Files\\nodejs\\node.exe'


### Step 4: Mission Accomplished: Stretch Break! ###
         	  	___
       		.-'`   `'-.
   		_,.'.===   ===.'.,_
  	   / /  .___. .___.  \ \
 	  / /   ( o ) ( o )   \ \                                            _
	 / /|    '-'___'-'    |\ \                                          (_)
	 | |`\_,.-'`   `"-.,_/'| |                                          /|
	 | |  \             /  | |                                         /\;
	 | |   \           /   | | _                              ___     /\/
	 | |    \   __    /\   | |' `\-.-.-.-.-.-.-.-.-.-.-.-.-./`   `"-,/\/
	 | |     \ (__)  /\ `-'| |    `\ \ \ \ \ \ \ \ \ \ \ \ \`\       \/
	 | |      \-...-/  `-,_| |      \`\ \ \ \ \ \ \ \ \ \ \ \ \       \
	 | |       '---'    /  | |       | | | | | | | | | | | | | |       |
	 | |               |   | |       | | | | | | | | | | | | | |       |
	 \_/               |   \_/ .--.  | | | | | | | | | | | | | | .--.  |
	                   |       |  |  | | | | | | | | | | | | | | |  | /
	                    \      |  | / / / / / / / / / / / / / /  |  |/
	                    |`-.___|  |/-'-'-'-'-'-'-'-'-'-'-'-'-'`--|  |
	             ,.-----'~~;   |  |                  (_(_(______)|  |
	            (_(_(_______)  |  |                        ,-----`~~~\
	                     ,-----`~~~\                      (_(_(_______)
	                    (_(_(_______)
	
 	  .:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:._.:*~*:.



# Hello Node #
## Introduction to Node in Visual Studio ##

Now that we have our development environment configured, let's launch into the code.


### Hello World ###
Open your Node.js Interactive Window, and try the following code

	> console.log("hello world")
	hello world
	undefined

### Hello World as a Function ###
Still in your Node.js Interactive Window, we're going to create a function which presents the hello world greeting.

    > function hi() {
    . 	console.log("hello world!")
    . }
    undefined

Now, we can call the function we just created

    > hi()
    hello world!
    undefined

### History & Editing Functions on the Fly ###
In the Interactive Window, press the up arrow twice, and you should get this

    > function hi() {
    . 	console.log("hello world!")
    . }

We can go in and edit it, and add a more witty remark

    > function hi() {
    . 	console.log("That wasn’t flying. That was falling with style.")
    . }
    undefined

and call it again. This makes it easy to make quick changes.
    
    > hi()
    That wasn’t flying. That was falling with style.
    undefined

###Now You're Set to go to Infinity and Beyond with NTVS!###

	            _._                           _._
           	   ||||                           ||||
           	   ||||_           ___           _||||
           	   |  ||        .-'___`-.        ||  |
	       	   \   /      .' .'_ _'. '.      \   /
	           /~~|       | (| b d |) |       |~~\
	          /'  |       |  |  '  |  |       |  `\
	,        /__.-:      ,|  | `-' |  |,      :-.__\       ,
	|'-------(    \-''""/.|  /\___/\  |.\""''-/    )------'|
	|         \_.-'\   /   '-._____.-'   \   /'-._/        |
	|.---------\   /'._| _    .---. ===  |_.'\   /--------.|
	'           \ /  | |\_\ _ \=v=/  _   | |  \ /          '
	             `.  | | \_\_\ ~~~  (_)  | |  .'
	               `'"'|`'--.__.^.__.--'`|'"'`
	                   \                 /
	                    `,..---'"'---..,'
	                      :--..___..--:    
	                       \         /
	                       |`.     .'|     
	                       |  :___:  |
	                       |   | |   |
	                       |   | |   |
	                       |.-.| |.-.|
	                       |`-'| |`-'|
	                       |   | |   |
	                      /    | |    \
	                     |_____| |_____|
	                     ':---:-'-:---:'
	                     /    |   |    \
	                    /.---.|   |.---.\
	                    `.____;   :____.'

# Text Editing Tools #
Sometimes Visual Studio has too much power, and you just want to do some simple text editing.
Download and install one of the following

- [Notepad++](http://notepad-plus-plus.org/download/v6.6.7.html)
- [Sublime](http://www.sublimetext.com/2)

#PowerShell & Command Line Interface (CLI) Tools#
In preparation for Session 3, we're going to dip our toes into the waters of the Azure command line interface.

Open PowerShell and then run this command:

	npm install azure-cli -g

Next, we're going to head to our Azure Management Portal

	azure account download

Login to your account, and save the `.publishsettings` file. Remember where you save the file.

Now we're going to import that file into the Azure :

	azure account import [your path here]

Mine looked like:

	azure account import "C:\Users\chmathen\Downloads\Visual Sudio Ultimate with MSDN 7-6-2014 credentials.publishsettings"

Now GO AND DELETE THAT FILE. It's a **SECURITY RISK** because it contains your account credentials.

That's it for that part of the rodeo.
	
	           .-'"""'-.
	      ,____|_______|____,
	       '._____________.'  REACH
	           |.-- --.|    FOR THE SKY!
	           |(o) (o)|
	          (|       |)
	           |   U   |
	 __        | .___. |    YOU'RE MY
	/|||       |       |     FAVORITE
	||||       :       :      DEPUTY!
	|  |/)      `.___.'
	 \  /       __) (__
	  \/\      /\ \ / /\
	   \ \    /\ \ ^ / /\    THERE'S A
	    \ \  / |  |0_/\_ \    SNAKE IN
	     \ \/ /|  | \  /\ \    MY BOOT!
	      \  / |  |0//\\ \ \
	       \/  | /   \ |  \ \
	           |/ .-. \|  / /
	        .-'|-( ~ )-| / /   HI!
	        \  |--`-'--|/ /   MY NAME'S WOODY!
	         \ |       | /
	          \|   |   |/
	           |   |   |
	           |   |   |     HOWDY PARDNER!
	           |   |   |
	           |   |   |
	           |   |   |
	           |___|___|     YEEEHAH COWBOY!
	          `|---|---|'
	          *|   |   |*
	           |_._|_._|
	          /'  /|\  '\    SOMEONE POISONED
	         /   /^ ^\   \    THE WATERHOLE!
	        /__.'     `.__\
