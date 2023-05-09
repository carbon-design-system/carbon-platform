# td-05 - MDX media mapper

**Status:** Draft 📝

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

> Describe the new feature from a technical perspective.

> Describe the problem solved by this feature.

> Describe how it integrates/relates/communicates with existing features/packages/services.

Problem: 1 - Relative URL images/videos/svgs will not render because we don't have them locally 2 -
We want to use Next/Image because it interacts better with the web app and we get optimization for
free 3 - SVGs straight-up do not work ATM

Solution: Create a [PRIVATE] "mdx-media-mapper" package that exports a plugin that we can inject
into the MDX parser to find and "correct" images & videos, that means: For all images and videos:

- Convert relative urls into absolute URLs (mind security, can't be another repo) - Will need to
  receive the basePath as a parameter to do this - Will need to add `'?raw=true'` to get media
  resource instead of github html contents
- Security: ensure when creating absolute URLS from relative URLs that the base
  (github/[org]/[repo]) stays the same (do not allow changing repos)

For all images:

- Run each image through the placeholder library to generate placeholder base 64-encoded images and
  get image dimensions
- Modify at the AST level so the returned markdown uses Next.js Image component with the placeholder
  props merged in Modify markdown image to accept extra props
- Investigate/Fix if needed:
  [https://github.com/carbon-design-system/carbon-platform/issues/767](https://github.com/carbon-design-system/carbon-platform/issues/767)

This package will be used from the web-app service at the time of string->mdast conversion (in the
mdx parser).

## Assumptions

- [x] Approved?
- We'll build this to work on open-source only (no auth needed) and we can scale it to include
  authorization (maybe inside url with access tokens) in later versions.

## Research

- [x] Approved?

- **Unanswered questions**   -  Will we be able to render SVGs (Re: issue #767)? Assuming yes, just
  need to take a closer look into why it's not rendering and if it's fixed by just the image mapper
  at all.   - Design: how do we show "this image/video is considered dangerous due to its url....."
  type thing?   - Will onError, onLoad definitely be cleared out? if not how should we handle it?
- **New technologies**
  - unist-util-remove:  \*\*Only if we need to remove tree nodes (e.g.: dangerous images)
  - plaiceholder: gives us image blurs
  - unist-util-visit: Find nodes in tree that meet certain criteria (i.e.: images, videos.)
- **Proofs of concept**   - Working POC:
  [https://github.com/carbon-design-system/carbon-platform/pull/739](https://github.com/carbon-design-system/carbon-platform/pull/739/files)
    - Plaiceholder implementation with remote images POC:
  [https://github.com/carbon-design-system/carbon-platform/pull/551](https://github.com/carbon-design-system/carbon-platform/pull/551)

## UI/UX design

- [x] Approved?

Does this feature have any associated UI/UX? If so, describe any design that needs to be
completed/red-lined prior to development. -- TBD:

- unsupported url error.

## APIs

- [x] Approved?

- **Programmatic APIs**   - List any APIs that will be developed and made available in the
  `@carbon-platform/api` package,     including function/class/method names, parameters, and return
  values. --
  - @carbon-platform/api/mdx-media-mapper Exports: - mdxMediaMapperPlugin(basePath): Function
    (mdxPlugin type)
- **Data graph**   - N/A
- **Messages**   - N/A

## Security

- [x] Approved?

What new data is created/stored/collected/transmitted by this feature? How is that data secured? Who
is allowed to access it? How is that access controlled?

## Think like a hacker. How might someone attempt to break or abuse this feature?

- Potential dangerous image relative URLs: we can use the `urlsMatch` function in
  services/web-app/utils/url to compare the baseUrl vs the resulting url to discriminate against a
  good and bad url and then handle it appropriately.
- embedding malicious code on image/image metadata: - Tried image with onerror, onload function that
  would trigger alerts
  ([https://github.com/francinelucca/mdx-testing/blob/main/test-img.mdx](https://github.com/francinelucca/mdx-testing/blob/main/test-img.mdx))
  but look like next-mdx-remote is clearing those out: - (these could also be a result of Next/Image
  clearing those events, see comment on
  [https://github.com/carbon-design-system/carbon-platform/blob/1a35534bdba33f160d40bc6941538d9824881433/services/web-app/components/asset-catalog-item/asset-catalog-item.js#L28](https://github.com/carbon-design-system/carbon-platform/blob/1a35534bdba33f160d40bc6941538d9824881433/services/web-app/components/asset-catalog-item/asset-catalog-item.js#L28))
  <img width="418" alt="image" src="https://user-images.githubusercontent.com/40550942/178060265-a7514dc5-acdf-4de0-86a7-7e8f5794f1aa.png">

- Really large files can slow down the website. - We're going to assume this risk at the moment.
  This is not an issue that we're seeing currently with any media in platform and a really large
  image/video would only slow down the particular page (route) where that image is being displayed
  and shouldn't affect any other parts of the web application since we're not serving those files
  ourselves, they're remote files. Currently, all content loaded into platform comes from a library
  that is explicitly declared in our allow-list so there's a certain sense of trust. We can address
  this in the future if it ever becomes a problem. For example:

  - Could use something like
    [https://bitexperts.com/Question/Detail/3316/determine-file-size-in-javascript-without-downloading-a-file](https://bitexperts.com/Question/Detail/3316/determine-file-size-in-javascript-without-downloading-a-file)
    obtain file size and have a size cap to the media? (this would add an extra request for every
    single image/video…)

- The remote url could link to a resource with malicious code, I don’t think there’s anything we can
  do about that, see first answer:
  [https://stackoverflow.com/questions/3114301/can-something-bad-happen-via-img-src](https://stackoverflow.com/questions/3114301/can-something-bad-happen-via-img-src)

## Error handling

- [x] Approved?

Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
through the APIs? How will users be informed about these errors? --

- Image not found: we can go-by without handling this, it's a user error, just make sure the plugin
  doesn't break

## Test strategy

- [x] Approved?

How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
etc.)

## What interesting edge cases should be considered and tested?

Will use monorepo's standard testing library, 'ava' to test with a remote test repository (will need
to construct) with test images/videos/files

- Relative src images/videos
- Absolute src images/videos
- SVG, JPEG/JPG, PNG, GIF
- Image Not Found (just expect the plugin not to break)
- Malicious URL

Parse remote files into MDAST, use mdxMediaMapper to "map" content, then manually "visit" the
resulting tree to confirm what was expected to be added/removed happened successfully.

## Logging

- [x] Approved?

> Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature. We're
> thinking not much info generated worth logging here, get the team's perspective on this when we
> play it back.

## File and code layout

- [x] Approved?

> Describe how the files and code for this feature will fit into the rest of the mono repo. Will
> there be a new package/service? Are there existing files/directories in which the new logic should
> live?

---

- packages/api/mdx-sanitizer
  - /src/
    - main/
      - mdx-media-mapper-plugin.js (entry point)
    - test/
      - mdx-media-mapper-plugin.test.js
      - test-files/\*

## Issue and work breakdown

- [x] Approved?

> List any issues that should be created prior to starting work on this feature

- **Epics**
  - MdxMediaMapper
- **Issues**
  - Design: malicious url UI
  - Create MdxMediaMapper package
  - Test repo + Data
  - Test MdxMediaMapper plugin
  - SVGs not working: 
    [https://github.com/carbon-design-system/carbon-platform/issues/767](https://github.com/carbon-design-system/carbon-platform/issues/767)
