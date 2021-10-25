---
title: Day to day development
---

# Day to day development

Here are some of the normal tasks a developer would expect to run on a day-to-day basis while working on the Carbon Platform.

> Note: The monorepo is using npm 7/8 "workspaces", which simplify the dependency management across projects through the use of many top-level commands which target specific workspaces.

## Prerequisites

Before developing the Carbon Platform project, you must have the following installed:

- Node.js version 16 (available through [nodejs.org](https://nodejs.org/en/download/) or the Node Version Manager, [nvm](https://github.com/nvm-sh/nvm)).
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

All of the projects are stored in a single monorepo located at https://github.com/carbon-design-system/carbon-platform. To get started, clone this repository locally.

## Installing project dependencies

It is a good idea each time after cloning or pulling from the upstream repository to install the project dependencies. From the top-level directory of the project, this can be done by running:
```
$ npm install
```
This will install the dependencies across *all* projects in the monorepo.

## Adding new project dependencies

To install a new node module into a project, from the top-level of the repository, run:
```
$ npm --workspace <workspace_path> install [--save-dev] some-node-package-name
```
- `workspace_path` is the folder containing the package.json you wish to update. For example `packages/logging`.
- `--save-dev` is optional, depending on whether the dep is a production dep or only used during development/build.

Here's a full example of installing the `immer` package into the `@carbon-platform/logging` package:
```
$ npm --workspace packages/logging install immer
```

Removing dependencies works the same way with the `npm uninstall` command.

> Note: It is important to only run install commands from the top-level of the repository. This allows a single `package-lock.json` file to be maintained at the root of the repo.

## Running npm scripts for packages

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
