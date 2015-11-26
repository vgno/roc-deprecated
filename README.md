# Roc - CLI for the Roc ecosystem
![build status](https://travis-ci.org/vgno/roc.svg)
![stability alpha](https://img.shields.io/badge/stability-alpha-red.svg)
[![roc](https://img.shields.io/npm/v/roc.svg)](https://www.npmjs.com/package/roc)

_Project status is currently work in progress and proof of concept_  
We have started to implement the first few products based on Roc. These products are not yet in production. You have been warned!

## Modern Application Development Ecosystem
Roc provides a complete ecosystem for developing modern applications.  
Sweeps common complexities into easy-to-use packages with extendable APIs.

Composes some great open source tools and make them easy to use with a streamlined command line interface and configuration/extension system.  

Direct your focus to _writing great software_ and away from juggling boilerplate and dependencies. Roc is built on top of the Node.js ecosystem.

### Example of tasks handled by extensions
- Building and bundling through [Webpack](http://webpack.github.io/)
- Web server through [Koa](http://koajs.com/)
- [React](http://facebook.github.io/react/) (complete with [Redux](https://github.com/rackt/redux) and server side rendering)
- First class developer experience featuring hot code reloading and [Browsersync](http://browsersync.io)

Common tasks and boilerplate code does not exist in a Roc application but in extensions installed with `npm` making it easier to maintain and update. Roc extensions are opinionated by design.

### Simplicity
As a user of Roc to create components or applications you will mainly direct your attention to your application code, configuration limited to your own project and using the command line interface. You do not need a deep understanding of how Roc makes your life simpler. We do however encourage you to take a deep-dive and contribute.

## Get started
### Install Roc
```
npm install -g roc
```

This provides you with a really simple command line interface. Only Linux and OS X _currently_ supported.

### Awesome Redux + React application
Create application directory. Name it whatever you like. We used react-app.

```
mkdir react-app && cd react-app
```
Init application starting point
```
roc init web-react
```

Build and start the application in development mode
```
roc dev
```

`roc init web-react` uses the starting point [roc-base-web-react](https://github.com/vgno/roc-base-web) from Github  

Suitable for more ambitious web-applications that prefer **React** views, **universal rendering** and established library **Redux** for unidirectional dataflow.  


### Basic web application
Create application directory. Name it whatever you like. We used basic.

```
mkdir basic && cd basic
```
Init application starting point
```
roc init web
```

Build and start the application in development mode
```
roc dev
```

`roc init web` uses the starting point [roc-base-web](https://github.com/vgno/roc-base-web) from Github  

Suitable for serving static files and rendering `html` with basic `javascript` on the client.  

### Where to go from here
`roc help` will print available actions.  
`roc dev` starts the application locally in development mode with _hot code reloading_ and _Browersync_.  
`roc dev --help` will list all **options available to your current extension**.  
Be sure to read through this as minor adjustments to your `roc.config.js` is a very common use-case. Also check out defaults for [web](https://github.com/vgno/roc-web/blob/master/src/roc/config/roc.config.js) and [web-react](https://github.com/vgno/roc-web-react/blob/master/src/roc/config/roc.config.js)  

View your application at http://localhost:3002 using default configuration.

## Motivation
Roc was born out of the need to create modern applications following the correct conventions and using best practices consistently.  
We quickly realized that keeping boilerplate updated within each project over time was unmanageable. It seems natural to have this _repeated complexity managed by separated semantically versioned packages_.

## Eco system
| Project | Github page |
----------|--------------
| CLI (this project) | https://github.com/vgno/roc |
| Roc Config | https://github.com/vgno/roc-config |
| Roc Web | https://github.com/vgno/roc-web |
| Roc Web React | https://github.com/vgno/roc-web-react |

## Roadmap
See milestones/issues.

## Contribute
We are still working on getting the balance between flexibility and easy-of-use. Input here is valuable to us. Please get in touch and sync with us before committing your time to large PRs at this stage of the project.

## Thanks

Thanks to [Jongleberry](https://github.com/jonathanong) for letting us use the `roc` package name on npm.
