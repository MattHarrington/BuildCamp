#Dev Environment Setup #
## (aka Node Tools for Visual Studio) ##

Welcome to Christine's tutorial on now to set up your development environment. I'm going to try to make this as easy and painless as possible, promise.

### Step 0: Install Visual Studio 2013###
[Here's a link to download VS](http://www.visualstudio.com/en-us/downloads) if you haven't already.     (Warning: It takes a looong time to install)

### Step 1: Install Node Tools for Visual Studio (NTVS) ###
Download and install from here: [http://bit.ly/NTVSDownload](http://bit.ly/NTVSDownload) 

Note: Make sure Visual Studio is CLOSED before installing NTVS

### Step 3: Verify Installation Worked ###
1. Open Visual Studio
2. Click on Views (top tool bar)
3. Click on Other Windows 
4. Click on Node.js Ineractive Window

Now that the interactive window is open lets type some JavaScript. The interactive window supports everything you can do in code. Let's keep it simple, showing a variable and the location of the node.js interpreter.

    > var  i =100
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


#.#
#.#
#.#



# Hello Node #
## Introduction to Node in Visual Studio ##

Now that we have our development environment configured, let's launch into the code


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

###Now You're Set to go to Infinity and Beyond!###

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