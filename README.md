# Roc
## Modern Application Development Ecosystem
_Project status is currently: WIP proof of concept_  

Provides a complete ecosystem for developing modern applications.  
Sweeps common complexities into easy-to-use packages with extendable APIs.

Composes some great open source tools and make them easy to use with a streamlined CLI and configuration/extension system. Direct your focus to _writing great software_ and away from juggling boilerplate.

Web stack Powered by:
- Node 4.x+
- ES6 with BabelJS

Extensions in place for:
- Webpack builds
- Koa
- BrowserSync
- React (complete with Redux and server side rendering)

"Boilerplate" is provided by extensions to avoid pollution/fragmentation on the project level.
## Get started
### Install Roc:
```
npm install -g roc
```
Note: packages not yet made available. Roc is currently used by another module. We have contacted the owner.

### Basic web application:
```
mkdir basic && cd basic
roc init web
roc dev
```

### Basic redux+react application:
```
mkdir redux && cd redux
roc init web-react
roc dev
```

`roc help` will provide available actions. "dev" starts the application locally in development mode with hot code reloading and browersync. View your application on http://localhost:3002

## Motivation
Roc was born out of the need to create modern applications following the correct conventions and using best practices consistently.  
We quickly realized that keeping boilerplate updated within each project over time was unmanagable. It seems natural to have this _repeated complexity managed by separated semantically versioned packages_.

## Read the code
Cli: src/
web: TODO  
web-react: TODO  
config: TODO

## Roadmap
See milestones/issues

## Contribute
We are still working on getting the balance between flexibility and easy-of-use. Input here is valuable to us. Please get in touch and sync with us before comitting your time to large PRs at this stage of the project.
