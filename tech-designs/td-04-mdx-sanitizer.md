# td-04 - MDX sanitizer

**Status:** Approved ✅

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

> Describe the new feature from a technical perspective.

> Describe the problem solved by this feature.

> Describe how it integrates/relates/communicates with existing features/packages/services.

Currently remotely loaded MDX pages might error out or break the application for a number of
reasons:

- Component used that is not recognized by the platform (regardless of whether or not it has a
  corresponding import)
- An import (or export) statement being used (we don't allow any)
- A usage of an imported value someplace in the mdx
- Inline styles that are strings instead of objects
- Inclusion of HTML comments
- General Markdown parsing errors

The idea is to catch these occurrences and handle them before they get to the top-level and error
out.

### Expected Solution Behavior:

1 - Unknown Components have to be swapped out with an inline error:
<img width="1119" alt="image" src="https://user-images.githubusercontent.com/40550942/180481576-d54c8a1c-99ae-4c45-a690-5380b41ac2b7.png">

2 - Imports and Exports statements will replace the entire content with a Full Page Error:
<img width="1114" alt="image" src="https://user-images.githubusercontent.com/40550942/180481760-4ea7be4a-6275-406e-a755-7a76ce2be33f.png">

3 - MDX files with HTML comments have to be able to render 4 - Script tags cannot be executed.
Instead, an inline error notification will be rendered to display information on it along with a
code snipped containing the script code. The rest of the mdx content should be able to render
<img width="831" alt="image" src="https://user-images.githubusercontent.com/40550942/180482504-ff45867b-7510-4385-b1b0-16eacb5c1d59.png">

5 - If an error occurs when trying to serialize MDX content other than the ones outlined above,
display a "Error compiling MDX" inline error:
<img width="710" alt="image" src="https://user-images.githubusercontent.com/40550942/180482707-e32022b6-2a77-4fc6-8fb7-aac352a6158a.png">

6 - If a React error occurs when trying to render parsed MDX content, display a "Content not
rendering" inline error:
<img width="711" alt="image" src="https://user-images.githubusercontent.com/40550942/180482942-0dd1176f-9a57-401c-a65f-d68b33bf831a.png">

7 - If there's an error attempting to retrieve the MDX content from github, display a full page "The
page you're looking for cannot be found" information
<img width="1003" alt="image" src="https://user-images.githubusercontent.com/40550942/180483126-202402b9-08af-46b6-8d72-9e532ee962bf.png">

8 - Provide troubleshooting documentation for all errors than can be experienced by library
maintainers when trying to render their content on platform

### Solution

1 - Create a [PUBLIC] "MdxSanitizer" package that exports an unified attacher that can be injected
into the mdx processor, this attacher will be thorough enough to cover all of platform's use cases
but be general enough that can still be valuable for projects outside of the carbon ecosystem to
use.

The attacher will:

- Receive a config param object including:
  - allowedComponents: array of allowed tags and custom component keys, defaults to []
  - fallbackComponent: component that will replace the content when a component that isn't allowed
    is identified, defaults to undefined
  - allowImports: whether import statements should be allowed in parsed mdx content, default to true
  - allowExports: whether export statements should be allowed in parsed mdx content, defaults to
    true
  - stripHTMLComments: whether HTML comments should be removed from parsed mdx content, defaults to
    true
  - tagReplacements: object containing entries of html or component tags that should be replaced,
    accompanied by a replace function that returns the content these tags should be replaced with,
    defaults to {}
  - onError: function to be called everytime an operation is performed on the AST as a result of the
    supplied configuration
- if config.stripHTMLComments, rewrite the processor "parse" function to remove comments for the
  string mdx source, using the
  [html-comment-regex lib](https://www.npmjs.com/package/html-comment-regex)
- Return a transformer function that will:
  - Find any component that isn't listed in the supplied in the allowedComponents array and replace
    it's content with fallbackComponent
  - if !config.allowImports throw a ImportFoundException; this exception should include info on the
    content and line position of the import statement found
  - if !config.allowExports throw a ExportFoundException; this exception should include info on the
    content and line position of the export statement found
  - if config.tagReplacements, for each entry:
    - Find all (if any) components whose tag matches the entry key name
    - Replace content with output of calling the function supplied in the entry value and parsing it
      to an mdast tree

OFF THE PLUGIN:

2 - Catch serialize errors on the web-app, display inline error with parser error data 3 - If
there’s a JSX error, display inline error with error as well. 4 - If content cannot be retrieved,
display a full page “The page you’re looking for cannot be found” info page 5 - Create a "Common
Errors" page inside platform with each of the possible MDX errors as an entry and troubleshooting
explanations

In order to do this, we'll create a mdx-processor package that will receive the jsx content and
render it to HTML server side to confirm there are no runtime errors in the code; this is necessary
because there is no other way to catch the errors before they break the app otherwise.

The web-app will retrieve the github content, then send that content off to the
mdx-processor.process() function, which will retur content that can be rendered inside a
`next-mdx-remote`'s `MDXRemote` tag (or throw an error if one shall occur)

## Research

- [ ] Approved?

**Unanswered questions**

> List any unknowns and unanswered questions that need answers prior to beginning development.

- Will we actually be able to catch the rendering error and swap it? With the current remote mdx
  technology we're using (`next-mdx-remote/serialize`) we will not be able to catch jsx errors
  before render; However, if we switch to a lower level library (`@mdx-js/mdx`) and render the mdx
  source as HTML server-side, we'll be able to catch the render errors server-side (this will all be
  handler by the mdx-processor).

```js
  import { evaluate } from '@mdx-js/mdx'
  import * as runtime from 'react/jsx-runtime.js'
  import * as ReactDOMServer from 'react-dom/server'
  const mdxSourceString = await getRemoteMdxSrc(...)

  const mdxSourceComponent = await evaluate(mdxSourceString, {
    ...runtime,
    remarkPlugins: [...],
    rehypePlugins: [...]
  }).default

  try {
    htmlContent = ReactDOMServer.renderToString(new mdxSourceComponent({ components }))
  } catch (err) {
    // render error, load something else
    console.log('error', err)
  }
```

- List of components to link out to: link out to storybook? in-web-app page? .md docs? - Link to
  Storybook
- What should the functions return in terms of content so that we can inject it into the tree? maybe
  an object with componentName and props? - mdx-like content (a string) Ex:

```js
const getHeyReplacementSrc = (node) => {
  const buttonKind = node.attributes?.find((attr) => attr.name === 'kind')
  const buttonText = node.attributes?.find((attr) => attr.name === 'text')
  return `<Button kind="${buttonKind?.value ?? 'primary'}">${buttonText?.value}</Button>`
}
```

- Do the "inline notifications" go directly replacing the content or are they the first thing to
  popup on top of the page? They go inline directly replacing the content, design will make a rollup
  notification to display at the top indicating the current errors on the page

**New technologies**

> List new technologies that need to be explored in detail before beginning development.

- html-comment-regex: regex to test string mdx source against to find html comments.
- For MDX parsing and tapping into the AST tree:
  - @mdx-js/mdx:
    - exports `remarkMarkAndUnravel ` plugin that we'll need to create processor to correctly
      convert stringified content into MDAST when testing:
    ```js
    import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel'
    const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)
    processor.run(processor.parse(mdxData), mdxData, (_, tree) => {
      expect(sanitizer(tree)).toEqual(outputTree)
    })
    ```
  - mdast-util-mdx-jsx: types
  - mdast-util-mdxjs-esm: types
  - remark-mdx: needed to parse strings into MDAST, will be needed for testing
  - remark-parse: needed Parse strings into MDAST, will be needed for testing
  - unified: used to power remark (remark-mdx, remark-parse)
  - unist-util-visit: Find nodes in tree that meet certain criteria (specific components, specific
    attributes...)

**Proofs of concept**

> List proofs of concept that need to be completed before beginning development.

- First run of mdx-sanitizer: https://github.com/carbon-design-system/carbon-platform/pull/740
- [Attacher to remove html comments POC](https://github.com/carbon-design-system/carbon-platform/commit/0d0770b4de5d5057262cc67938810dd8ada1ab14)
- [Catch JSX errors and swap out for Full Page Error POC](https://github.com/carbon-design-system/carbon-platform/compare/main...flucca/poc/mdx-jsx-error-handling)
- [Swap out a component in the tree for another one returned from a function with different props POC](https://github.com/carbon-design-system/carbon-platform/compare/main...flucca/poc/mdx-content-replacement)
- [Find a component in AST and retrieve MDX content corresponding to it (I.E.: find script tags, retrieve the content in between the script tags so we can send it off to the function that will replace that component)](https://github.com/carbon-design-system/carbon-platform/compare/main...flucca/poc/mdx-content-replacement)

## UI/UX design

- [ ] Approved?

> Does this feature have any associated UI/UX? If so, describe any design that needs to be
> completed/red-lined prior to development.

Yes, UIs have been completed for all the replacement components, figma link:
https://www.figma.com/file/WyfqQh9R1VXYZErfmsNDVH/MDX-errors?node-id=9%3A4035

MISSING:

- [Rollup notification at top of page UI](https://github.com/carbon-design-system/carbon-platform/issues/1087)
- [Common MDX Errors Design Considerations](https://github.com/carbon-design-system/carbon-platform/issues/1123)

## APIs

- [ ] Approved?

**Programmatic APIs**

> List any APIs that will be developed and made available in the `@carbon-platform/api` package,
> including function/class/method names, parameters, and return values.

- @carbon-platform/mdx-sanitizer Types:
  ```ts
  interface ComponentReplaceFn {
  (node: Unist Node): string (mdx-like source)
  }
  ```
  ```ts
  interface TagReplacementMap {
    [tag: string]: ComponentReplaceFn
  }
  ```
  ```ts
  interface Config {
    allowedComponents?: string[] = []
    fallbackComponent: ComponentReplaceFn = () => ''
    allowImports?: boolean = true
    allowExports?: boolean = true
    stripHTMLComments?: boolean = true
    tagReplacements?: TagReplacementMap = {}
    onError?: (Error) => undefined
  }
  ```
  Exports: `mdxSanitizerPlugin(config: Config): Function (mdxPlugin type)`

**Data graph**

> List any new query resolvers and/or data models being included in the data-graph and/or data-graph
> API package.

- N/A, eventually the github function that retrieves the mdx source probably moves onto a data-graph
  microservice but that is out of scope for this issue.

**Messages**

> List any new/changed RabbitMQ messages introduced by this feature, the message payload structure
> associated with them, whether they are queries or emits, and their expected return values (for
> queries).

- N/A, No new MQ messages introduced or changed by this feature.

## Security

- [ ] Approved?

> What new data is created/stored/collected/transmitted by this feature? How is that data secured?
> Who is allowed to access it? How is that access controlled?

> Think like a hacker. How might someone attempt to break or abuse this feature?

- Imports and exports are an mdx security concern but we're already covering for that by not
  allowing and stopping MDX parsing full out when we find them
- Inline scripts: Confirmed with https://github.com/francinelucca/mdx-testing/blob/main/test-sec.mdx
  that scripts can be passed to the remote MDX file and will be triggered in the app, as per
  requirement #4, we will not allow mdx scripts to be executed.
  ![](https://user-images.githubusercontent.com/40550942/180517816-e91b8803-57c4-422b-9f7d-e4a949f02fc0.png)
  ![](https://user-images.githubusercontent.com/40550942/180517834-d15981b1-dd13-470d-8989-9d5872d44870.png)

## Error handling

- [ ] Approved?

> Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
> through the APIs? How will users be informed about these errors?

This entire tech design is about error handling 😅 :

- UnknownComponents render error: handle instructions described in solution explanation
- HTML comments break MDX parsing error: handle instructions described in solution explanation
- Parsing error - handle instructions described in solution explanation
- Full page error - handle instructions described in solution explanation
- Failure to retrieve remote mdx contents: handle instructions described in solution explanation

## Test strategy

- [ ] Approved?

> How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
> etc.)

> What interesting edge cases should be considered and tested?

Will use monorepo's standard unit testing library, 'ava'. Will have mdx local files inside package
to test against various use-cases:

- Mdx with no errors: should stay exactly the same
- Mdx with Custom (supported) component: should stay exactly the same
- Mdx with Unknown component: Unknown component should be replaced by supplied FallbackComponent
- Mdx with Exports:
  - should throw `ExportFoundException` if `!config.allowExports`
  - should stay exactly the same if `config.allowExports`
- Mdx with Imports:
  - should throw `ImportFoundException` if `!config.allowImports`
  - should stay exactly the same if `config.allowImports`
- Mdx with HTML comments:
  - if `config.stripHTMLComments` calling processor.parse should result in comments being removed
    from string
  - if `!config.stripHTMLComments` calling processor.parse should result in no changes
- Mdx with replacement tag:
  - component that matches tag should be replaced by supplied replacement function

Parse remote files into MDAST, use mdxSanitizer to "sanitize" content, then manually "visit" the
resulting tree to confirm what was expected to be added/removed happened successfully

## Logging

- [ ] Approved?

> Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature.

- These "error" cases are considered to be fairly common and can mostly be solved by the user so
  we'd want to steer away from filling our logs with them.
- For FullPageError when parsed mdx can't be rendered due to an error, log a "warning" message in
  case we need to track special cases.

## File and code layout

- [ ] Approved?

> Describe how the files and code for this feature will fit into the rest of the mono repo. Will
> there be a new package/service? Are there existing files/directories in which the new logic should
> live?

- packages/mdx-sanitizer

  - /src/
    - main/
      - mdx-sanitizer-plugin.ts
      - index.ts
      - interfaces.ts
      - exceptions/\*
    - test/
      - mdx-sanitizer-plugin.test.js
      - test-files/\*

- services/web-app/utils/mdx.js <- will be used to create a function that will generate the
  mdx-processor that injects and consumes the plugin (this logic needs to be taken out of github.js
  in the web-app)

## Issue and work breakdown

- [ ] Approved?

> List any issues that should be created prior to starting work on this feature.

**Epics**

- #994

**Issues**

- #752
- #995
- #996
- #1087
- #1123
