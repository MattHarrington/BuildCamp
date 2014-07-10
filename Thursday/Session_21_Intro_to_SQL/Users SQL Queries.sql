-- ==================================================
-- BEGIN CLEAN UP SCRIPT
-- ==================================================
-- This makes sure that the dbo.UserAddresses and 
-- dbo.Users tables don't exist.  The first time you
-- run this, they SHOULDN'T exist, but if you run the 
-- script multiple times in the same db it will let 
-- you re-create and reset the tables.  
-- ==================================================
IF object_id('dbo.UserAddresses','U') IS NOT NULL
  BEGIN
    PRINT 'Dropping dbo.UserAddresses';
    DROP TABLE dbo.UserAddresses;
  END;

GO

IF object_id('dbo.Users','U') IS NOT NULL
  BEGIN
    PRINT 'Dropping dbo.Users';
    DROP TABLE dbo.Users;
  END

GO
-- ==================================================
-- END CLEAN UP SCRIPT
-- ==================================================

--Creating a table in SQL is pretty easy.  This statement
--creates a table called dbo.Users  with three columns, id,
--username and clue
--We want a user to have a unique id so we make it the 
--PRIMARY KEY to have SQL Server throw an error if a row
--is inserted with an id value that is already in use. 
--We also want to let SQL Server make the unique numbers 
--up for us automatically so that we don't have to make them
--up.  That is what the 'IDENTITY(1,1)' does.  It starts 
--numbering id at one (1) and increments the id by one (1) 
--for each subsequent row.  
CREATE TABLE dbo.Users
(
  id int PRIMARY KEY IDENTITY(1,1),
  username nvarchar(max) NOT NULL,
  clue int NOT NULL
);
--The 'GO' word by itself on a line is an indicator to the 
--SQL editor that it should send what ever is above the GO
--to the server.  Then it can move past the go to start the 
--next 'batch'.  I didn't really need 'GO's here but I 
--included them as a way to indicate to you which statements
--to run each time.  Simply highlight all the statements betwee
--to GOs and execute. Then move to the next, read the comments
--and run the code.
GO

--This statement inserts four users into the dbo.Users table...
INSERT INTO dbo.Users (username,clue) VALUES 
  ('Bret',0),
  ('Steven',9),
  ('Matt',9),
  ('Joe',5);

GO

--Get all the columns ('*') from the dbo.Users table,
--for all of the rows
SELECT * FROM dbo.Users;

GO

--Now we can finally answer our original question. 
--Get all the columns ('*') from the dbo.Users table,
--for only the rows where the 'clue > 0' boolean expression
--evaluates to true
SELECT * FROM dbo.Users WHERE clue > 0;

GO

--We don't really care about the IDs, let's return just the names and clues:
SELECT username, clue FROM dbo.Users;

GO

--We can order the columns any way we want when me make an explicit list. 
--For this, as well as number of other reasons, it's always best to 
--explicitly ask for the columns rather than using '*'
SELECT clue, username FROM dbo.Users;

GO

--If I wanted to see the users with their addresses you could run two queries 
--and manually match the data up based on the corresponding id values:
SELECT id, username, clue FROM dbo.Users;
SELECT id, streetaddress, city, state, zip FROM dbo.UserAddresses;

--LAME.  

GO

--We can also insert, update and delete against a table...
INSERT INTO dbo.users (username,clue) VALUES ('festus',1);

GO
--Verify the new user
SELECT username,clue FROM dbo.Users WHERE username='festus';

GO
--Update festus, and give him more of a clue
--Notice that this is dangerous if there is more then one
--user name 'festus'.  A where clause condition based on
--the primary key value (id) would be a better choice.  
UPDATE dbo.users SET clue = 5 WHERE username='festus';

GO

--Verify the update
SELECT username,clue FROM dbo.Users WHERE username='festus';

GO

--And we can delete festus
--Again, it would be better if the where clause was based 
--on the id not the username
DELETE FROM dbo.Users WHERE username='festus';

GO

--Verify the delete
SELECT username,clue FROM dbo.Users WHERE username='festus';

GO

--Lets create another table to store user's addresses
--We'll store the same ID value as the Users.id, and we
--want to make sure that any one user id appears only once.
--that makes sure that a user only has a single address.  
--We enforce that by putting a Primary Key on the id column.
--We also want to ensure that you can't store a user id value
--that doesn't also exist in the Users table.  If we could that
--means there would be an address that wasn't associated with a 
--real user.  We call that an "orphan".  To contrain the 
--UserAddresses.id column values to those in the Users.id column,
--we create a Foreign Key.  
CREATE TABLE dbo.UserAddresses
(
  id int PRIMARY KEY FOREIGN KEY REFERENCES Users (id),
  StreetAddress nvarchar(max),
  City nvarchar(max),
  [State] nvarchar(2),
  Zip nvarchar(5)
);

GO

--And insert only a couple of addresses
INSERT INTO dbo.UserAddresses 
  (id,StreetAddress,City,State,Zip) 
  VALUES 
  (1,'123 Main','San Diego','CA','92108'),
  (4,'234 Main','Denver','CO','12345');
GO

--And let's see the address records:

SELECT id, StreetAddress, City, State, Zip FROM dbo.UserAddresses;

GO

--If we'd like the users username, clue and address info to come back in a single
--result, we can use "joins".  Both Users and UsersAddresses have id values 1 & 4.  
--The dbo.Users table also has IDs 2 and 3 that DON'T have a matching address record
--in the dbo.UserAddresses table.  If I want to see only users that have addresses, 
--that is an INNER join.

--We have to "table qualify" the columns that have the same name in both tables (id)  
--I kind of prefer to qualify all of them so there is no confusion about what table
--a column is displaying values from
--Notice that only users with addresses are returned
SELECT Users.id, Users.username, Users.clue, UserAddresses.streetaddress, UserAddresses.city, UserAddresses.state, UserAddresses.zip
FROM Users INNER JOIN UserAddresses
ON Users.id = UserAddresses.id;

GO

--That can get kind of tedious with long table names and a lot of columns:
SELECT U.id, U.username, U.clue, A.streetaddress, A.city, A.state, A.zip
FROM Users as U INNER JOIN UserAddresses as A
ON U.id = A.id;

GO

--If I want to see All the users, and matching address data where there 
--is an address, or NULL values for the address other wise, I can use
--an OUTER JOIN.

SELECT U.id, U.username, U.clue, A.streetaddress, A.city, A.state, A.zip
FROM Users as U LEFT OUTER JOIN UserAddresses as A
ON U.id = A.id;

--Ok, well that was a WAY SHORT intro, but hopefully it gave you some basic ideas
--about what a relational database is about and how you could create tables and 
--manage the data in them 
