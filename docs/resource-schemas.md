# Resource schemas

Carbon Design System resources (e.g. standards, libraries, assets) follow a schema to document each
resource in a standardized way. This structured information is indexed by Carbon's platform to use
in the website and other services.

Schemas are applied through metadata files written in YAML. If you're new to YAML and want to learn
more, see "[Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml)."

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
library:
  id: carbon-react
  name: Carbon React
  description: React implementation of Carbon Components
  demoLinks:
    - type: storybook
      name: Storybook
      action: link
      url: https://react.carbondesignsystem.com
  navData:
    - title: A page
      path: '/a-page.mdx'
    - title: Another page
      items:
        - title: Sub page
          path: '/another-page/sub-page.mdx'
          hidden: true
        - title: Another sub page
          path: '/another-page/another-sub-page.mdx'
assets:
  accordion:
    name: Accordion
    description:
      An accordion is a vertically stacked list of headers that reveal or hide associated sections
      of content.
    status: stable
    type: component
    tags:
      - content-element
      - data-display
    framework: react
    platform: web
    docs:
      usagePath: 'https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/accordion/usage.mdx'
      stylePath: './components/accordion/styles.mdx'
      codePath: './components/accordion/code.mdx'
      accessibilityPath: './components/accordion/accessibility.mdx'
  card:
    name: Card
    type: component
    status:
      key: draft
      note: Additional usage guidance is coming soon.
    framework: react
    platform: web
    description:
      Cards are considered “workhorse” components because of their versatility. They provide
      effective calls to action, and the various designs available work with a wide range of
      content.
```

## Stable schema version

The current supported stable version of the resource schemas is _v1_. You can add the yaml language
server to your YAML files by adding the following line to the top of your files:

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
```

