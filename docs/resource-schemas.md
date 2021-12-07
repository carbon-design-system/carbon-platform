---
title: Resource schemas
---

# Resource schemas

Carbon Design System resources (e.g. standards, libraries, assets) follow a schema to document each
resource in a standardized way. This structured information is indexed by Carbon's platform to use
in the website and other services.

Schemas are applied through metadata files written in YAML. If you're new to YAML and want to learn
more, see "[Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml)."

## Library schema

Libraries are the means to contribute, install, and use one or many assets in products and digital
experiences. To index your library with Carbon, create a `carbon-library.yml` metadata file and
place it in the same directory as your library's `package.json` file.

**Example**

```yml
name: Carbon React
description: React implementation of Carbon Components
```

### Library keys

| Key               | Description                                                                                                                                                                                                              | Required | Type    | Default         | Valid values |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ------- | --------------- | ------------ |
| `id`              | Every library needs an identifier unique to the platform. Contact the [Carbon Platform Devs](https://github.com/orgs/carbon-design-system/teams/carbon-platform-devs) to receive an `id` when registering a new library. | Required | String  | –               | –            |
| `name`            | Library display name. Use title-case capitalization.                                                                                                                                                                     | Required | String  | –               | –            |
| `description`     | Library description ideally between 50-160 characters in length. Use sentence-case capitalization. Defaults to the `package.json` description if not set here.                                                           | Required | String  | –               | –            |
| `packageJsonPath` | Relative location of the library's `package.json`. This is used to reference the library's license, version, and code package.                                                                                           | Optional | String  | `/package.json` | –            |
| `externalDocsUrl` | Absolute URL to externally-hosted documentation.                                                                                                                                                                         | Optional | String  | –               | –            |
| `private`         | If set to `true`, the catalogs will exclude the library.                                                                                                                                                                 | Optional | Boolean | `false`         | –            |

## Asset schema

Assets are reusable units of work that are used in products and digital experiences. Every asset
belongs to a library. For each asset in a library, create a `carbon-asset.yml` metadata file in the
same directory as the asset's source.

**Example**

```yml
id: accordion
name: Accordion
description:
  An accordion is a vertically stacked list of headers that reveal or hide associated sections of
  content.
thumbnailPath: /docs/accordion-thumbnail.png
status: stable
type: component
framework: react
platform: web
```

### Asset keys

| Key               | Description                                                                                                                     | Required | Type    | Default                                                                                        | Valid values                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `id`              | Every asset needs an identifier unique to its library. This is used to associate assets across libraries.                       | Required | String  | –                                                                                              | –                                                       |
| `name`            | Asset display name. Use sentence-case capitalization. All asset names in a library should be unique to prevent page collisions. | Required | String  | –                                                                                              | –                                                       |
| `description`     | Asset description ideally between 50-160 characters in length. Use sentence-case capitalization.                                | Required | String  | –                                                                                              | –                                                       |
| `thumbnailPath`   | Relative location of the asset's thumbnail image.                                                                               | Optional | String  | –                                                                                              | –                                                       |
| `externalDocsUrl` | Absolute URL to externally-hosted documentation.                                                                                | Optional | String  | –                                                                                              | –                                                       |
| `status`          | Used to set consumption exptectations.                                                                                          | Required | String  | `draft`                                                                                        | `draft`, `experimental`, `stable`, `deprecated`         |
| `type`            | Asset categorization.                                                                                                           | Required | String  | –                                                                                              | `element`, `component`, `pattern`, `function`, `layout` |
| `framework`       | Asset frontend framework.                                                                                                       | Optional | String  | `angular`, `react`, `react-native`, `svelte`, `vanilla`, `vue`, `web-component`, `design-only` |
| `platform`        | Asset environment.                                                                                                              | Required | String  | `web`                                                                                          | `cross-platform`, `web`                                 |
| `private`         | If set to `true`, the catalogs will exclude the asset.                                                                          | Optional | Boolean | `false`                                                                                        | –                                                       |

#### Asset inheritance

Each asset can inherit properties from another asset. For example, if there are multiple
implementations of a component for different JavaScript frameworks, it's common that there's an
underlying library and asset that contains shared usage guidance, design specs, and styling.
Defining the inheritance relationship allows us to have a single source of truth for the shared
content and resources, and allows each inheriting asset (e.g. implementation per framework) to
specify its versioned adherance of the underlying asset.

When inheriting another asset, you need to specify the fully qualified asset name (library `id`,
library `version` or its repo's branch, asset `id`) and what properties you'd like to inherit.

For the value of the `inherits` key, you can set the following keys.

| Inherits     | Description                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| `asset`      | Fully qualified asset name with the format `[library id]@[repo ref\|"latest"]/[asset id]`. |
| `properties` | An array of asset keys to inherit.                                                         |

**Example**

```yml
id: accordion
inherits:
  asset: 'carbon-styles@latest/accordion'
  properties:
    - name
    - description
    - thumbnailPath
    - type
    - platform
status: stable
framework: react
```

#### Asset status

Asset status is used by maintainers to set consumption expectations of stability and the likelihood
of future changes. The `status` key can have the following values:

| Status         | Description                                           |
| -------------- | ----------------------------------------------------- |
| `draft`        | Partially complete and not ready for any consumption. |
| `experimental` | Partially complete, not to be used in production.     |
| `stable`       | Complete and ready for production use.                |
| `deprecated`   | Will be sunset at a future date, minimally supported. |

#### Asset type

Asset type is used for primary categorization in asset catalogs. The `type` key can have the
following values:

| Type        | Description                                                                                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element`   | Styles, tokens, and components that are the direct translation of design language elements to digital mediums.                                                                                         |
| `component` | Building blocks that have been designed and coded to solve a specific user interface problem.                                                                                                          |
| `pattern`   | Best practice solution for how a user achieves a goal through reusable combinations of components and content with sequences and flows which are too complex to be encapsulated in a single component. |
| `function`  | Code that performs a single action and has no user interface.                                                                                                                                          |
| `layout`    | Templates that specify component order and placement to compose a specific view.                                                                                                                       |

#### Asset framework

Asset framework specifies if each asset has a dependency on being used alongside a specific
technology. The `framework` key can have the following values:

| Status          | Description                                    |
| --------------- | ---------------------------------------------- |
| `angular`       | [Angular](https://angular.io)                  |
| `react`         | [React](https://reactjs.org)                   |
| `react-native`  | [React Native](https://reactnative.dev)        |
| `svelte`        | [Svelte](https://svelte.dev)                   |
| `vanilla`       | JavaScript with no framework.                  |
| `vue`           | [Vue](https://vuejs.org)                       |
| `web-component` | Custom HTML tags build with web platform APIs. |
| `design-only`   | No coded implementation.                       |

#### Asset platform

Asset platform specifies supported runtimes and where each asset can be used. The `platform` key can
have the following values:

| Status           | Description                                    |
| ---------------- | ---------------------------------------------- |
| `cross-platform` | Runs natively on iOS, Android, and/or desktop. |
| `web`            | Runs on the web.                               |
