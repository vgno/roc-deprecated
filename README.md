# Roc
## Modern Application Development Ecosystem
_Project status is currently WIP proof of concept_  

Provides a complete ecosystem for developing modern applications.  
Sweeps common complexities into easy-to-use packages with extendable APIs.

Composes some great open source tools and make them easy to use with a streamlined CLI and configuration/extension system. Direct your focus to _writing great software_ and away from juggling boilerplate and dependencies. Built on top of the node ecosystem.

### Example of tasks handled by extensions
- Building and bundling through Webpack
- Web server through Koa
- First class developer experience
- React (complete with Redux and server side rendering)

Common tasks and boilerplate code does not exist in a Roc application but in extensions making it easier to maintain and update.

## Get started
### Install Roc
```
npm install -g roc
```

### Basic web application
```
mkdir basic && cd basic
roc init web
roc dev
```

### Basic Redux & React application
```
mkdir redux && cd redux
roc init web-react
roc dev
```

`roc help` will provide available actions.  
`dev` starts the application locally in development mode with hot code reloading and Browersync.   View your application at http://localhost:3002

## Motivation
Roc was born out of the need to create modern applications following the correct conventions and using best practices consistently.  
We quickly realized that keeping boilerplate updated within each project over time was unmanageable. It seems natural to have this _repeated complexity managed by separated semantically versioned packages_.

## Read the code
cli: TODO  
web: TODO  
web-react: TODO  
config: TODO

## Roadmap
See milestones/issues.

## Contribute
We are still working on getting the balance between flexibility and easy-of-use. Input here is valuable to us. Please get in touch and sync with us before committing your time to large PRs at this stage of the project.

## Thanks

Thanks to [Jongleberry](https://github.com/jonathanong) for letting us use the `roc` package name on npm.