**_Note:_** If you're using VS Code as your editor you may
[install](https://code.visualstudio.com/docs/editor/extension-marketplace) a yaml extension, such as
[YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) for additional
language support.

## Resource schema keys

A resource file can contain a library, an object of assets or both.

| Key       | Description                                                                                              | Required | Type   | Default | Valid values |
| --------- | -------------------------------------------------------------------------------------------------------- | -------- | ------ | ------- | ------------ |
| `library` | Object containing library details. See [library schema](#library-schema) for more info.                  | Optional | Object | –       | –            |
| `assets`  | Object containing one or more assets organized by `id`. See [asset schema](#asset-schema) for more info. | Optional | Object | –       | –            |

## Library schema

Libraries are the means to contribute, install, and use one or many assets in products and digital
experiences. To index your library with Carbon, create a `carbon.yml` metadata file and place it in
the same directory as your library's `package.json` file.

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
library:
  id: carbon-react
  name: Carbon React
  description: React implementation of Carbon Components
  inherits: carbon-styles@0.1.23
  demoLinks:
    - type: storybook
      name: Storybook
      action: link
      url: https://react.carbondesignsystem.com
  navData:
    - title: A page
      path: '/a-page.mdx'
    - title: Another page
      items:
        - title: Sub page
          path: '/another-page/sub-page.mdx'
          hidden: true
        - title: Another sub page
          path: '/another-page/another-sub-page.mdx'
```

### Library keys

| Key               | Description                                                                                                                                                                                                                                                             | Required | Type    | Default                   | Valid values |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ------------------------- | ------------ |
| `id`              | Every library needs an identifier unique to the platform. Contact the [Carbon Platform Devs](https://github.com/orgs/carbon-design-system/teams/carbon-platform-devs) to receive an `id` when registering a new library. See [identifiers](#identifiers) for more info. | Required | String  | –                         | –            |
| `name`            | Library display name. Use title-case capitalization.                                                                                                                                                                                                                    | Required | String  | –                         | –            |
| `description`     | Library description ideally between 50-160 characters in length. Use sentence-case capitalization. Defaults to the `package.json` description if not set here.                                                                                                          | Optional | String  | Value from `package.json` | –            |
| `inherits`        | Inherit properties from another library on a per-asset basis. See [library inheritance](#library-inheritance).                                                                                                                                                          | Optional | String  | –                         | –            |
| `packageJsonPath` | Relative location of the library's `package.json`. This is used to reference the library's license, version, code package, and other information.                                                                                                                       | Optional | String  | `/package.json`           | –            |
| `externalDocsUrl` | Absolute URL to externally-hosted documentation.                                                                                                                                                                                                                        | Optional | String  | –                         | –            |
| `demoLinks`       | Links to demo sites. See [demo links](#demo-links).                                                                                                                                                                                                                     | Optional | Array   | –                         | –            |
| `noIndex`         | If set to `true`, the global catalogs will exclude the library.                                                                                                                                                                                                         | Optional | Boolean | `false`                   | –            |
| `navData`         | Links to documentation pages. See [nav data](#nav-data).                                                                                                                                                                                                                | Optional | Array   | -                         | –            |

#### Library inheritance

Each asset can inherit properties from another asset. For example, if there are multiple
implementations of a component for different JavaScript frameworks, it's common that there's an
underlying library and asset that contains shared usage guidance, design specs, and styling.
Defining the inheritance relationship allows us to have a single source of truth for the shared
content and resources.

There are two requirements for an asset to inherit another asset.

1. The inheriting asset needs its library to specify the `inherits` key with the value being the
   base library's `id` and optionally its version delineated by `@`. E.g. `inherits: carbon-styles`
   or `inherits: carbon-styles@0.1.23`.
1. The asset `id`s need to match between the library and the library that it's inheriting. This is
   used to both inherit schema keys, and also collapse similar assets in the catalogs if no
   framework filter has been set.

After doing so, some asset keys will be inherited by default. See the [asset keys](#asset-keys)
table. If you don't want to inherit something that is inherited by default, you can specifiy the
asset key to override the inherited default.

## Asset schema

Assets are reusable units of work that are used in products and digital experiences. Every asset
belongs to a library.

- For each asset in a library, create a `carbon.yml` metadata file in the same directory as the
  asset's source and place the asset details inside of the `assets` object with the asset `id` as
  the key.
- For directories that contain multiple assets, just add each asset as a singular entry to the
  `assets` object with the asset `id` as the key.

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
assets:
  accordion:
    name: Accordion
    description:
      An accordion is a vertically stacked list of headers that reveal or hide associated sections
      of content.
    status: stable
    type: component
    tags:
      - content-element
      - data-display
    framework: react
    platform: web
    thumbnailPath: /docs/accordion-thumbnail.png
    demoLinks:
      - type: storybook
        name: Storybook
        action: link
        url: https://react.carbondesignsystem.com/?path=/story/components-accordion--accordion
    docs:
      usagePath: 'https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/accordion/usage.mdx'
      stylePath: './components/accordion/styles.mdx'
      codePath: './components/accordion/code.mdx'
      accessibilityPath: './components/accordion/accessibility.mdx'
```

### Asset keys

| Key               | Description                                                                                                                                              | Required | Type             | Inheritable | Default       | Valid values                                                                                                                                                                                                                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------- | ----------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`              | Every asset needs an identifier unique to its library. This is used to associate assets across libraries. See [identifiers](#identifiers) for more info. | Required | String           | No          | –             | –                                                                                                                                                                                                                                                                                                                                          |
| `name`            | Asset display name. Use sentence-case capitalization.                                                                                                    | Required | String           | Yes         | –             | –                                                                                                                                                                                                                                                                                                                                          |
| `description`     | Asset description ideally between 50-160 characters in length. Use sentence-case capitalization.                                                         | Optional | String           | Yes         | –             | –                                                                                                                                                                                                                                                                                                                                          |
| `status`          | Asset consumption exptectations. See [asset status](#asset-status).                                                                                      | Required | String \| Object | No          | `draft`       | `draft`, `experimental`, `stable`, `deprecated`                                                                                                                                                                                                                                                                                            |
| `type`            | Asset primary categorization. See [asset type](#asset-type).                                                                                             | Required | String           | Yes         | –             | `component`, `function`, `pattern`, `template`                                                                                                                                                                                                                                                                                             |
| `tags`            | Asset secondary categorizations. See [asset tags](#component-tags).                                                                                      | Optional | Array            | Yes         | –             | `content-block`, `content-element`, `contextual-navigation`, `data-display`, `data-visualization`, `form`, `input-control`, `media`, `shell`, `structural-navigation`, `system-feedback`, `comparison`, `connection`, `correlation`, `geographic-overlay`, `geospatial-distortion`, `part-to-whole`, `trend`, `hook`, `service`, `utility` |
| `framework`       | Asset primary technology dependency. See [asset framework](#asset-framework).                                                                            | Optional | String           | No          | `design-only` | `angular`, `react`, `react-native`, `svelte`, `vanilla`, `vue`, `web-component`, `design-only`                                                                                                                                                                                                                                             |
| `platform`        | Runtime where the asset can be used. See [asset platform](#asset-platform).                                                                              | Optional | String           | Yes         | `web`         | `cross-platform`, `web`                                                                                                                                                                                                                                                                                                                    |
| `thumbnailPath`   | Relative location of the asset's thumbnail image.                                                                                                        | Optional | String           | Yes         | –             | –                                                                                                                                                                                                                                                                                                                                          |
| `externalDocsUrl` | Absolute URL to externally-hosted documentation.                                                                                                         | Optional | String           | No          | –             | –                                                                                                                                                                                                                                                                                                                                          |
| `demoLinks`       | Links to demo sites. See [demo links](#demos-links).                                                                                                     | Optional | Array            | No          | –             | –                                                                                                                                                                                                                                                                                                                                          |
| `noIndex`         | If set to `true`, the global catalogs will exclude the asset.                                                                                            | Optional | Boolean          | No          | `false`       | –                                                                                                                                                                                                                                                                                                                                          |
| `docs`            | Contains information on where to find supporting documentation for the asset. See [asset docs](#asset-docs).                                             | Optional | Object           | Yes          | -             | –                                                                                                                                                                                                                                                                                                                                          |

#### Asset status

Asset status is used by maintainers to set consumption expectations of stability and the likelihood
of future changes. The `status` key can have the following values:

| Status         | Description                                           |
| -------------- | ----------------------------------------------------- |
| `draft`        | Partially complete and not ready for consumption.     |
| `experimental` | Partially complete, not production ready.             |
| `stable`       | Complete and ready for production use.                |
| `deprecated`   | Will be sunset at a future date, minimally supported. |

Additionally, status can be specified as an object to include a `key` and a `note` that explains the
key. This is often used to communicate the remaining effort to get something from draft or
experimental to stable, estimated stability dates, and alternative assets to use when the asset has
been deprecated.

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
---
status:
  key: experimental
  note: Additional usage guidance is coming soon.
```

#### Asset type

Asset type is used for primary categorization in asset catalogs. The `type` key can have the
following values:

<!-- remove element asset type for first release -->
<!-- | `element` | Styles, tokens, icons, and pictograms that are the direct translation of design language elements to digital mediums. | -->

| Type        | Description                                                                                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `component` | Building blocks that have been designed and coded to solve a specific user interface problem.                                                                                                          |
| `function`  | Code that performs a single action or actions and has no user interface.                                                                                                                               |
| `pattern`   | Best practice solution for how a user achieves a goal through reusable combinations of components and content with sequences and flows which are too complex to be encapsulated in a single component. |
| `template`  | Layout example that specifies patterns and component order and placement to compose a specific view.                                                                                                   |

#### Component tags

Tags organize assets into secondary categories in asset catalogs. An asset can have multiple tags,
and certain tags are only applicable to specific asset types.

These tags can be used when the asset is of type `component`.

| Tag                     | Name                  | Description                                                                                                                                                                |
| ----------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content-block`         | Content block         | Structures content in a way that provides narrative value or organizes multiple self-contained pieces of information.                                                      |
| `content-element`       | Content element       | Simple textual or graphical chunks that can populate the body of a page when used within content layouts.                                                                  |
| `contextual-navigation` | Contextual navigation | Enables either ad-hoc navigation (i.e. link, overflow menu) or navigation between objects that share a relationship (i.e. tag link). Does not implicate site architecture. |
| `data-display`          | Data display          | Organizes and displays data efficiently.                                                                                                                                   |
| `data-visualization`    | Data visualization    | Helps tell accurate and convincing stories around data with beautiful and accessible visualizations.                                                                       |
| `form`                  | Form                  | A group of related input controls that allow users to provide data or configure options.                                                                                   |
| `input-control`         | Input control         | Enables users to interact with an interface.                                                                                                                               |
| `media`                 | Media                 | Displays images and videos.                                                                                                                                                |
| `shell`                 | Shell                 | Defines the visual structure for a user interface.                                                                                                                         |
| `structural-navigation` | Structural navigation | Creates a consistent navigation experience across multiple pages and reveals site architecture. Includes primary, secondary, and tertiary navigation.                      |
| `system-feedback`       | System feedback       | Provides feedback generated by a system to inform users of status, progress, or timely information.                                                                        |

#### Data visualization tags

These additional tags can be used alongside the `data-vizualization` tag.

| Tag                     | Name                  | Description                                                                                                                                                                                                                                   |
| ----------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `comparison`            | Comparison            | Comparison or comparative data visualizations are a type of visualization in which a comparison is made between two or more objects, phenomena or groups of data; these visualizations can offer qualitative and/or quantitative information. |
| `connection`            | Connection            | Connection visualizations show the magnitude and direction of relationships between two or more categorical variables. They’re used in link analysis for identifying relationships between nodes that are not easy to see from the raw data.  |
| `correlation`           | Correlation           | A correlation visualization is a type of graph or mathematical scheme that uses Cartesian coordinates for display values—typically of two variables for a data set.                                                                           |
| `geographic-overlay`    | Geographic overlay    | Geographic overlays are visualizations that show differences in data values across a geographical map. These visualizations focus on the relationship between data and its physical location to create insight.                               |
| `geospatial-distortion` | Geospatial distortion | In a geospatial distortion, the mapping variable takes the place of the land area or distance in the map, causing the map to become distorted in proportion to the substitute variable. The distortion can be geographic or geometric.        |
| `part-to-whole`         | Part-to-whole         | Part-to-whole data visualizations show part (or parts) of a variable to it's total. These visualizations are often used to show how something is divided up.                                                                                  |
| `trend`                 | Trend                 | Trend data visualizations (aka run charts) are used to show trends in data over time. In these visualizations all processes vary, so measurements involving a single point can be misleading.                                                 |

#### Function tags

These additional tags can be used when the asset is of type `function`.

| Tag       | Name    | Description                                                                 | Required framework |
| --------- | ------- | --------------------------------------------------------------------------- | ------------------ |
| `hook`    | Hook    | Uses state and other React features without writing a class.                | `react`            |
| `service` | Service | Invokes a service or orchestration of services and returns a response.      | –                  |
| `utility` | Utility | Returns output that's directly dependent on its input without side effects. | –                  |

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

#### Asset docs

Asset docs is used to determine which supporting documentation is available to fetch and render as
page tabs in the asset details for the asset as well as its location. For each optional document
key, a path should be included; The path **must** be either a Github url according to the
`https://{host}/{org}/{repo}/blob/{branch}/{path-to-file}` format, or a path relative to the
carbon.yml file location.

Currently supported document keys are:

| docKey              | Description                                                                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `usagePath`         | Includes directives on when and how the asset should be used: <br/>- When to use, when not to use it <br/>- How should the asset behave (states, modifiers, variants, etc.)                       |
| `stylePath`         | Information on asset's design spec                                                                                                                                                                |
| `codePath`          | Instructions on how to use the coded implementation of this asset and where additional API info can be found                                                                                      |
| `accessibilityPath` | Additional considerations and guidelines regarding accessibility as it pertains to this asset: <br/> - What does Carbon provide? <br/>- Design recommendations <br/> - Development considerations |

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
---
docs:
  usagePath: 'https://github.com/carbon-design-system/carbon-website/blob/main/src/pages/components/accordion/usage.mdx'
  stylePath: './components/accordion/styles.mdx'
  codePath: './components/accordion/code.mdx'
  accessibilityPath: './components/accordion/accessibility.mdx'
```

## Shared schemas

The following properties are used in multiple schemas.

### Demo links

Libraries and assets can specify links to demo sites.

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
---
demoLinks:
  - type: storybook
    name: Storybook
    action: link
    url: https://react.carbondesignsystem.com
```

For the value of the `demoLinks` array, you can set the following keys.

| Demo link | Description                  | Required | Type   | Default | Valid values                         |
| --------- | ---------------------------- | -------- | ------ | ------- | ------------------------------------ |
| `type`    | Determines the display icon. | Required | String | –       | `codesandbox`, `github`, `storybook` |
| `name`    | Display name.                | Required | String | –       | –                                    |
| `action`  | Determines the action icon.  | Optional | String | `link`  | `download`, `link`                   |
| `url`     | Link to the resource.        | Required | String | –       | –                                    |

### Identifiers

Libraries and assets have `id`s to uniquely identify each resource and establish relationships
between resources. More guidance around format and absolute identifiers coming here soon!

### Nav data

Libraries have documentation pages that are specific to their library. The `navData` array
determines what MDX pages get rendered in the web app, as well as the link order in the nav.

**Example**

carbon.yml

```yml
# yaml-language-server: $schema=https://unpkg.com/@carbon-platform/schemas@v1/carbon-resources.schema.json
---
navData:
  - title: A page
    path: '/a-page.mdx'
  - title: Another page
    items:
      - title: Sub page
        path: '/another-page/sub-page.mdx'
        hidden: true
      - title: Another sub page
        path: '/another-page/another-sub-page.mdx'
```

For the value of the `navData` array, you can set the following keys.

| Nav data | Description                                                  | Required | Type    | Default |
| -------- | ------------------------------------------------------------ | -------- | ------- | ------- |
| `title`  | Navigation title.                                            | Required | String  | –       |
| `path`   | Path to the file, relative to carbon.yml.                    | Required | String  | –       |
| `items`  | Second level of navigation.                                  | Optional | Array   | –       |
| `hidden` | If set to true, the item will be hidden from the navigation. | Optional | Boolean | `false` |
