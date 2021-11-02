---
title: Resource schemas
---

# Resource schemas

Carbon Design System resources such as standards and assets follow a schema to document each
resource in a standardized way. This structured information is indexed by Carbon's platform to use
in Carbon's website and other services.

Schemas are applied through metadata files written in YAML. If you're new to YAML and want to learn
more, see "[Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml)."

## Library schema

Libraries are the means to contribute, install, and use one or many assets. To index your library
with Carbon, create a `carbon-library.yml` metadata file and place it in the same directory as your
library's `package.json` file.

**Example**

```yml
name: Carbon React
description: React implementation of Carbon Components.
```

### Library keys

| Key               | Description                                                                                                                    | Required | Type   | Default         | Valid values |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | ------ | --------------- | ------------ |
| `name`            | Library display name. Use title-case capitalization.                                                                           | Required | String | –               | –            |
| `description`     | Library description ideally between 50-160 characters in length. Use sentence-case capitalization.                             | Required | String | –               | –            |
| `packageJsonPath` | Relative location of the library's `package.json`. This is used to reference the library's license, version, and code package. | Optional | String | `/package.json` | –            |

## Asset schema

Assets are reusable units of work that are integrated into products and digital experiences. For
each asset in a library, create a `carbon-asset.yml` metadata file in the same directory as its
source.

**Example**

```yml
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

| Key             | Description                                                                                      | Required | Type   | Default       | Valid values                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------ | -------- | ------ | ------------- | ---------------------------------------------------------------------------------------------- |
| `name`          | Asset display name. Use sentence-case capitalization.                                            | Required | String | –             | –                                                                                              |
| `description`   | Asset description ideally between 50-160 characters in length. Use sentence-case capitalization. | Required | String | –             | –                                                                                              |
| `thumbnailPath` | Relative location of the asset's thumbnail image.                                                | Optional | String | –             | –                                                                                              |
| `status`        | Used to set consumption exptectations.                                                           | Required | String | `draft`       | `draft`, `experimental`, `stable`, `deprecated`, `sunset`                                      |
| `type`          | Asset type.                                                                                      | Required | String | –             | `element`, `component`, `pattern`, `function`, `layout`                                        |
| `framework`     | Asset framework.                                                                                 | Required | String | `design-only` | `angular`, `react`, `react-native`, `svelte`, `vanilla`, `vue`, `web-component`, `design-only` |
| `platform`      | Asset environment.                                                                               | Required | String | `web`         | `android`, `desktop`, `ios`, `web`                                                             |
