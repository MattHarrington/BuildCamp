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

If you ever want to add a Node module to this code, pull your mobile services down via Git, then add the module, then push it back to Azure with Git.

## Diversion: create a REST API in 10 seconds ##

1. Click the **API** tab
2. Click **Create**
3. Give your API a name.  This should be lowercase and one word.  For example, if your API name is *hokey-pokey*, your API endpoint will be *https://contoso.mobileservices.net/api/hokey-pokey*.
4. Change the **Get Permission** to *Everyone*
5. In Chrome's Advanced REST Client, which you used in earlier sessions, connect to your API endpoint.

## Change entity to add new column ##

1. Go to Visual Studio.  Select **File -> Open -> Web Site**.  Then select the folder which contains the ToDo app you downloaded.
2. In **Solution Explorer**, open `index.html` and `page.js`.
3. In `page.js`, look for the code which handles the insert.  It should be around line 38.  Change the insert function call to: `todoItemTable.insert({ text: itemText, complete: false, priority: 3 }).then(refreshTodoItems, handleError);`.  Save your changes.
4. In your browser, reload your ToDo app.
5. Add more tasks.
6. In the Azure portal, see how an additional column for *priority* was added.


## Publish to Web Sites ##

1. In Visual Studio, make sure you have the latest Azure SDK installed.  Go to **Tools -> Extensions and Updates** and then go to the **Updates** section.  If you see an Azure update, install it.
2. Right-click on your project and select **Publish**
3. In **Select a publish target**, choose **Windows Azure Web Sites**
4. Sign in with your Azure account, if necessary
5. Choose a URL for your site name
6. In **Region**, select *West US*
7. Leave the Database options untouched
8. Click **Create**
9. On the next screen, click **Publish**.  Your code will be published to Azure and the site will display, but the ToDo items won't be updated.  This is a security precaution.  You need to tell your Mobile Service to allow connections from your new site.  By default, Mobile Services only allow connections from *localhost* and mobile phone apps.
10. In the Azure portal, go to your mobile service's details section.  Click **Configure**.
11. In the **Cross-Origin Resource Sharing (CORS)** section, add your Azure Web Site name.  For example, *my-todo-app.azurewebsites.net*.  Don't add **http://** in front.  Just put the hostname.
12. In your browser, reload your new website.  You'll now see the ToDo items you previously entered.


## Turn on authentication ##

Adding authentication to your web and mobile apps is a lot of work.  Each identity provider does things a little differently.  Luckily, Azure Mobile Services makes this much easier.  It supports authenticating with Twitter, Facebook, Google, and Microsoft accounts.  It also supports authenticating with Active Directory accounts, a very popular identity system used by companies.  For this lab, we'll authenticate with Twitter.



1. You first need to register your app with Facebook.  Follow these instructions: http://azure.microsoft.com/en-us/documentation/articles/mobile-services-how-to-register-facebook-authentication/.  In step 8, ignore the note which pertains to using the .NET backend.  You use the JavaScript backend, so your URL will end in */login/facebook*, not *signin-facebook*.
2.  Go to your mobile service's **Identity** tab.  Enter the App ID and App Secret from the above step into the Facebook section.  Click **Save**.
3.  Go to your mobile service's **Data -> Table -> Permissions** section
4.  Change the permission for all 4 operations to *Only Authenticated Users*.  Click **Save**.
5.  Visit your web site in a browser.  Verify that you cannot see previously entered ToDo items or add new ones.
6.  In Visual Studio, open **index.html**
7.  Under the H1 element, add this:
```html
<div id="logged-in">
    You are logged in as <span id="login-name"></span>.
    <button id="log-out">Log out</button>
</div>
<div id="logged-out">
    You are not logged in.
    <button>Log in</button>
</div>
```

8.  Open **app.js**
9.  At the bottom of that file, comment out the call to `refreshToDoItems()` by adding `//` in front of it.
10.  Add this code below the line you just commented out:
```javascript
function refreshAuthDisplay() {
    var isLoggedIn = client.currentUser !== null;
    $("#logged-in").toggle(isLoggedIn);
    $("#logged-out").toggle(!isLoggedIn);

    if (isLoggedIn) {
        $("#login-name").text(client.currentUser.userId);
        refreshTodoItems();
    }
}

function logIn() {
    client.login("facebook").then(refreshAuthDisplay, function(error){
        alert(error);
    });
}

function logOut() {
    client.logout();
    refreshAuthDisplay();
    $('#summary').html('<strong>You must login to access data.</strong>');
}

// On page init, fetch the data and set up event handlers
$(function () {
    refreshAuthDisplay();
    $('#summary').html('<strong>You must login to access data.</strong>');          
    $("#logged-out button").click(logIn);
    $("#logged-in button").click(logOut);
});
```
11.  Save your files and republish your app

