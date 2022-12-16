# Working with dependencies

Here are some of the package management tasks that are periodically performed across the monorepo.

> Note: The monorepo is using npm 8 "workspaces", which simplify the dependency management across
> projects through the use of many top-level commands which target specific workspaces.

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

To update the node modules across all workspaces, from the top-level in the repo, run the following
command. **Be sure to answer "no" each time it asks if you want to run an `npm install`.**

```
npx --workspaces --include-workspace-root ncu --upgrade --interactive --target=minor
CI=true npm install && npm install
```

> Note: An ncu target of `latest` or `patch` can also be used, depending on the objective.

> Note: Running npm install twice during this helps to eliminate wildcard versions from showing up
> in the package-lock.json file.

> Note: Avoid picking up "rc" releases of Carbon packages, if possible.

To update the node modules only for a specific workspace, from the top-level in the repo, run:

```
$ npm --workspace <workspace_path> update
```

### Things to check/run after updating node modules

- Run the project-wide linter/formatter (`lint`)
- Run project-wide unit tests (`test`)
- Build all packages and services (`all:build`)
- Spot check of the web-app running locally
- (Optional) Docker builds of the services

## Info about the "root" workspace

When a node module is used in more than one workspace, it's often a good idea to move it to the
`root` workspace if it should be considered as a core module for all workspaces.

An example of this is the version of TypeScript that is used across the monorepo. Individual
workspaces do not install TypeScript directly. They get it implicitly from the `root` workspace.
When the `root` workspace version of TypeScript is updated, so too are the workspaces which depend
on it. This is true for **any** module installed in the `root` workspace.

Individual workspaces can _override_ the `root` workspace version of a dependency by explicitly
installng it in their package.json, but this is not advisable because it circumvents the `root`
workspace as the authoritative source for these core (common) packages.

Since the `root` workspace contains dependencies that are used across multiple other workspaces in
the repo, these dependencies should only appear in the top-level `node_modules` folder and **not**
in the `node_modules` folders of individual packages/services/workspaces. Dependencies in individual
workspace `node_modules` folders should only be present if the workspace requires a specific version
of a dependency which diverges from the "common" one available in the top-level `node_modules`
folder.

It's a good idea to periodically check all of these folders to make sure what's in there is
expected.

## Rebuilding the lockfile

From time to time, the sequence of dependency installations may result in undesirable results in the
package-lock.json file or individual `node_modules` folders. To remedy this and rebuild the
lockfile, do the following:

```
rm package-lock.json
rm -rf node_modules
find . -name node_modules | xargs rm -rf
CI=true npm install && npm install
```

> Note: this will result in updates to the node modules across the project (if any are available).
