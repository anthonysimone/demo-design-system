# Design System Project

This project contains all packages related to the design system managed with Lerna and Yarn Workspaces. All new design system related packages should be added and maintained in this repo as well allowing for simple interdependent package relationships and development worfklow.

## Getting Started

To get started, simply clone the repo and install dependencies in the project root with yarn.

```
git clone git@github.com:anthonysimone/demo-design-system.git
cd demo-design-system
yarn
```

Running yarn in the project repo will install all dependencies of all sub packages in this repo. It will also handle peer dependencies by symlinking to the actual project directories on your machine to allow for a simple workflow when editing multiple dependent packages at the same time. More details below.

## Lerna

[Lerna](https://lernajs.io/) is a tool for managing JavaScript projects with multiple packages. Details regarding Lerna can be found at the link above. Lerna used by itself handles publishing multiple packages from a single repo separately to a package serving platform like npm. It also can be used to expedite and simplify a development workflow with multiple interdependent packages within a single repo.

Lerna is often used in conjunction with Yarn Workspaces. When used together, some of the responsibilities of Lerna are delegated to Yarn Workspaces as described below.

This setup currently uses Lerna + Yarn Workspaces and thus Lerna is mostly used to streamline the publishing workflow of multiple packages in a single repo.

### Publishing with Lerna

This repo is set up to handle package versions independently as this isn't providing a system of packages that all necessarily work together as consumed by a user. After changes have been committed and pushed, you can publish with the following command:

```
lerna publish
```

This prompts you with all packages that have been edited since the last publish and gives you options for how to bump their versions. That's it, everything will be updated and pushed to the package host.

## Yarn Workspaces

[Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) helps solve the problem of dependencies in a repo with multiple packages. When installing from the repo root with `yarn` all sub package dependencies will be installed. These are all installed in the ***repo root `node_modules` folder***. They are "hoisted" to the main parent context. Duplicate dependencies are then shared. Dependencies are only tracked in `node_modules` of their actual package folder when there are different dependency versions across multiple packages. This should generally be avoided, however, unless absolutely necessary, as interdependent packages with different 3rd party version dependencies can become problematic.

### Peer Dependencies

Workspaces also handles peer dependencies within the repo. When combined with Lerna, this responsibility falls onto Workspaces. When one package is dependent on another package within the repo, the actual directory on your local machine is symlinked allowing you to develop multiple dependent packages at the same time.

### Adding a Dependency

You add a dependency in the same way you normally would for a package. You always add it from the context of the package. If you look at the `package.json` in the repo root, you'll notice the only dependency is Lerna. Package dependencies are always added from the package context.

```
cd packages/[package-name]
yarn add [dependency-name]
```

### Issues with Workspaces

Workspaces handles npm package imports, however, referencing theme assets can be a little tricky. If a package provides an `includesPath` on its export like `webapp-framework` does, that should account for the package location. However, if you need to add a manual include path in your project, you might need to use a helper function to find what path needs to be added depending on if you are working within the workspaces managed repo or not. An example of this is in the `gulpfile.js` for `webapp-library`.