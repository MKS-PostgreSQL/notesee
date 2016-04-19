# Contributing
These are the guidelines we followed when contributing code to Notesee. Feel free to follow them as rigorously as you'd like, or dump them in favor of your own. The key for us was staying consistent.

## Getting Started
The only thing you'll need to do after forking and cloning the repository is run `bower install`. That's it! Read on for more information regarding testing, deployment, etcetera.

## Style Guides
We followed these two style guides religiously:

- [JS Standard](https://github.com/feross/standard)
- [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

The key is to pick something and stick to it, and for us JS Standard did just that. The Angular Style Guide was also extremely helpful for making our code modular, consistent, and debuggable.

## Testing
Since the app uses native device APIs (camera, social sharing, etcetera), you'll need to test the app on an actual device. To do this, ensure you have Xcode installed and run `ionic build ios`. After that, you should be able to open the project in Xcode and deploy it to your device.

If you're wanting to test on anything other than an iPhone from a Macbook, see me. We personally didn't do it for this project, but I've written some handy scripts for other projects that may help out when deploying to Android or from Linux.

## Issue Tracking
Github has a built in issue tracking system that's pretty awesome! You can tag issues, assign someone to them, mark them as part of a milestone, etcetera. If you haven't used them before, check out [Github's writeup on them](https://guides.github.com/features/issues/). We followed Github's reccomendations, along with [a tagging style guide](https://robinpowered.com/blog/best-practice-system-for-organizing-and-tagging-github-issues/).

## Deployment
We never got around to actually publishing our app to the Google Play and Apple App Stores, but contact me if you're interested in doing so. I've written several scripts that automate a lot of the process, and can give you a hand in making sure everything's good for the review process.

## Github Workflow
For the most part, we followed [Github's reccomended workflow](https://guides.github.com/introduction/flow/) with a shared repository model. This meant branching off from master, committing some code, and submitting a pull request back to master.

### Branching
You should almost always [create a feature branch](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches) when working on something new. The branch should originate from master, and include a few dash separated words (without prefixes) as to what you're working on. Branches should never involve more than one feature or fix, and should include as few changes as possible. This allows you to get code into master as quickly as possible, and isolate specific features and fixes from others.

As soon as you feel like a feature or fix is ready, [create a pull request](https://help.github.com/articles/using-pull-requests/). Doing so immediately means others are aware of your changes, and avoids large merge conflicts later on. When a pull request is merged into master by somebody else, it should be [pulled into your feature branch as quickly as possible using rebase](https://medium.com/@porteneuve/getting-solid-at-git-rebase-vs-merge-4fa1a48c53aa). Your branch's history should never have any merge commits; try to keep the history as clean as possible by [using rebase to fast forward and replay commits from master on top of your branch](http://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/).

### Committing
For commit messages, try to stick with [these guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html). This mainly means keeping your commit messages short (no prefixes) and in the imperative (update instead of updates or updated, etcetera). Only include commit descriptions if absolutely necessary, and when you do format them using markdown.

Your commits should be concise and clear. Someone else should be able to follow the steps you took to implement something by simply viewing your commits. This means they should be in a logical order (don't switch between working on different features in the same branch).

If things get messy, don't be afraid to use git rebase. If you're unfamiliar with it, there are [several](https://help.github.com/articles/about-git-rebase/) [great](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history) [guides](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) available to you.
