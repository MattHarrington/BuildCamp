Session 4: Introduction to Git and GitHub
================================================================

This session will focus on teaching the basics of Git using GitHub.

## What is Git? ##
Git is distributed revision control system created by Linus Torvalds.

Since its creation in 2005, Git has quickly become one of the widely used version control and source code management systems.
## Why use version control?
Have you ever accidentally deleted an important file? Had a computer crash and lost work?

Do you manually zip and/or copy/paste your important files to keep backups?

Have you ever tried changing something, only to accidentally mess everything up and not remember what you did to fix it?

With version control, you can not only back up your projects, but have a detailed history of all the important milestones of your project. You can also share your work with others, and have multiple coders work on the same project at the same time.
## How much does it cost?
Git itself is free! There are various hosting services out there that have different pricing models. For this lesson, we'll be using GitHub.
## What is GitHub?
GitHub is a hosting service for Git repositories. Don't be confused by the similar name, they are completely different things. You can use Git with a variety of software packages and services. GitHub is just one of the most popular sites for open source projects, and also has its own client to make using Git easier.

GitHub is free for unlimited users, and an unlimited number of open sourced repositories. They charge a monthly fee for private (not viewable by the public) repositories.
## What is open source?
Open source means everyone can see, and download the code for your projects. This allows others to check out, learn from or even contribute to your work. There are a lot of open source software projects that are created and maintained by various members of the community, including Git itself!
## Where else can I host git repos?
There are a lot of different git hosts out there. I would recommend checking out the following:
* Visual Studio Online.
  Website: <http://www.visualstudio.com/products/visual-studio-online-user-plans-vs>
  Cost: Unlimited projects and private repositories for up to 5 users. Charge for additional users.
* BitBucket.
  Website: <https://bitbucket.org/>
  Cost: Unlimited projects and private repositories for up to 5 users.

#Workshop
##Part 0: Set up
###Download GitHub Client
You can download the GitHub for Windows client by going to <http://windows.github.com/>
###Create Account
To create an account for GitHub, go to <https://github.com/join>

Once you get your account set up, you can start the GitHub client on your computer and log in.
###Configure settings
You will be given the option to set the name and email address you would like to have tied to your commits. Use an email address you don't mind others having, this information will be public!

If you are worried about spam, or simply don't want your email address to be publicly listed, GitHub provides a private email address. 
Simply set your email address to "*username@users.noreply.github.com*" where *username* is your GitHub username.

For more information, follow the instructions here: <https://help.github.com/articles/keeping-your-email-address-private>


##Part 1: Your first repository
Start up your GitHub client you downloaded in step 0.
###Create a new local repository
To create a new local repository, click the "+" icon in the top left corner of the program.
###Your first commit
###Change something!
###Add, delete and rename files
###Discard changes
###Revert back
###Break up into multiple commits
###Ignoring files

##Part 2: Publishing, cloning, and forking.
###Publish a new repository
###Push changes
###Clone an existing repository
###Fork an existing repository
###Pull request

##Part 3: Branching
###What is branching?
To view branches, you can go to your Git Shell and enter the log graph command:

```
git log --graph --oneline --all
```
###Create a branch
###Switch between branches
###Deleting branch
To delete a branch, you'll need to go to your branch manager. To get there, click the "Branches" down down menu and hit the "Manage" link on the top right.

##Part 4: Merging and Rebasing
Now that you've made multiple branches, it's time to learn how to put them back together!
###Merging branches
To merge, go back to your branch manager by clicking on the "Branches" drop down and hitting "Manage"
###Resolving conflicts
###Rebasing
Rebasing takes a branch and integrates all its commits into another branch.
###When should you merge and when should you rebase?
At first merging and rebasing might seem to give you the same result. The code gets all mashed together! But, there is a key difference between the two.

Merging takes all the changes in one branch, then in one commit applies those differences into another branch.

Rebasing says I want to take all the commits in my current branch, and change the "base" at when the branch initially started at.

So when would you want to use one vs. the other?

#### You might want to merge when...
You made a branch for a new feature. After you've coded it and bug tested the feature and ready to bring it into your main code, you probably want to merge.

In this case, you don't care about maintaining all the interim commits, but simply want the final product of that branch.

#### You might want to rebase when...
You were developing in branch A, and another developer working from branch B wants to integrate their work with yours. 

In this case, you want to preserve all the interim commit steps and documentation they have been working on. By rebasing, you get not just the final code but all the steps that the developer took as if they had also been working on branch A the whole time.

#Summary
You now know how to use Git and GitHub to create and maintain repositories!

You should try making Git repos for all your software projects. Remember to commit changes early and often, and write good descriptions! This small extra step will eventually save you hours of headache when something eventionally goes wrong. In addition to allowing you to more easily share and collaborate on your work with others.
##Links
Here are links to the things I talked about in this tutorial.
####Software
GitHub Client - <https://windows.github.com/>
####Repositories
GitHub's Git Ignore repository - <https://github.com/github/gitignore>
##Further learning
Here is a fun interactive Git lesson: <http://pcottle.github.io/learnGitBranching/>

Here is a tutorial written by Atlassian: <https://www.atlassian.com/git/>