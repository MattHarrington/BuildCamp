Caching and Scaling
===================

What does *scaling* mean?  If you run your web app on one single web server and talk to one single database, you can perhaps handle a few hundred simultaneous users.  What if you start getting a lot of traffic?  When you scale your app, you increase its capacity to handle the extra traffic.  One way to do this is to increase the number of web servers you use and also cache your data.

What does *cache* mean?  Dictionary.com says: *a hiding place, especially one in the ground, for ammunition, food, treasures, etc.*  When you cache data, you store it in a special place so you can quickly retrieve it later.  Databases are typically very slow because they persist data to disk.  However, they're reliable.  In addition to storing data in a database, you can also cache it to speed up performance.

Latency numbers every programmer should know: https://gist.github.com/jboner/2841832.

### Scaling ###

Let's get scaling out of the way first.  Luckily, one benefit of PaaS is that scaling is very simple:

1. Log into the Azure portal
2. Find a web site you previously created or create a new one
3. In the site's detail page, go to the **Scale** tab
4. Change the **Web Hosting Plan Mode** to *Basic*.  This puts your site on a dedicated server, not one which you share with other sites.
5. Slide the **Instance Count** slider up and down.  This is how you manually scale up the number of servers.
6. A more sophisticated solution is to autoscale.  Click the **Scale by Metric** toggle switch.  This lets you automatically scale the number of servers based on CPU load.
7. Click **Discard** at the bottom of the page.  We're not actually going to scale up anything right now, because it would needlessly use your Azure credits.

### Caching ###

A popular NoSQL server called Redis is commonly used as a cache.  Here are some details about it:

- Key/Value store which uses memory
- Can store to disk if necessary
- Give up flexibility for speed
- Stands for REmote DIctionary Service


### Redis features ###

- Speed.  Probably faster than any database you've ever used.  Not a magic bullet though.  Improves performance by several orders of magnitude.
- Stores more than strings, for example, you can store data as an ordered list
- Persistence to disk
- Replication.  You can have a master Redis server which handles writes and several slave Redis servers which handle reads.
- Lua support.  Kind of like stored procedures in SQL databases.

### NoSQL Basics###

First, what's a relational database?  Stores data in tables, which are connected via foreign keys.  When talking about databases, it's traditional to use customers and orders for the example data.  In relational databases, you'd have a customer table and an order table.  In our Mobile Services session, we create one table for our ToDo items.  Related data would be stored in a separate table.

In the NoSQL world, you don't really store data in separate tables.  A customer and their orders would be stored in the same place.  In some ways this is simpler than in a relational database, but the downside is that it's up to the developer to make sure the data doesn't get mixed up.

MongoDB is a NoSQL databases in which data is stored in documents.  The documents are indexed for quick access.

Redis stores data with keys.  The data stored can be more than just a document.  No indexing.  Stored in memory.  Persistence to disk comes later.

With SQL databases, you query the data with SQL.  With MongoDB, your documents are indexed and you can query against them.  However, with Redis, you only can get data if you know the key.  This isn't ideal in many situations, since you can't really query your data.  However, it's very, very fast.  If you need speed, and if you can plan out your data needs appropriately, Redis might be just what you want.

What is an atomic operation?  One which completes all at once.  Race condition?  What if 2 clients access data and change it at the same time.

Azure offers Redis as a service.  Setting up Redis is as simple as turning it on.  However, this is not available in student Azure accounts.  Instead, we will run Redis locally on your PC.

### Redis lab ###

#### Explore the command line interface ####

1. Download the Redis binaries from GitHub: https://github.com/MSOpenTech/redis/tree/2.8/bin/release
2. Extract the zip archive
3. Double click `redis-server.exe`
4. Ignore the warning about no config file being specified
5. Double click `redis-cli.exe`.  Note that it automatically connects to the port that `redis-server.exe` is listening on.
6. In the `redis-cli` window, type `set greeting "Hello BuildCamp!"`.  This sets a key called `greeting` with a value of `"Hello BuildCamp!`.
7. Type `get greeting` to get the value of the `greeting` key
8. Type `del greeting` to delete the key
9. Type `set account_balance 100`
10. Type `incr account_balance`.  This increments `account_balance` by one.  Why do this in Redis when you could just do it in code?  The answer has to do with atomic operations.  The `incr` command is atomic.  This means is succeeds or fails all at once.  What would happen if two different Redis clients tried to increment the account balance in code at the same time?  This is called a *race condition*.
11. You can set an expiration date on a Redis key.  Type `set lock true` and then `expire lock 15`.  Then type `get lock`.  It will return `true` for 15 seconds, and `nil` after that.  This is useful if you want to cache data for only a certain duration.
12. The full list of Redis commands is here: http://redis.io/commands.  Take a quick look at them if you like.

#### Use Redis from Node ####

1. In Visual Studio, go to **File -> New Project** and create a new **Blank Node.js Console Application**
2. Right-click the `npm` folder and select **Manage npm Modules**
3. Search for **redis**.  The author, listed on the right, will be Matt Ranney.
4. Click **Install**
5. Erase the call to `console.log()` in `app.js` and replace it with this:

```javascript
var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});
```

6. Run the code.  This creates a client to the Redis server you already have running.  The native Redis commands are mapped to functions on the `client` object.
7. Documentation for the `redis` npm module is here: https://github.com/mranney/node_redis.


Continue learning Redis with this interactive tutorial: http://try.redis.io/.

