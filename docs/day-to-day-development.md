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

This will install the dependencies across _all_ projects in the monorepo.

## Adding GitHub personal access token for prototype

The web app prototype uses a GitHub personal access token to fetch data from GitHub. To run the prototype:

1. Generate a new token https://github.com/settings/tokens
1. Select all repo scopes
1. Copy the `/services/web-app/.env.example` file and rename to `/services/web-app/.env.local`
1. Add your token to that new `.env.local` file

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

## Updating node modules

To update the node modules across all workspaces, from the top-level in the repo, run:

```
$ npm update
```

To update the node modules only for a specific workspace, from the top-level in the repo, run:

```
# npm --workspace <workspace_path> update
```

> Note: This is currently not working correctly (https://github.com/npm/arborist/issues/345). As a workaround, you can pass each package's name to the update command that you want to update and it will be properly scoped to only the workspace in question.

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
