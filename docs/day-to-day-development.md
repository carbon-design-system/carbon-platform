# Day to day development

Here are some of the normal tasks a developer would expect to run on a day-to-day basis while
working on the Carbon Platform.

> Note: The monorepo is using npm 8 "workspaces", which simplify the dependency management across
> projects through the use of many top-level commands which target specific workspaces.

## Prerequisites

Before developing the Carbon Platform project, you must have the following installed:

- Node.js version 16 (available through [nodejs.org](https://nodejs.org/en/download/) or the Node
  Version Manager, [nvm](https://github.com/nvm-sh/nvm)).
- NPM version 8. This is typically distributed along with Node v16.

You can validate that you are running the correct versions of these utilities by running:

```
$ npm --version
```

and

```
$ node --version
```

## Cloning the repo

All of the projects are stored in a single monorepo located at
https://github.com/carbon-design-system/carbon-platform. To get started, clone this repository
locally.

## Working with npm dependencies

For information about installing and managing repo-wide dependencies, see
[Working with dependencies](./working-with-dependencies.md).

## Running npm scripts for packages and services

There are two ways to run npm scripts for a package.

1. Use a workspace command from the top-level in the repo, such as:
   - ```
     $ npm --workspace services/web-app run dev
     ```
2. Or, `cd` to the workspace itself and run the command:
   - ```
     $ cd services/web-app
     $ npm run dev
     ```

## Rebuilding packages

If you make changes to one of the packages, you will need to rebuild it before you'll see its
changes reflected in any other packages or services that depend on it. This is pretty
straightforward and can be done with:

```
$ npm --workspace packages/some-package run build
```

Or, to be safe and rebuild all packages:

```
$ npm run packages:build
```

## Before you push!

There's a few things you should do prior to committing/pushing a change to GitHub for review to help
things go as smoothly as possible.

### 1. Run linters

From the top-level in the repo, run:

```
npm run lint
```

This will run all linters against the entire repo. If there are any issues and you want to auto-fix
as many of them as possible, run:

```
npm run lint:fix
```

### 2. Run a build

You can build in one of a few ways depending on the scope of your work. From the top-level in the
repo, run one of the following:

All packages and services:

```
npm run all:build
```

All packages:

```
npm run packages:build
```

All services:

```
npm run services:build
```

One particular package or service:

```
npm --workspace services/logging run build
```

### 3. Run unit tests

Depending on the scope of your work, run one of the following from the top-level in the repo.

```
npm run test
```

If run from the top-level, `npm run test` will run all unit tests across the entire repo. If run
from a package or service directory, it will only run the tests for that particular workspace.

If you want to run tests for some, but not all workspaces in the repo, you can use something like
the following:

```
npm --workspace services/logging --workspace packages/api run test
```

### 4. Make sure commits reference GitHub issues

This one might be obvious, but make sure the commits you're pushing actually reference the GitHub
issues you're closing!

```
Fixes #123, Closes #456, etc.
```
