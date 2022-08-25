# Working with dependencies

Here are some of the package management tasks that are periodically performed across the monorepo.

> Note: The monorepo is using npm 8 "workspaces", which simplify the dependency management across
> projects through the use of many top-level commands which target specific workspaces.

## Installing project dependencies

It is a good idea each time after cloning or pulling from the upstream repository to install the
project dependencies. From the top-level directory of the project, this can be done by running:

```
$ npm install
```

This will install the dependencies across _all_ workspaces in the monorepo.

This will _also_ build all of the `packages` in the repo, since these are required to run any
services that depend on them.

## Adding new project dependencies

To install a new node module into a project, from the top-level of the repository, run:

```
$ npm --workspace <workspace_path> install [--save-dev] some-node-package-name@latest
```

- `workspace_path` is the folder containing the package.json you wish to update. For example
  `services/logging`.
- `--save-dev` is optional, depending on whether the dep is a production dep or only used during
  development/build.
- Make sure to specify a package version or `@latest` so the dependency doesn't get installed with
  the `*` wildcard.

Here's a full example of installing the `immer` package into the `@carbon-platform/logging` package:

```
$ npm --workspace services/logging install immer@latest
```

Removing dependencies works the same way with the `npm uninstall` command.

> ⚠️⚠️⚠️ Note ⚠️⚠️⚠️
>
> It is important to only run install commands from the top-level of the repository. This allows a
> single `package-lock.json` file to be maintained at the root of the repo. If you see that you've
> accidentally created another lock file in your git views, don't commit it! Delete it and re-run
> the install/update/uninstall commands from the top-level of the repo.

## Updating node modules

To update the node modules across all workspaces, from the top-level in the repo, run:

```
npm update
npx --workspaces --include-workspace-root ncu --upgrade --interactive --target=minor
npm install && npm install
```

> Note: An ncu target of `latest` or `patch` can also be used, depending on the objective.

> Note: Running npm install twice during this helps to eliminate wildcard versions from showing up
> in the package-lock.json file.

To update the node modules only for a specific workspace, from the top-level in the repo, run:

```
$ npm --workspace <workspace_path> update
```

## Info about the "base" workspace

The `base` workspace contains dependencies that are used across multiple other workspaces in the
repo. Because of this, there should never be a `node_modules` folder inside of this workspace. If
there is, then this means that the lockfile needs to be rebuilt. Having a `node_modules` folder in
the `base` workspace means that one of the base dependencies has a second, out-of-sync version of a
package installed someplace else in the monorepo. This is not good because it circumvents the base
as the authoritative source for common packages.

When a node module is used in more than one workspace, it's often a good idea to move it to the
`base` workspace if it should be considered as a core module for all workspaces. An example of this
is the version of TypeScript that is used across the monorepo.

## Rebuilding the lockfile

From time to time, the sequence of dependency installations may result in undesirable results in the
package-lock.json file. To remedy this and rebuild the lockfile, do the following:

```
rm package-lock.json
rm -rf node_modules
find . -name node_modules | xargs rm -rf
CI=true npm --workspace base install
CI=true npm install && npm install
```

> Note: this will result in updates to the node modules across the project (if any are available).
