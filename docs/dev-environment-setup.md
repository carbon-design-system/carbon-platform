# Dev environment setup

The Carbon Platform project recommends using VS Code as your IDE, however any editor will work. The
following are recommended for a VS Code-based setup.

## Extensions

The most important extension to get is a good color theme. Feeling cool while you develop increases
productivity. Here's some that the Carbon Platform team uses:

- **GitHub Dark Dimmed** (github.github-vscode-theme)
- **Moonlight II** (atomiks.moonlight)
- **Night Owl** (sdras.night-owl)
- **Sapphire Theme** (tyriar.theme-sapphire)
- **Yonce** (minamarkham.yonce-theme)

The Carbon Design System also has a set of product icons you can use in VS Code.

- **Carbon Product Icons** (antfu.icons-carbon)

The rest of these extensions will make life way easier, since they'll help with linting, formatting,
testing and code smells. They help out with SonarCloud's "clean as you code" philosophy.

- **ESLint** (dbaeumer.vscode-eslint)
  - Shows linting errors as you type. Allows auto-fixing on save.
- **GraphQL** (GraphQL.vscode-graphql)
  - GraphQL query syntax highlighting and autocomplete.
- **MDX** (unifiedjs.vscode-mdx)
  - Provides syntax highlighting and bracket matching for MDX files.
- **Prettier** - Code formatter (esbenp.prettier-vscode)
  - Enables auto-formatting on save to match Prettier code styles.
- **SonarLint** (sonarsource.sonarlint-vscode)
  - Provides real-time static code analysis to find bugs and issues as you code.
- **Stylelint** (stylelint.vscode-stylelint)
  - Provides style linting, fixing, formatting as you type.
- **Live Share** (ms-vsliveshare.vsliveshare)
  - Allows devs to start on-demand live coding sessions with each other.
- **Local History** (xyz.local-history)
  - Saves a local copy of each incremental edit you make to files while developing.
- **YAML** (redhat.vscode-yaml)
  - YAML Language Support for viewing/editing asset schemas.

## Settings config setup

There are a few settings you should set to make best possible use of the extensions listed above.
It's up to you on if you'd prefer to see these globally or only for the Carbon Platform workspace.

```jsonc
{
  // Turns on "fix on save" for eslint and stylelint
  "editor.codeActionsOnSave": ["source.fixAll.eslint", "source.fixAll.stylelint"],
  // Sets prettier as the default formatter (for all file types, but this can be configured to your liking)
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // Allow prettier to apply formatting on file saves
  "editor.formatOnSave": true,

  // IBM recommends this setting to prevent unwanted guests in liveshare sessions
  "liveshare.guestApprovalRequired": true,

  // Turn off line wrapping in markdown files. Allow prettier to handle all wrapping
  "[markdown]": {
    "editor.wordWrap": "off"
  },

  // Only apply prettier formatting if there's a config file present
  "prettier.requireConfig": true,

  // This one is important! Add "scss" to the list of style files that will be linted
  "stylelint.validate": ["css", "less", "postcss", "scss"]
}
```

Here are some of the normal tasks a developer would expect to run on a day-to-day basis while
working on the Carbon Platform.

> Note: The monorepo is using npm 8 "workspaces", which simplify the dependency management across
> projects through the use of many top-level commands which target specific workspaces.

## Prerequisites

Before developing the Carbon Platform project, you must have the following installed:

- Node.js version 16 (available through [nodejs.org](https://nodejs.org/en/download/) or the Node
  Version Manager, [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).
- NPM version 8. This is typically distributed along with Node v16.

We recommend installing your node version via `nvm`.

To install a new version of node using nvm, run:

```
$ nvm install <some.node.version>
```

To set a particular version of node as your default, run:

```
$ nvm use <some.node.version>
$ nvm alias default <some.node.version>
```

> **Note:** `nvm use` only applies to the current terminal session. It does not carry forward into
> any new terminals. `nvm alias` sets the global default for all new terminal sessions.

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

## Installing project dependencies

It is a good idea each time after cloning or pulling from the upstream repository to install the
project dependencies. From the top-level directory of the project, this can be done by running:

```
$ npm install
```

This will install the dependencies across _all_ workspaces in the monorepo.

This will _also_ build all of the `packages` in the repo, since these are required to run any
services that depend on them.
