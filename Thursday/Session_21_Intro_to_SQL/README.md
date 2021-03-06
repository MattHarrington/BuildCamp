﻿<a name="IntroToSql" />
#Intro to SQL Databases#

---

Links:

- http://msdn.microsoft.com/en-us/library/azure/jj554212.aspx 

- http://blogs.msdn.com/b/azuremobile/archive/2014/05/12/connecting-to-an-external-database-with-node-js-backend-in-azure-mobile-services.aspx 

- http://stackoverflow.com/questions/18426000/how-to-insert-table-valued-parameters-into-sql-azure-from-node

- http://weblogs.asp.net/shijuvarghese/crud-demo-in-node-js-with-windows-azure-sql-database

## Overview ##

All applications work with data in some form or fashion, and in all but the most trivial applications that data usually needs to be kept around (_stored, saved, persisted_) even when the application is not running.  There are a number of options available to you as a developer.  You could:

- Define your own file format, or use a popular file format, and save data to files.  This is a common solution for word processing apps, etc. 
- Store your data in a **"NoSQL"** database.  There are a bunch of these on the market today (_MongoDB, Cassandra, CouchDB, etc._). **"NoSQL"** databases typically have informal data structures that make it easy for developers to store whatever the like, at a hight volumne, but with certain risks around data integrity.  
- Store your data in a Relational Database like Microsoft SQL Server, Oracle, MySQL, etc. 

In this session we'll cover a few basics of relational databases.  and as well as learn a little about the language we can use to query them.  

---

<a name="CreateDB"/>
## Create an Azure SQL Database ##
  
Traditionally, to work with a relational database, you would need a computer (physical or virtual) to install it on, and a copy of the installation media.  

With Azure though we offer a "Database as a Service" called **"SQL Database"**.  You can create a fully functional relational database in mere minutes with Azure SQL Database! 

