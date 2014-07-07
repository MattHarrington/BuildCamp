Session 3: Introduction to Cloud Computing
==========================================

The term *cloud computing* is used a lot, and it can mean different things to different people, so let's spend some time defining the landscape.

## Consumer vs. Developer ##

First off, let's divide the landscape between consumers and developers.  There are lots of consumer cloud offerings out there.  For file storage, there are OneDrive and Dropbox.  For business documents there are Office365 and Google Docs.  For photos, there's Flickr and 500px.  For customer relationship management (CRM), there's Salesforce and Microsoft Dynamics.  You get the picture.  All of these are consumer cloud products, and not really what we developers are talking about when we speak of the cloud.  They're typically called SaaS: Software as a Service.

To developers, cloud computing means running your programs on a bunch of computers which you rent, perhaps by the minute. When demand is low, you can run your software on one or two servers.  When demand spikes, you can run it on more and more servers.  You typically don't know exactly where the servers are located, and it doesn't matter.

## What is a server? ##

Let's back up a second and talk about what we mean by *server*.  Computers are broadly divided into two types: *clients* and *servers*.  A PC running a web browser is a client.  A server listens for requests from clients and sends data back to them.  Clients can be anything from web browsers to mobile apps to an old-fashioned text-based app which airline agents use to check you into a flight.  Servers include things like web servers, database servers, caching servers, chat servers, etc.

## What is a virtual machine (VM)? ##

In the context of cloud computing, a virtual machine (VM) is simply one operating system running on top of another.  You can run Windows on a Mac using a product like Parallels, and each instance of Windows is a virtual machine.

## How are cloud computing platforms built? ##

Remember that to us, cloud computing implies renting servers by the minute and increasing or decreasing the number of servers used based on demand.  This is typically done with virtual machines.  You create a virtual machine image yourself, or the platform creates one for you, and then it's duplicated across as many servers as you like. Linux-based cloud platforms such as Amazon Web Services use software called Xen to manage virtual machines.  A Windows-based cloud platform like Azure uses software called System Center.  As a developer, you don't need to know things at this level of detail unless you're really curious. 

Want to peek inside a datacenter?  Check out this YouTube video: http://www.youtube.com/watch?v=JJ44hEr5DFE

## IaaS vs. PaaS ##

In addition to SaaS, previously defined, the cloud landscape can be divided into *IaaS* and *PaaS* offerings.

IaaS stands for Infrastructure as a Service.  It just means that instead of running servers in your own datacenter, you're paying someone else to run them for you on their servers.  It comes down to creating virtual machine images and running them on someone's cloud platform.  The advantage of IaaS is that if you have an existing software system in your own datacenter, you can create virtual machine images of them and upload them to the cloud.  Things continue to run pretty much as they did before.  The disadvantage to IaaS is that you still need to manage your own systems.  You need to be aware of security patches, and install them.  You need to set up load balancers and manage incoming traffic.  You need to pay attention to your overall load and scale the number of virtual machines accordingly.  Examples of IaaS include Amazon's EC2 and Azure's Virtual Machines.

PaaS stands for Platform as a Service.  With PaaS, you write your application to use services provided by the platform without needing to manage the individual virtual machines themselves. It's a layer of abstraction on top of virtual machines.  Example services you can use are storage, databases, and compute instances.  The advantage of PaaS is that it gets you out of the business of planning and maintaining your own infrastructure. You can run large systems with very few people.  The disadvantage of PaaS is that you need to write your software from scratch to take advantage of it.  It's tricky adapting a legacy application to use PaaS.  Examples of PaaS include Heroku and Azure Web Sites.

BuildCamp uses PaaS.  For new applications, the benefits of PaaS make it the clear choice.
