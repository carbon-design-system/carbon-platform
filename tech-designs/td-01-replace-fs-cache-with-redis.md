# td-01 - Replace fs-cache with redis

**Status:** Canceled 🚫

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

The web app uses a [Node.js cache-manager](https://www.npmjs.com/package/cache-manager) to cache all
GitHub responses to prevent the web app from getting GitHub API rate limited. These GitHub requests
vary from fetching repository information, traversing GitHub trees, to primarily fetching GitHub
file content to read carbon.yml files and MDX files for web page content.

We're currently using a file system store engine
(https://www.npmjs.com/package/cache-manager-fs-hash), which was chosen during v1 preview
prototyping as a quick and easy way to prevent GitHub API rate limits.

As we index more content (asset documentation pages), each GitHub request per MDX file adds to the
amount of cached responses. Our current build pipeline does not persist cached files written to disk
between builds.

As the amount of indexed content grows, so does the risk of our production GitHub access tokens
getting rate limited which could leave us with a production environment void of all content.

**Potential solution**

To mitigate that risk, until we can create proper back-end services for this, what if we added Redis
stores for staging and production? It looks like we could use a Redis store listed here:
https://github.com/BryanDonovan/node-cache-manager#store-engines

Those Redis store engines _should_ share the same API as `cache-manager-fs-hash`, so that _should_
require minimal web app changes.

We could keep the
[1 hour TTL](https://github.com/carbon-design-system/carbon-platform/blob/main/services/web-app/lib/file-cache.js#L24)
for cached responses, so for Next.js ISR pages, content from GitHub would be at most 1 hour stale.

With a Redis cache, our production builds should be faster because there's a greater chance of a
cache hit.

We could use a Redis cache for local development too, or for simplicity, keep that with the current
file system cache.

**TL;DR:**

In the event that our production environment gets rate limited by GitHub, because the Redis cache
would be persisted, we wouldn't lose web app content between deploys. Also, it would be neat to see
how many keys would get cached in Redis, to give us a better idea of to-be infrastructure needs to
manage GitHub content.

TODO: vv Everything below this vv

## Research

- [ ] Approved?

- **Unanswered questions**
  - List any unknowns and unanswered questions that need answers prior to beginning development
- **New technologies**
  - List new technologies that need to be explored in detail before beginning development
- **Proofs of concept**
  - List proofs of concept that need to be completed before beginning development

## UI/UX design

Does this feature have any associated UI/UX? If so, describe any design that needs to be
completed/red-lined prior to development.

## APIs

- [ ] Approved?

- **Programmatic APIs**
  - List any APIs that will be developed and made available in the `@carbon-platform/api` package,
    including function/class/method names, parameters, and return values.
- **Messages**
  - List any new/changed RabbitMQ messages introduced by this feature, the message payload structure
    associated with them, whether they are queries or emits, and their expected return values (for
    queries).

## Test strategy

- [ ] Approved?

How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
etc.)

What interesting edge cases should be considered and tested?

## Security

- [ ] Approved?

What new data is created/stored/collected/transmitted by this feature? How is that data secured? Who
is allowed to access it? How is that access controlled?

Think like a hacker. How might someone attempt to break or abuse this feature?

## Error handling

Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
through the APIs? How will users be informed about these errors?

## Logging

- [ ] Approved?

Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature.

## File and code layout

- [ ] Approved?

Describe how the files and code for this feature will fit into the rest of the mono repo. Will there
be a new package/service? Are there existing files/directories in which the new logic should live?

## Issue and work breakdown

- [ ] Approved?

List any issues that should be created prior to starting work on this feature

- **Epics**
  - ...
- **Issues**
  - ...