1. Open the Azure Management Portal (https://manage.windowsazure.com) and sign in with your account.  Along the left, click the **"SQL Database"** node to review the dataabases you already have (if any).   

	![01-010-SQLDatabases](images/01-010-sqldatabases.png?raw=true "SQL Databases")

1. If you followed along in the **"Azure Mobile Services"** session, you will see that you already have a database named after the mobile service you created previously...

	![01-020-AzureMobileDb](images/01-020-azuremobiledb.png?raw=true "Azure Mobile Services SQL Database")

1. Let's first show you how easy it is to create a database of your own though. Along the bottom of the Azure Management Portal, click the **"+ NEW"** button, then select  **"DATA SERVICES"** | **"SQL DATABASE"** | **"QUICK CREATE"**.  Complete the information as follows:

	- **DATABASE NAME**: Enter a name for your DB.  Keep it simple and **NO SPACES**
	- **SERVER**: Choose New SQL Database Server
	- **REGION**: Choose the region closest to you
	- **LOGIN NAME**: Enter the user name you want to use for the administrator of the new server.  Keep it simple and **NOSPACES**!
	- **CONFIRM PASSWORD**: Create a good complex password for your SQL Server admin account, and enter it twice.  ***Make sure to use a Login Name and Password you can remember.*** 

	![01-030-QuickCreateDB](images/01-030-quickcreatedb.png?raw=true "Quick Create SQL Database")

1. Within a few seconds to a couple of minutes, your database should be created. **Awesome!**   

	**![01-040-CreatedDB](images/01-040-createddb.png?raw=true "Created DB")**

	> **Note:** Notice also in the screenshot above, that the new DB is on a **"Server"**.  You didn't get to pick the server name.  They are always just random sequences of letters and numbers.  You did however specify the administrator user name and password for the server when you created it.  

---

<a name="ConnectToDB"/>
## Connect to  an Azure SQL Database ##

1. That was just to show you how easy it is to create a database, but since we already have a database with some data in it from the Azure Mobile Services session, let's connect to that one instead.  In the list of databases, click on the name of the SQL Database that was associated with your Azure Mobile Service.	

![02-010-OpenAzureMobileDB](images/02-010-openazuremobiledb.png?raw=true "Open Azure Mobile Services SQL Database")

1. On the **"Quick Start"** page (the cloud with the lightning bolt icon along the top takes you there if needed), you should see the name of the SQL Server that the database was created on.  It will be in the format of **&lt;SERVERNAME&gt;.database.windows.net**.  Select the server name (not the **",1433"**) and copy it to the clipboard:

	![02-020-ServerName](images/02-020-servername.png?raw=true "Server Name")

1. If we want client applications from OUTSIDE the Azure Datacenter to connect to the database, then we need to open a firewall rule on the Azure SQL Server to allow connections from the outside.  To do so, first click on the **"DASHBOARD"** link along the top, then click the **"Manage Allowed IP Addresses"** link:

	![02-022-ManageIPs](images/02-022-manageips.png?raw=true "Manage Allowed IP Addresses")

1. On the server's **"CONFIGURE"** page, first, click the **"ADD TO THE ALLOWED IP ADDRESSES"** to create a new firewall rule for the IP address you are currently accessing the portal as.  Then, create another firewall rule that lets ANY ip address connect (<span style="color: red">**DON'T DO THIS ON A PRODUCTION SERVER, WE ARE DOING IT HERE JUST TO ENSURE YOU DON'T HAVE CONNECTIVITY ISSUES IF YOUR CLIENT IP ADDRESS CHANGES**</span>).  Finally, click **SAVE** to save the new firewall rules.  
	
	- **Rule Name:** Everyone
	- **Start IP Address:** 0.0.0.0
	- **End IP Address:** 255.255.255.255

	![02-024-FirewallRules](images/02-024-firewallrules.png?raw=true "Firewall Rules")

1. Lastly if you don't remember the SQL credentials you specified when you made the Azure Mobile service, you can find the login name, and reset the password from the server's DASHBOARD page:  

	![02-026-ResetPassword](images/02-026-resetpassword.png?raw=true "Reset Admin Credentials")

1. Ok, so we know the server's address, we've opened up the firewall rules to allow the connection, and we've ensured we know the credentials.  Now its time to connect.  There are a bunch of ways you could connect to your server:
	- You can connect in code from a variety of platforms and languages
	- You could use the web based management tools provided by Azure
	- You could install SQL Server Management Studio 
	- You can connect from Visual Studio.  We'll do that.  

1. Open **Visual Studio 2013** and from the menu bar select **"VIEW"** | **"SQL Server Object Explorer"**:

	> **Note:** If you don't see the **SQL Server Object Explorer** it may instead by under **"VIEWS"** | **"Other Windows"** | **"SQL Server Object Explorer"**.  You can also try the keyboard shortcut **Ctrl+\,Ctrl+S** to open the window.  Lastly, make sure that in **"TOOLS"** | **"Extensions and Updates..."* | **"Updates"** | **"Product Updates"** and look for any updates for the **SQL Server Data Tools**.

	![02-030-SQLObjectExplorer](images/02-030-sqlobjectexplorer.png?raw=true "SQL Server Object Explorer")


1. In the **SQL Server Object Explorer** window, right click the **SQL Server** node, and select **Add SQL Server...** from the pop-up menu:

	![02-040-AddServer](images/02-040-addserver.png?raw=true "AddServer")

1. In the **Connect to Server** window, paste the server name you copied to the clipboard into the **Server name:"** text box.  then, for **Authentication** select **SQL Server Authentication** and then enter the administrative user name and password you used when you created your Azure Mobile Service previously.  
	![02-050-ConnectToServer](images/02-050-connecttoserver.png?raw=true "Connect To Server")

1. Once you are connected, you should be able to drill down into the database and see the tables that were created as part of the Azure Mobile Services session:

	![02-060-AzureMobileTables](images/02-060-azuremobiletables.png?raw=true "Azure Mobile Services Tables")

---

<a name="Querying" />
## Querying the Database ##


### What does this mean? ###

![WhatDoesThisMean](images/WhatDoesThisMean.jpg?raw=true)

1. Well, open up the **"Users SQL Queries.sql" file in Visual Studio 2013 and find out. From the Visual Studio 2013 menu bar, select **"FILE"** | **"Open"** | **"File..."**, browser to the folder for this session and open the **"Users SQL Queries.sql"** file:

	![03-010-OpenFile](images/03-010-openfile.png?raw=true "Open File")

1. Click the **"Connect"** button along the top of the query window:

	![03-020-Connect](images/03-020-connect.png?raw=true "Connect")
	
1. And then connect to your Azure SQL Database the with the appropriate credentials:

	![03-030-ConnectionDialog](images/03-030-connectiondialog.png?raw=true "Connection Dialog")

1. Now you can read the comments and follow through the file step by step.  In Visual Studio you can select JUST the statements that you want to run each time, then when you execute, only the highlighted lines will be sent to the server.  As you work through the steps select the statements between "GO" statements and execute them in order.  Read the comments as you go, and you should be able to work through it.  The **"CLEAN UP SCRIPT"** at the top deletes the tables so you can create them again and work back through the steps as many times as you like:

![03-040-ScriptExecution](images/03-040-scriptexecution.png?raw=true "Script Execution")