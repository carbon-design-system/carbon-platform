# td-03 - Add $refs to schema resources

**Status:** Approved ✅

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

> Describe the new feature from a technical perspective.

Carbon Platform has a
[resource schema](https://github.com/carbon-design-system/carbon-platform/blob/main/docs/resource-schemas.md).
There are scenarios where we need to establish relationships among resources through the schema.
Right now, we're relying on
[library inheritance](https://github.com/carbon-design-system/carbon-platform/blob/main/docs/resource-schemas.md#library-inheritance)
keys like `inherits: carbon-styles` or `inherits: carbon-styles@0.1.23` and then asset `id`
matching. Next, we need to establish relationships between libraries and design kits, and there
might be a better way to do this than cross-referencing resource `id`s.

If we add `$ref` support to our schema, our `carbon.yml` in its full form could look like:

```yml
libraries:
  test:
    name: Test Library
    description: This is a test library.
    assets:
      nested:
        name: Nested asset
        description: This asset is defined in the library.
        status: stable
        type: component
        platform: web
      reference-local:
        $ref: '#/assets/reference-local'
      reference-local-subdirectory:
        $ref: 'components/my-component/carbon.yml#/assets/reference-local-subdirectory'
      reference-absolute:
        $ref: 'https://gist.githubusercontent.com/mattrosno/da6e10a986139512f372ed81694b17ce/raw/8312abd7f322ec009cd4ddeb9f2714ebf5cae9b2/carbon.yml#/assets/reference-absolute'
    designKits:
      carbon-white-sketch:
        $ref: '#/designKits/carbon-white-sketch'
assets:
  reference-local:
    name: Reference local asset
    description: This asset is defined in the assets array and referenced in the library.
    status: stable
    type: component
    platform: web
designKits:
  carbon-white-sketch:
    name: Sketch white theme
    tool: sketch
    type: ui
    status: stable
    url: sketch://add-library/cloud/557b75ff-67d3-41ab-ada5-fa25447218c1
    action: link
    sponsor: carbon
```

With this:

- A single Carbon config file could describe one resource, or multiple resources
- With the top-level keys being `libraries`, `assets`, `designKits`, we can still validate the
  schema
- There's no need to use GitHub APIs to crawl GitHub repository subdirectories to find all assets in
  a library; the Carbon configs are more explicit thus more understandable of what they do
- The `assets` object can be top-level, or nested in a library, to prevent unnecessary `$ref`s
- `$ref`s can be local to the YML file, relative to its repository, or absolute
- There's no need for the `carbon-styles@0.1.23` syntax for inheritance; when using an absolute
  `$ref` URL, simply use the GitHub URL that includes the desired version
  `https://raw.githubusercontent.com/carbon-design-system/carbon/v11.6.0/packages/styles/carbon.yml`
- When indexing your resources, there's less ambiguity because you don't have to guess what assets
  are in `carbon-styles@0.1.23`, you can CMD-click that URL above in VSCode to view the reference
  schema in full

> Describe the problem solved by this feature.

The idea of using `$ref`s came up with determine what to do with design kits. We need to index
design kits, and then reference compatible design kits on a per-library basis. We can index design
kits within the platform repository, and then use that as the single source of truth when indexing
libraries in their remote repositories... but that doesn't really scale. What happens when we want
to index design kits elsewhere and let other maintaining library teams reference those design kits?

A more deterministic indexing approach both simplifies platform logic and makes indexing more
understandable for library, asset, and design kit contributors.

> Describe how it integrates/relates/communicates with existing features/packages/services.

This would likely result in v2 of our schema as a breaking change, so we'd need to consider the
added complexity of that.

## Research

- [x] Approved?

> Unanswered questions

- Would this require a breaking change and a schema v2?
  - We could do this in two phases where the first phase in a normal feature release adding
    `designKits` with references in libraries. The second phase could be the `library` to
    `libraries` change as well as any `assets` changes.
- What are our options to handle a breaking change? Do we need to support a v1? I'm guessing yes
  because even though we could synchronize updating all currently indexed resources, but prior
  resource versions will still be using the v1 schema.
  - We'll need to support v1 schema still, when we introduce breaking changes, in phase 2.
- What does this mean for cached GitHub responses?
  - Because `@apidevtools/json-schema-ref-parser`
    [resolves its own HTTP responses](https://github.com/APIDevTools/json-schema-ref-parser/blob/main/lib/resolvers/http.js#L141)
    when fetching schemas via absolute URLs, that means we'd likely want to cache the `carbon.yml`
    data after it's been ran through the JSON $Ref Parser.
- What about when we're indexing a `carbon.yml` from GitHub Enterprise and we're resolving remote
  URLs on GitHub Enterprise through `@apidevtools/json-schema-ref-parser` - will we have to add
  authentication to those requests?
  - Yes, it appears there are options to pass authentication (via headers?) when dereferencing.

> New technologies

- `@apidevtools/json-schema-ref-parser` requires a newer version of npm than 8.5.5. I had to update
  node from 16.15.0 to 16.15.1 to get npm 8.11.0. Is that okay?

> Proofs of concept

https://github.com/carbon-design-system/carbon-platform/pull/934

## UI/UX design

- [x] Approved?

> Does this feature have any associated UI/UX? If so, describe any design that needs to be
> completed/red-lined prior to development.

No

## APIs

- [x] Approved?

Adding Carbon config files (via the schema) to the data graph needs to happen regardless of the
schema supporting refs or not, so any API changes are out of scope for this issue.

**Programmatic APIs**

> List any APIs that will be developed and made available in the `@carbon-platform/api` package,
> including function/class/method names, parameters, and return values.

None

**Data graph**

> List any new query resolvers and/or data models being included in the data-graph and/or data-graph
> API package.

None

**Messages**

> List any new/changed RabbitMQ messages introduced by this feature, the message payload structure
> associated with them, whether they are queries or emits, and their expected return values (for
> queries).

None

## Security

- [x] Approved?

> What new data is created/stored/collected/transmitted by this feature? How is that data secured?
> Who is allowed to access it? How is that access controlled?

No change

> Think like a hacker. How might someone attempt to break or abuse this feature?

Consider using our `urlsMatch` utility to prevent malicious reference paths like `../`, etc. This
can be done in the "Resolve schema references with validation and error handling" issue.

## Error handling

- [x] Approved?

> Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
> through the APIs? How will users be informed about these errors?

`$ref`s can be invalid due to improper syntax, paths, and URLs. Like our current schema validation,
we can discard invalid resources to ensure high data integrity.

## Test strategy

- [x] Approved?

> How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
> etc.)

We don't currently have a testing strategy for the web app. For phase 1, we should consider just
manual verification, and in phase 2 that incorporates the breaking changes, add test to ensure both
schema v1 and v2 work as expected.

> What interesting edge cases should be considered and tested?

If phase 1 is just design kits, let's test for:

- All four forms of reference (inline [no reference], local, local different file, absolute URL)
- Broken references (invalid reference syntax, invalid reference paths, invalid reference YML)

Phase 2 testing would primarily be regression testing.

## Logging

- [x] Approved?

> Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature.

- Log errors/warning if YAML fails to parse (see error handling)
- Ensure validation correctly logs skipped items, validation errors

## File and code layout

- [x] Approved?

> Describe how the files and code for this feature will fit into the rest of the mono repo. Will
> there be a new package/service? Are there existing files/directories in which the new logic should
> live?

`github.js` is still a good source code destination for this in phase 1, and we consider moving some
of this to a different web app library file (`/lib` directory), or package in phase 2.

## Issue and work breakdown

- [x] Approved?

> List any issues that should be created prior to starting work on this feature.

This could be broken into two phases, where the first phase is enough to unblock design kits for v1,
and the second phase could be after v1 as a breaking change.

**Phase I**

- [x] Add `designKits` as a top-level and nested schema key, with libraries having `designKits`
      references, and add to the JSON schema
- [x] #970
- [x] #971
- [x] #972

**Phase II**

- [ ] Resolve schema references for GitHub Enterprise URLs
- [ ] Refactor library inheritance to use a reference instead of our `library-id@version` identifier
- [ ] Allow `assets` to be both top-level and also nested in a library
- [ ] Replace crawling GitHub trees to find assets in a library with assets living in a library
      (direct or via reference)
- [ ] Update `library` to `libraries` top-level schema key
- [ ] Retain schema v1 deprecated functionality
- [ ] Publish a v2 schema and update documentation
- [ ] Get inherited library version by fetching the `package.json` from that inherited library
- [ ] Add tests for schema parsing and dereferencing
- [ ] Update docs to reference v2 instead of v1, and link to v1 docs for backwards compatibility
