# td-08 - RMDX (Remote MDX)

**Status:** Approved ✅

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

This feature describes the usage of remote mdx in a secure way that is not vulnerable to code
injection and arbitrary code execution (ACE) attacks. This will supersede existing MDX processing
and provide stricter parsing and rendering. This means less overall customization, but a
significantly more secure implementation.

RMDX will be used in two places:

1. A microservice (called `rmdx-processing`) which can translate source MDX into a sanitized
   abstract syntax tree (AST), similar to that which would be retrieved from a CMS API such as
   Contentful.
2. A set of utility React components and functions that can be used to render a sanitized AST as a
   set of react components.

The set of components rendered via the RMDX utilities is not defined as part of this tech design,
and is instead expected to be provided as a "map" to the utility (additional details below). Having
the interface act as a mapping will allow any arbitrary set of components to be used during
translation.

The goal is to have the RMDX utilities generate an AST that is as close to the Contentful data model
as possible. This will make migration between the two as easy as possible.

The maximum input size of MDX will be 1 MB. Output size may end up larger than this, but will remain
under the RabbitMQ message threshold of 128 MB.

## Research

- [x] Approved?

https://app.mural.co/t/ibm14/m/ibm14/1667230506318/3c007d2b56bfc0b1c820e15d7d946285da5ae4a2?sender=jdharvey8136

https://github.com/contentful/rich-text/tree/master/packages/rich-text-types

#1073

**Unanswered questions**

None

**New technologies**

None

**Proofs of concept**

- [x] Go from mdx -> mdast -> JSON -> react components
  - This works as expected (see mural for details)

## UI/UX design

- [x] Approved?

None

## APIs

- [x] Approved?

**Programmatic APIs**

New package: `rmdx`

This will export the utilities for converting to and working with the MDX-based AST.

`process(srcMdx: string): AST` - Returns an RMDX AST given an input string

`<RmdxNode components={...} ast={...} />` - React component which takes an RMDX AST as input along
with a `components` map, which maps AST node types to React components for rendering. The mapped
components are given `children` to render as well as any relevant scalar props from the source MDX.

**Data graph**

There will eventually be an `rmdx` resolver for asset doc pages, however since there is not yet an
asset resolver, this will probably be deferred until later.

**Messages**

**query**: `rmdx` A request/response based message to get a processed RMDX result, given an input
string of raw MDX source

```ts
// query message
interface RmdxMessage {
  srcMdx: string // Max size = 1 MB
}

interface RmdxResponse {
  ast: Node<Data> // Either a unist tree or a custom AST similar to Contentful's model
  errors: Array<?> // List of errors encountered during processing
}
```

**Future**: Should eventually respond to an `asset_discovered` message by pre-caching processed RMDX
in an LRU cache.

## Security

- [x] Approved?

**MDX things that will not work under RMDX:**

- Inline JSX blocks (outside of components)
- Imports/exports/variable assignments
- Properties on JSX elements which are not a number, boolean, or string (i.e. no functions, arrays,
  or objects)

## Error handling

- [x] Approved?

Error handling should have feature parity with existing mdx processing.

TODO: Need to figure out the best approach for transmitting errors back to the caller. Tentative
approach: Errors in the returned list of errors are numbered, and there are AST nodes in the
returned RMDX which call out particular error numbers (and types), so knowing what to render is
accomplished via a "lookup map".

example:

```json
{
  "ast": [
    {
      "nodeType": "h1",
      "value": "this is a header"
    },
    {
      "nodeType": "Error",
      "errorIndex": 0
    }
  ],
  "errors": [
    {
      "exception": "ImportFoundException",
      "line": 123,
      "text": "import thing from 'thing'"
    }
  ]
}
```

`const error = theErrorrmdx.errors[0]`

## Test strategy

- [x] Approved?

> How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
> etc.) What interesting edge cases should be considered and tested?

76+% unit test coverage of all new code.

Test existing known MDX exploits to ensure they can't be performed against RMDX

## Logging

- [x] Approved?

- Log incoming requests to process MDX
- Log processing failures
- Warn log when encountering portions of MDX that need to be removed for security reasons

## File and code layout

- [x] Approved?

Rough file layout:

- packages
  - api
    - rmdx-processing
      - RmdxMessage
      - RmdxResponse
      - query_rmdx
  - rmdx
    - `process`
    - `RmdxNode`
- services
  - rmdx-processing
    - rmdx-controller
    - rmdx-service

## Issue and work breakdown

- [x] Approved?

**Epics**

- #1491

**Issues**

- #1492
- #1493
- #1494
- #1495
- #1496
