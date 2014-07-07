Session 3: Introduction to Cloud Computing
==========================================

The term *cloud computing* is used a lot, and it can mean different things to different people.  Let's spend some time defining it.

## Consumer vs. Developer ##

First off, let's divide the landscape between consumers and developers.  There are lots of consumer cloud offerings out there.  For file storage, there's OneDrive and Dropbox.  For business documents there's Office365 and Google Docs.  For photos, there's Flickr and 500px.  For customer relationship management (CRM), there's Salesforce and Microsoft Dynamics.  You get the picture.  These are generally end user or consumer cloud products, and not really what we developers are talking about when we speak of the cloud.  They're typically called *SaaS*, or Software as a Service.

To developers, cloud computing means running your programs on a bunch of computers which you rent, perhaps by the minute. When demand is low, you can run your software on one or two servers to keep costs low.  When demand spikes, you can run it on more and more servers.  You typically don't know exactly where the servers are located, and it doesn't matter.

## What is a server? ##

Let's back up a second and talk about what we mean by *server*.  Computing devices are broadly divided into two types: *clients* and *servers*.  Clients can be anything from web browsers to mobile apps to an old-fashioned text-based app which airline agents use to check you into a flight.  Servers include things like web servers, database servers, caching servers, chat servers, etc.  A PC running a web browser is a client.  A server listens for requests from clients and sends data back to them.  

## What is a virtual machine (VM)? ##

In the context of cloud computing, a virtual machine (VM) is simply one operating system running on top of another.  You can run Windows on a Mac using a product like Parallels, and each instance of Windows is a virtual machine.  The host OS and the VM OS can be the same.  For example, you can run a Windows VM on top of Windows.

## How are cloud computing platforms built? ##

Remember that to us, cloud computing implies renting servers by the minute and increasing or decreasing your number of servers based on demand.  This is typically done with virtual machines.  You create a virtual machine image yourself, or the platform creates one for you, and then it's duplicated across as many servers as you like. Linux-based cloud platforms such as Amazon Web Services use software called Xen to manage virtual machines.  A Windows-based cloud platform like Azure uses management software called System Center.  As a developer, you don't need to know things at this level of detail unless you're really curious. 

Want to peek inside a datacenter?  Check out this YouTube video: http://www.youtube.com/watch?v=JJ44hEr5DFE.

## IaaS vs. PaaS ##

In addition to SaaS, previously defined, the cloud landscape can be divided into *IaaS* and *PaaS* offerings.

IaaS stands for Infrastructure as a Service.  With IaaS, instead of running servers in your own datacenter, you pay a company to run them for you on their servers.  It comes down to creating virtual machine images and running them on someone's cloud platform.  The advantage of IaaS is that if you have an existing software system in your own datacenter, you can create virtual machine images of them and upload them to the cloud.  Things continue to run pretty much as they did before.  The disadvantage to IaaS is that you still need to manage your own systems.  You need to be aware of security patches, and install them.  You need to set up load balancers and manage incoming traffic.  You need to pay attention to your overall load and scale the number of virtual machines accordingly.  Examples of IaaS include Amazon's EC2 and Azure's Virtual Machines.

PaaS stands for Platform as a Service.  With PaaS, you write your application to use services provided by the platform without needing to manage the individual virtual machines themselves. It's a layer of abstraction on top of the platform.  Example services you can use are storage, databases, and compute instances.  The advantage of PaaS is that it gets you out of the business of planning and maintaining your own infrastructure. You can run large systems with very few people.  The disadvantage of PaaS is that you need to write your software from scratch to take advantage of it.  It's tricky adapting a legacy application to use PaaS.  Examples of PaaS include Heroku and Azure Web Sites.

BuildCamp uses PaaS.  For new applications, the benefits of PaaS make it the clear choice.

## Why Azure? ##

Why are we using Azure in BuildCamp?  Besides the fact that BuildCamp is sponsored by Microsoft, here are some other reasons:

1. Microsoft has a lot of experience with PaaS.  Azure launched as a PaaS product years before major competitors who added it later.
2. Azure has a large global footprint, with 12 datacenters as of July 2014.
3. Node.js runs very well on Azure.  In fact, an important component called Azure Mobile Services is written in Node.
4. Visual Studio is the best tool for Node development.  Tight integration between Visual Studio and Azure makes it a natural fit.
5. Azure is the only major cloud platform which operates in mainland China, giving you access to a huge number of customers.
6. Azure's virtual machine format, VHD, is an open standard.  You can create your own VHDs and copy them back and forth between your own systems and Azure.  You can't do this with Amazon since their AMI format is proprietary.
7. Startups qualify for $150/month in Azure credits for 3 years through the [BizSpark program](http://www.bizspark.com).


## Deploy your first site to Azure ##

In Session 6, you'll learn how to deploy to Azure from Visual Studio.  However, in this session we'll use the portal and drop down to the command line and use the Azure CLI utility you installed in Session 2. This is written in Node and runs on Windows, OSX, or Linux.

1. Install GitHub for Windows as outlined in [Part 0 of Session 4](https://github.com/mattharrington/BuildCamp/tree/master/Monday/Session_04_Git#part-0-set-up), the Git session.
2. Log onto the Azure portal
2. Click the Plus sign in the lower left corner
3. Select "Compute -> Web Site -> From Gallery"
4. Sroll down and select "Node JS Empty Site"
5. Choose a URL for your site
6. Click the icon to finish the wizard
7. Navigate to your site's URL.  It should say "Hello, world!"
8. Go back to the Azure portal.  Click on your site's name, not URL, to navigate to the site configuration page.
9. Click on the Dashboard tab
10. Click "Set Up Deployment Credentials"
11. Create a username and password. The username must be unique across all of Azure.
12. Click "Set up deployment from source control"
13. Select "Local Git repository"
14. Copy the URL to your Git repo
15. Open a Git Shell
16. Type `git clone` followed by the URL of your repo.  This pulls down the "Hello, world!" code.
17. Edit `server.js` and change the message from "Hello, world!" to "Hello, Azure!".  Use Notepad++ or Sublime to edit the file.
18. From the Git Shell, type `git add server.js`.
19. Commit your change with `git commit -m "changed message"`
20. Push your change to Azure with `git push`
21. Revisit the URL of your site to see your changes

Let's use the Azure command line utility.  Open a PowerShell window, and then:

1. Type `azure --version` to make sure the command is installed correctly.  If you ever need to update it, run `npm update azure-cli -g`.
2. Type `azure account list` to see your subscription.  If you had more than one subscription, they would be listed here.
3. Type `azure site list` to see the site you created from the portal
4. Type `azure help site` to see what else you can do to your site from the command line.

## What next? ##

Congratulations!  You've created your first site in Azure, downloaded the source, made a change, and pushed it back up.  You can do this from Windows, OSX, or Linux since this only required a browser, Git, and the Azure command line tools.  Later today you'll see how much easier the Node Tools for Visual Studio makes things.

Want to learn more?  Visit these links:

- [Build and deploy a Node.js web site to Azure](http://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)
- [Install and Configure the Azure Cross-Platform Command-Line Interface](http://azure.microsoft.com/en-us/documentation/articles/xplat-cli/)
- [GitHub source and details documentation for the Azure CLI utility](https://github.com/Azure/azure-sdk-tools-xplat)
