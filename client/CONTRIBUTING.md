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
