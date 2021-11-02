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

To index your library with Carbon, create a `carbon-library.yml` metadata file and place it in the
same directory as your library's `package.json` file.

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
