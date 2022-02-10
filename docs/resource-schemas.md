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
id: carbon-react
name: Carbon React
description: React implementation of Carbon Components
demoLinks:
  - type: storybook
    name: Storybook
    action: link
    url: https://react.carbondesignsystem.com
```

### Library keys

<!-- prettier-ignore -->
| Key| Description | Required | Type | Default | Valid values |
| --- | --- | --- | --- | --- | --- |
| `id` | Every library needs an identifier unique to the platform. Contact the [Carbon Platform Devs](https://github.com/orgs/carbon-design-system/teams/carbon-platform-devs) to receive an `id` when registering a new library. | Required | String | – | – |
| `name` | Library display name. Use title-case capitalization. | Required | String | – | – |
| `description` | Library description ideally between 50-160 characters in length. Use sentence-case capitalization. Defaults to the `package.json` description if not set here. | Optional | String | Value from `package.json` | – |
| `packageJsonPath` | Relative location of the library's `package.json`. This is used to reference the library's license, version, code package, and other information. | Optional | String | `/package.json` | – |
| `externalDocsUrl` | Absolute URL to externally-hosted documentation. | Optional | String | – | – |
| `demoLinks` | Links to demo sites. See [demo links](#demo-links). | Optional | Array | – | – |
| `private` | If set to `true`, the global catalogs will exclude the library. | Optional | Boolean | `false` | – |

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
```

### Asset keys

