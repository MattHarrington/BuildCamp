Azure Mobile Services
=====================

Azure Mobile Services is a turnkey Backend as a Service (BaaS) which provides storage, authentication, push notifications, scheduled jobs, and more for your mobile and web apps.  It's written in Node.js and can be extended with any Node module.  It's commonly used for iOS, Android, and Windows Phone apps, but it can just as easily be used for web apps too.

In this session, you'll:

1. Create a Mobile Service
2. Download and run a sample ToDo application
4. Look at your data and scripts
5. Change entity to add new column
5. Turn on authentication
6. Publish the ToDo application to Azure Web Sites

## Create a Mobile Service ##

1. Log into the Azure portal
2. Select **Mobile Services** on the left hand side
3. Click the Plus sign in the lower left corner.  Create a new Mobile Service.
4. Make up a URL for your Mobile Service
5. Under the Database option, choose "Create a free 20MB SQL database".  The Region should be "West US" and the Backend should be "JavaScript".
6. Click the forward arrow button to proceed
7. In the Database section of the wizard, accept the default database name.
8. Under Server, choose "New SQL Database Server"
9. Create a server login name and password.  This creates a user account for your database.
10. The Region should be "West US".
11. Don't click "Configure advanced database settings"
12. Click the checkmark button to complete the wizard

Your Mobile Service, database server, and database will now be created.  It will take about a minute.

## Download and run the sample ToDo application ##

1. Click on your Mobile Service's name to see its details
2. In the Quickstart tab, which is the default tab with the cloud icon, select **HTML/JavaScript** as your platform.
3. Click **Create a new HTML app**
4. Follow steps 1 and 2 in the Get Started section to create a default table called ToDo and download a HTML/JS app.  Skip step 3 in the Get Started section for now.
5. Right-click the zip archive you downloaded, select **Properties**, and then click **Unblock**.  This marks the content as safe even though it was downloaded from the internet.
6. Extract the downloaded zip archive
7. In the **server** folder, double click **launch-windows**. If you get a security warning, choose to run the script anyhow.
8. Visit http://localhost:8000 in a browser.
9. Enter a few tasks

## Look at your data and scripts ##

1. Go back to the Azure portal
2. Click on the Data tab
3. Click on the ToDoItem table name
4. Look at your data
5. Click on the **Script** tab
6. Above `request.execute()`, insert this: `item.owner = "me";`.  Click **Save**.
7. Return to the ToDo app running in your browser.  Add a few more tasks.
8. In the portal, go back to the **Browse** tab and look at your data.  You'll now see a column called `urgency`.

## Change entity to add new column ##

1. Go to Visual Studio.  Select **File -> Open -> Web Site**.  Then select the folder which contains the ToDo app you downloaded.
2. In **Solution Explorer**, open `index.html` and `page.js`.
3. In `page.js`, look for the code which handles the insert.  It should be around line 38.  Change the insert function call to: `todoItemTable.insert({ text: itemText, complete: false, priority: 3 }).then(refreshTodoItems, handleError);`.  Save your changes.
4. In your browser, reload your ToDo app.
5. Add more tasks.
6. In the Azure portal, see how an additional column for *priority* was added.

## Turn on authentication ##

Content coming soon.

## Publish to Web Sites ##

Content coming soon.
