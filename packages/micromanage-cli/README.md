# micromanage-cli

> The missing npm workspace management tool.

Micromanage uses npm 8 workspaces as the foundation for managing various packages and services
across a monorepo.

```
Usage: micromanage [options] [command]

Options:
  -h, --help                             display help for command

Commands:
  build [options] <workspace-name>       Build a workspace
  changed [options]                      List changed workspaces
  install [options] [package-name...]    Install workspace packages or packages into a workspace
  package                                Commands that operate on packages
  service                                Commands that operate on services
  uninstall [options] <package-name...>  Uninstall packages from a workspace
  version [options] <workspace-name...>  Update workspace versions based on conventional commits
  help [command]                         display help for command
```

# Commands

## `build`

```
Usage: micromanage build [options] <workspace-name>

Build a workspace

Arguments:
  workspace-name  Name of the workspace (from package.json)

Options:
  --docker        Build using Dockerfile from workspace, tagging the image as both "latest" and the
                  version in its package.json file
  --dry-run       Do not perform a build. Only output the image name and build command
  --json          Output resulting docker images as a JSON array
  -h, --help      display help for command
```

## `changed`

```
Usage: micromanage changed [options]

List each workspace that has changed since its most recent tag

Options:
  --base <base_ref>  Compare workspaces to a ref instead
  --json             Output as a JSON array
  -h, --help         display help for command
```

## `install`

```
Usage: micromanage install [options] [package-name...]

If package arguments are supplied, installs the specified packages into the specified workspace.

Otherwise, installs the workspace's dependencies via `npm install`.

Arguments:
  package-name                      Optional list of packages to install

Options:
  --dry-run                         Do not make any changes. Only output install command
  -w, --workspace <workspace-name>  Workspace for which to install packages
  -h, --help                        display help for command
```

## `package`

```
Usage: micromanage package [options] [command]

Commands that operate on packages

Options:
  -h, --help                             display help for command

Commands:
  dependents [options] <workspace-name>  List the services that depend on a given package
  publish [options] <package-name>       Publish a package to npmjs
  help [command]                         display help for command
```

### `dependents`

```
Usage: micromanage package dependents [options] <workspace-name>

List the services that depend on a given package

Arguments:
  workspace-name  Name of the package (from package.json)

Options:
  --json          Output as a JSON array
  -h, --help      display help for command
```

### `publish`

```
Usage: micromanage package publish [options] <package-name>

Publish a package to npmjs

Arguments:
  package-name  Name of the package to publish

Options:
  --dry-run     Do not make any changes. Only output prospective updates
  -h, --help    display help for command
```

## `service`

```
Usage: micromanage service [options] [command]

Commands that operate on services

Options:
  -h, --help                               display help for command

Commands:
  dependencies [options] <workspace-name>  List the package dependencies of a given service
  deploy [options]                         Deploy all services to CodeEngine
  help [command]                           display help for command
```

### `dependencies`

```
Usage: micromanage service dependencies [options] <workspace-name>

List the package dependencies of a given service

Arguments:
  workspace-name  Name of the service (from package.json)

Options:
  --json          Output as a JSON array
  -h, --help      display help for command
```

### `deploy` (Deprecated)

```
Usage: micromanage service deploy [options]

Deploy all services to CodeEngine

Options:
  --dry-run          Do not make any changes. Only output prospective updates
  --target <target>  target environment for deploy: [test,prod]
  -h, --help         display help for command
```

## `uninstall`

```
Usage: micromanage uninstall [options] <package-name...>

Uninstall packages from a workspace

Arguments:
  package-name                      List of packages to uninstall

Options:
  --dry-run                         Do not make any changes. Only output uninstall command
  -w, --workspace <workspace-name>  Workspace for which to uninstall packages
  -h, --help                        display help for command
```

## `version`

```
Usage: micromanage version [options] <workspace-name...>

Update the version of each provided workspace based on a conventional commits changelog. The
version bump (major/minor/patch) is determined based on the conventional commits found since each
workspace's most recent tag.

Arguments:
  workspace-name  List of workspace names (from package.json) to process

Options:
  --dry-run       Do not make any changes. Only output prospective updates
  --json          Output as a JSON array of new tags
  -h, --help      display help for command
```