<!-- prettier-ignore -->
| Key | Description | Required | Type | Default | Valid values |
| --- | --- | --- | --- | --- | --- |
| `id` | Every asset needs an identifier unique to its library. This is used to associate assets across libraries. | Required | String | – | – |
| `name` | Asset display name. Use sentence-case capitalization. | Required | String | – | – |
| `description` | Asset description ideally between 50-160 characters in length. Use sentence-case capitalization. | Required | String | – | – |
| `status` | Asset consumption exptectations. See [asset status](#asset-status). | Required | String \| Object | `draft` | `draft`, `experimental`, `stable`, `deprecated` |
| `type` | Asset primary categorization. See [asset type](#asset-type). | Required | String | – | `component`, `element`, `function`, `pattern`, `template` |
| `tags` | Asset secondary categorizations. See [asset tags](#asset-tags). | Optional | Array | – | `content-block`, `content-element`, `contextual-navigation`, `data-display`, `data-visualization`, `form`, `input-control`, `media`, `shell`, `structural-navigation`, `system-feedback`, `comparison`, `connection`, `correlation`, `geographic-overlay`, `geospatial-distortion`, `part-to-whole`, `trend`, `hook`, `service`, `utility` |
| `framework` | Asset primary technology dependency. See [asset framework](#asset-framework). | Optional | String | `design-only` | `angular`, `react`, `react-native`, `svelte`, `vanilla`, `vue`, `web-component`, `design-only` |
| `platform` | Runtime where the asset can be used. See [asset platform](#asset-platform). | Optional | String | `web` | `cross-platform`, `web` |
| `thumbnailPath` | Relative location of the asset's thumbnail image. | Optional | String | – | – |
| `externalDocsUrl` | Absolute URL to externally-hosted documentation. | Optional | String | – | – |
| `demoLinks` | Links to demo sites. See [demo links](#demos-links). | Optional | Array | – | – |
| `inherits` | See [asset inheritance](#asset-inheritance). | Optional | Object | – | – |
| `private` | If set to `true`, the global catalogs will exclude the asset. | Optional | Boolean | `false` | – |

#### Asset status

Asset status is used by maintainers to set consumption expectations of stability and the likelihood
of future changes. The `status` key can have the following values:

<!-- prettier-ignore -->
| Status | Description |
| --- | --- |
| `draft` | Partially complete and not ready for consumption. |
| `experimental` | Partially complete, not production ready. |
| `stable` | Complete and ready for production use. |
| `deprecated` | Will be sunset at a future date, minimally supported. |

Additionally, status can be specified as an object to include a `key` and a `note` that explains the
key. This is often used to communicate the remaining effort to get something from draft or
experimental to stable, estimated stability dates, and alternative assets to use when the asset has
been deprecated.

**Example**

```yml
status:
  key: experimental
  note: Additional usage guidance is coming soon.
```

#### Asset type

Asset type is used for primary categorization in asset catalogs. The `type` key can have the
following values:

<!-- prettier-ignore -->
| Type | Description |
| --- | --- |
| `component` | Building blocks that have been designed and coded to solve a specific user interface problem. |
| `element` | Styles, tokens, icons, and pictograms that are the direct translation of design language elements to digital mediums. |
| `function` | Code that performs a single action or actions and has no user interface. |
| `pattern` | Best practice solution for how a user achieves a goal through reusable combinations of components and content with sequences and flows which are too complex to be encapsulated in a single component. |
| `template` | Layout example that specifies patterns and component order and placement to compose a specific view. |

#### Asset tags

Tags organize assets into secondary categories in asset catalogs. An asset can have multiple tags,
and certain tags are only applicable to specific asset types.

<!-- prettier-ignore -->
| Tag | Name | Description |
| --- | --- | --- |
| `content-block` | Content block | Structures content in a way that provides narrative value or organizes multiple self-contained pieces of information. |
| `content-element` | Content element | Simple textual or graphical chunks that can populate the body of a page when used within content layouts. |
| `contextual-navigation` | Contextual navigation | Enables either ad-hoc navigation (i.e. link, overflow menu) or navigation between objects that share a relationship (i.e. tag link). Does not implicate site architecture. |
| `data-display` | Data display | Organizes and displays data efficiently. |
| `data-visualization` | Data visualization | Helps tell accurate and convincing stories around data with beautiful and accessible visualizations. |
| `form` | Form | A group of related input controls that allow users to provide data or configure options. |
| `input-control` | Input control | Enables users to interact with an interface. |
| `media` | Media | Displays images and videos. |
| `shell` | Shell | Defines the visual structure for a user interface. |
| `structural-navigation` | Structural navigation | Creates a consistent navigation experience across multiple pages and reveals site architecture. Includes primary, secondary, and tertiary navigation. |
| `system-feedback` | System feedback | Provides feedback generated by a system to inform users of status, progress, or timely information. |

#### Data visualization tags

These additional tags can be used alongside the `data-vizualization` tag.

<!-- prettier-ignore -->
| Tag | Name | Description |
| --- | --- | --- |
| `comparison` | Comparison | Comparison or comparative data visualizations are a type of visualization in which a comparison is made between two or more objects, phenomena or groups of data; these visualizations can offer qualitative and/or quantitative information. |
| `connection` | Connection | Connection visualizations show the magnitude and direction of relationships between two or more categorical variables. They’re used in link analysis for identifying relationships between nodes that are not easy to see from the raw data. |
| `correlation` | Correlation | A correlation visualization is a type of graph or mathematical scheme that uses Cartesian coordinates for display values—typically of two variables for a data set. |
| `geographic-overlay` | Geographic overlay | Geographic overlays are visualizations that show differences in data values across a geographical map. These visualizations focus on the relationship between data and its physical location to create insight. |
| `geospatial-distortion` | Geospatial distortion | In a geospatial distortion, the mapping variable takes the place of the land area or distance in the map, causing the map to become distorted in proportion to the substitute variable. The distortion can be geographic or geometric. |
| `part-to-whole` | Part-to-whole | Part-to-whole data visualizations show part (or parts) of a variable to it's total. These visualizations are often used to show how something is divided up. |
| `trend` | Trend | Trend data visualizations (aka run charts) are used to show trends in data over time. In these visualizations all processes vary, so measurements involving a single point can be misleading. |

#### Function tags

These additional tags can be used when the asset is of type `function`.

<!-- prettier-ignore -->
| Tag | Name | Description | Required framework |
| --- | --- | --- | --- |
| `hook` | Hook | Uses state and other React features without writing a class. | `react` |
| `service` | Service | Invokes a service or orchestration of services and returns a response. | – |
| `utility` | Utility | Returns output that's directly dependent on its input without side effects. | – |

#### Asset framework

Asset framework specifies if each asset has a dependency on being used alongside a specific
technology. The `framework` key can have the following values:

<!-- prettier-ignore -->
| Status | Description |
| --- | --- |
| `angular` | [Angular](https://angular.io) |
| `react` | [React](https://reactjs.org) |
| `react-native` | [React Native](https://reactnative.dev) |
| `svelte` | [Svelte](https://svelte.dev) |
| `vanilla` | JavaScript with no framework. |
| `vue` | [Vue](https://vuejs.org) |
| `web-component` | Custom HTML tags build with web platform APIs. |
| `design-only` | No coded implementation. |

#### Asset platform

Asset platform specifies supported runtimes and where each asset can be used. The `platform` key can
have the following values:

<!-- prettier-ignore -->
| Status | Description |
| --- | --- |
| `cross-platform` | Runs natively on iOS, Android, and/or desktop. |
| `web` | Runs on the web. |

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

<!-- prettier-ignore -->
| Inherits | Description | Required | Type | Default |
| --- | --- | --- | --- | --- |
| `asset` | Fully qualified asset name with the format `[library id]/[asset id]` or `[library id]@[repo ref]/[asset id]`. | Required | String | – |
| `primary` | Set to `true` if this asset inheriting another asset is the canonical implementation. This is used to collapse similar assets in the catalogs when a `framework` filter has not been applied. | Optional | Boolean | `false` |
| `properties` | Asset keys to inherit. | Required | Array | – |

**Example**

```yml
id: accordion
inherits:
  asset: 'carbon-styles@v11.0.3/accordion'
  properties:
    - name
    - description
    - thumbnailPath
    - type
    - platform
status: stable
framework: react
```

## Shared schemas

The following properties are used in multiple schemas.

#### Demo links

Libraries and assets can specify links to demo sites.

**Example**

```yml
demoLinks:
  - type: storybook
    name: Storybook
    action: link
    url: https://react.carbondesignsystem.com
```

For the value of the `demoLinks` array, you can set the following keys.

<!-- prettier-ignore -->
| Demo link | Description | Required | Type | Default | Valid values |
| --- | --- | --- | --- | --- | --- |
| `type` | Determines the display icon. | Required | String | – | `codesandbox`, `github`, `storybook` |
| `name` | Display name. | Required | String | – | – |
| `action` | Determines the action icon. | Optional | String | `link` | `download`, `link` |
| `url` | Link to the resource. | Required | String | – | – |
