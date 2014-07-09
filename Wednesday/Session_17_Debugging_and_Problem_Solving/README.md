# Debugging in Visual Studio #

Step 0: Open a node.js project. I'm going to  use the one we did we Steven on Monday, which [you can find here](https://github.com/mattharrington/BuildCamp/blob/master/Monday/Session_06_Intro_to_Node/MyFirstNodeApp.sln).

## Basic Debugging##
When debugging Node.js applications with NTVS, principles common to all languages in Visual Studio apply.

You've probably been debugging and not even realizing it,  but now it's time to learn the terminology. 


#### Launching the Node.js Debugger ####
Debugging a Node.js project is as straightforward as opening (or creating) the project in Visual Studio, setting desired breakpoints, and choosing 'Debug\Start Debugging' (F5). By default this will launch Node.exe under the debugger for your project's startup file, and launch a browser to your Node.js application's URL.

#### Breakpoints ####
Breakpoints are lines of code where the debugger should stop executing and allow you to investigate the program state. They can be set by clicking in the margin of the code editor, or by right-clicking on a line of code and selecting Breakpoint, Insert Breakpoint.

We're going to set one at the line which says:

	res.end('The location of ' + contentObject.description + ' is located at ' + '(' + contentObject.properties.longitude + ', ' + contentObject.properties.latitude + ')');

**Now when we go to run the code, it will hit the breakpoint.**

#### Stepping ####
Once you've broken into the debugger, you can step through your code one statement at a time. The step commands include Step Into, Step Over, and Step Out.

Step Into will execute the next statement and stop. If the next statement is a call to a function, the debugger will stop at the first line of the function being called. Check the Debug, Step Into menu to find the keyboard shortcut to use to step (typically F11).

**Run the code and when you hit the breakpoint, see where it goes when you Step into it. Keep pressing it and watching until the code completes**

Step Over will execute the next statement, but if it is a call to a function then the entire function will be executed. This allows you to easily skip functions when you are not interested in debugging them. Check the Debug, Step Over menu to find the keyboard shortcut (typically F10).

**Rerun the code and when you hit the breakpoint, see where it when you Step Over it. Keep pressing it and watching until the code completes**

Step Out will execute until the end of the current function. It is useful when there is nothing else interesting in the current function. Check the Debug, Step Out menu to find the keyboard shortcut (typically Shift+F11).

**Run the code and when you hit the breakpoint, Step into it. Then step out of something.**

If you want to continue running, you may use the Continue command (typically F5). Your program will not break until the next breakpoint. Note that when you Step Over or Step Out, if the running code hits a breakpoint it will break again, even if it has not reached the end of the function.




#### Hover Tips ####
Hovering over a valid identifier or selected expression in a Node.js code editor while broken in the Node.js Debugger will provide a popup with results from evaluating the identifier or expression. Like the Locals and Watch window, the evaluation results may be expanded to drill into object and array members.

If we run our code and stop at the breakpoint at this line:

    res.end('The location of ' + contentObject.description + ' is located at ' + '(' + contentObject.properties.longitude + ', ' + contentObject.properties.latitude + ')');

And then hover over 

	contentObject.descrption

We can see what data the contentObject has at that point in time.
**NOW: Delete your breakpoint**

#### Breaking on Exceptions ####


By default, the Node.js debugger breaks on exception. If an exception is hit while running under the debugger, the debugger will break and then pop-up a dialog containing the exception details.

We can experience this by adding the code:

	throw error;

When broken under the debugger, you may use the Locals, Watch, Immediate and Callstack windows to inspect the running state of a debugged app.

The **Locals** window provides a view of the current stack frame's parameters and local variables. It also allows expanding objects and arrays to see their members by clicking the '>' expansion indicator

The **Watch** window provides a view of user defined expressions. Other than only including user added items, it behaves much like the Locals window.

In the **Immediate** window entered expressions are evaluated against the current stack frame and results are printed.

The **Callstack** window provides a view of the callstack for the "instruction pointer" at which the debugger is broken. You may select the stack frame used as context in the other state inspection windows (Locals, Watch and Immediate) by double clicking on a desired stack frame's name.

## NPM Modules  ##

Npm is Node's package manager and allows you to install packages for use in your Node apps. You can install packages from the public npm repository, as well as packages you've authored yourself.

###  Managing installed packages with npm###

####The npm Package Management dialog####

To use npm in your Node Tools for Visual Studio project, right-click on the npm node in Solution Explorer, then click Manage npm Modules.

This will bring up the **npm Package Management** dialog. In here you can manage local packages, which are available only to your application, as well as global packages, which are available to all Node applications. Additionally, you can quickly and easily search and install packages from the public npm repository which, as of this writing, contains over 48,000 packages!

The npm **Package Management** dialog is divided into two main areas. On the left you can see packages that are installed, with separate tabs for local and global packages, whilst on the right you can see tabs that allow you to install packages.

Your biggest question will be:
#### How do I install missing modules? ####
To install all missing modules:

1. Right-click on the npm node in Solution Explorer. 
2. Click on Install Missing npm Modules on the context menu.

All missing modules will be installed.

To install a single missing module:

1. Right-click on the module's node in Solution Explorer.
2. Click on Install Missing npm Module on the context menu.

The missing module will be installed.

In both cases npm's output, including any errors, will be written to the Output window. The status bar will show whether or not npm ran successfully.
## Okay, I found this error, what do I do? ##

####[Bing it!](http://bing.com)####

####[StackOverflow](http://stackoverflow.com/questions/5062614/how-to-decide-when-to-use-node-js)####

####[Visual Studio Help](http://stackoverflow.com/questions/5062614/how-to-decide-when-to-use-node-js)####


## Okay Christine, I understand... now what? ##

On the GitHub, I've got some broken code, try to get it running!

