Session 4: Introduction to Git and GitHub
================================================================

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

##End of Part 4

[Click here](../README.md "Open main readme") to return to the main workshop readme and read the summary.