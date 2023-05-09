# td-06 - MDX-to-HTML microservice

**Status:** Approved ✅

<!--
Draft 📝
Approved ✅
Canceled 🚫
-->

## Summary

> Describe the new feature from a technical perspective.

This feature is for a microservice whose responsibility is to accept MDX as input and generated
sanitized HTML as output. It will make use of the `@carbon-platform/mdx-sanitizer` plugin to
accomplish this.

The microservice will be called `mdx-converter`.

**Optional goal:** Cache conversions by hashing the input string and mapping it to the generated
output string.

Future enhancement: Convert to other output formats besides HTML (if it ever makes sense to do so).

A package called `@carbon-platform/mdx-components` will be created for use by the microservice
itself. This package will have all of the mdx components currently housed in the web-app in a
standalone package that can be used in both places. This package will represent a comprehensive set
of all JSX components that can be used in MDX.

> Describe the problem solved by this feature.

This allows MDX to be processed into HTML in a secure, controlled, and isolated manner outside of
the web-app. The primary motivation of this is to allow top-level runtime JSX errors to be caught
and handled gracefully.

> Describe how it integrates/relates/communicates with existing features/packages/services.

It will provide a messaging interface to be used by other services. It will not communicate to any
external services.

> What needs to be in place prior to this feature being developed?

- `mdx-sanitizer` plugin package needs to be integrated into `main` since the microservice depends
  on it.

> What assumptions are being made about those dependencies or about the feature itself?

- The maximum input size of MDX will be 1 MB. Output size may end up larger than this, but will
  remain under the RabbitMQ message threshold of 128 MB.

> What noteworthy things are considered "out of scope" for this feature?

- The development of the actual mdx sanitizer plugin is not in scope for this microservice.

## Research

- [x] Approved?

**Unanswered questions**

> List any unknowns and unanswered questions that need answers prior to beginning development. Note
> that **all** of these questions should be answered prior to approving the Research section.

- [x] How do we get the usable React components over to the service to use as input?
  - There are two ways to accomplish this, but they both involve the service itself importing the
    components for use.
  - First, Carbon react components (`@carbon/react`) can be used by importing them, provided the
    ultimate displayer of the output HTML has imported carbon styles in the web-app.
  - Second, A standalone component library can be used to house "custom" components for the platform
    and import them in the same way.
- [x] What about the fallback component?
  - This should be either internal to the microservice and provided as-is, or manifested to the
    web-app as an error, which then means that the web-app has to handle this error and convert to
    UI element.
- [x] What about the mapping of disallowed components to replacement functions? Do we delegate that
      to the caller and return a list of errors to them?
  - No, this mapping should be internal to the microservice and not configurable. The sanitizer
    _package_ can provide this level of configuration, but the microservice (as a user of this
    package) should not allow further configuration by users.
  - The error components themselves could live in the `mdx-components` package, since they're
    technically MDX-rendered components.
- [x] Can we still use global overrides to the base carbon components/classes since we're not having
      things in modules anymore?
  - Yes, this just turns into business-as-usual css selectors based off of the carbon component
    class names.
- [x] How many components are outside of the mdx folder? What is the lift to package-ify them? Are
      they all using self-contained scss modules currently?
  - Will assess this during development.

**New technologies**

> List new technologies that need to be explored in detail before beginning development.

- `@mdx-js/mdx` used as the MDX compilation and evaluation engine. Takes MDX text as input and
  produced JS as output (as a React component)
- `ReactDOMServer` - used to convert a react component to HTML in a server-side environment

**Proofs of concept**

> List proofs of concept that need to be completed before beginning development.

- [x] Remote MDX exploration using `@mdx-js/mdx` directly and funneling that to
      `ReactDOMServer.renderToStaticMarkup`
  - We were able to prove that this is doable and even accepts the same plugins we were using
    previously for remark and rehype.
- [x] Feasibility of using components which currently exist in
      `service/web-app/components/mdx/components.js` in a standalone package used by the
      mdx-converter microservice.

  - I was able to prove that it is 100% possible to offload these components to their own package.
    That package can then be imported into the microservice for use during mdx processing and react
    SSR. Here's some example code:

    ```ts
    import { Button } from '@carbon/react'
    import { ColorBlock } from '@carbon-platform/mdx-components'
    import { evaluate } from '@mdx-js/mdx'
    import * as runtime from 'react/jsx-runtime.js'
    import { renderToString } from 'react-dom/server.js'

    const MdxContent = (
      await evaluate('<><Button>hello</Button><ColorBlock>#ff0000</ColorBlock></>', { ...runtime })
    ).default

    const output = renderToString(MdxContent({ components: { Button, ColorBlock } }))
    console.log(output)
    ```

    yields:

    ```html
    <button tabindex="0" class="cds--btn cds--btn--primary" type="button">hello</button>
    <div class="carbon-platform-mdx-components--color-block">
      <span class="carbon-platform-mdx-components--color" style="background-color:#ff0000"></span>
    </div>
    ```

## UI/UX design

- [x] Approved?

> Does this feature have any associated UI/UX? If so, describe any design that needs to be
> completed/red-lined prior to development.

None.

## APIs

- [x] Approved?

**Programmatic APIs**

> List any APIs that will be developed and made available in the `@carbon-platform/api` package,
> including function/class/method names, parameters, and return values. If this tech design
> describes a new monorepo package, detail the APIs and exports of that package.

- `@carbon-platform/api/mdx-converter`
  - `MdxConverter` class containing:
    - `toHtml(inputMdx: string): string` Which takes an MDX string as input, sanitizes it, and
      converts it to an HTML string as output.

**Data graph**

> List any new query resolvers and/or data models being included in the data-graph and/or data-graph
> API package.

None.

**Messages**

> List any new/changed RabbitMQ messages introduced by this feature, the message payload structure
> associated with them, whether they are queries or emits, and their expected return values (for
> queries).

- New message: `mdx_to_html`
  - Takes a `string` as its payload and responds with a response object containing:
    - `html: string` - the actual output upon successful conversion
    - `errors: Array<any>` - a list of errors that were encountered during the conversion

## Security

- [x] Approved?

> What new data is created/stored/collected/transmitted by this feature? How is that data secured?
> Who is allowed to access it? How is that access controlled? Think like a hacker. How might someone
> attempt to break or abuse this feature?

The biggest security concern with this feature is the use of
[`evaluate()`](https://mdxjs.com/packages/mdx/#evaluatefile-options). It's docs state:

> [Compile](https://mdxjs.com/packages/mdx/#compilefile-options) and
> [run](https://mdxjs.com/packages/mdx/#runfunctionbody-options) MDX. When possible, please use
> compile, write to a file, and then run with Node, or use one of the
> [§ Integrations](https://mdxjs.com/getting-started/#integrations). But if you trust your content,
> evaluate can work.

We are running under the assumption that we can do enough pre-processing of the input MDX to make is
"safe" to pass through the `evaluate` function without adverse results. This is accomplished mainly
by the use of the `mdx-sanitizer` plugin, which will remove things like script tags,
imports/exports, and other unsupported markup.

In the worst case, this evaluation is confined to a single microservice, so there is low risk of any
unexpected behavior extending beyond the service to the rest of the platform.

MDX data (which is potentially confidential or internal) will be sent encrypted across the message
broker infrastructure. The mdx-converter service may cache conversions, which contain html
variations of the input mdx. Any cached conversions should be stored in either:

1. in encrypted files in ephemeral storage that is destroyed when the service exits; or
2. in an external, encrypted storage bucket or cache with controlled access.

If neither of these can be accomplished within the allotted time, no caching should be performed of
responses.

## Error handling

- [x] Approved?

> Ignore the happy path. What can go wrong with this feature? How will the error conditions manifest
> through the APIs? How will users be informed about these errors?

There are many error conditions that can be encountered during parsing and evaluation. These are
outlined in #952. Beyond this, the following additional errors will be propagated:

- "runtime" JSX evaluation errors (from React SSR) will also be propagated as thrown exceptions by
  the API package utility method(s) outlined above.
- input validation error: input too large (cap the input before sending to messaging to prevent DoS
  attacks).

## Test strategy

- [x] Approved?

> How will the new feature be tested? (e.g. unit tests, manual verification, automated e2e testing,
> etc.) What interesting edge cases should be considered and tested?

Normal unit test coverage will be accomplished.

**Interesting test cases**

- malformed input
- input that is too large ( > 1MB)
- input that results in JSX runtime errors
- no timely response from service when invoking API method
  - (this is left up to the caller of the API to decide and implement)

## Logging

- [x] Approved?

> Detail any FFDC data (info, warning, error, debug logs) to be captured by this feature.

The request log interceptor will automatically log data about requests sent to the microservice.

Parsing errors and warnings will be logged by the microservice.

Details about caching will be info/debug logged, where appropriate.

## File and code layout

- [x] Approved?

> Describe how the files and code for this feature will fit into the rest of the mono repo. Will
> there be a new package/service? Are there existing files/directories in which the new logic should
> live?

New service: `services/mdx-converter` (`@carbon-platform/mdx-converter`). This will be a standard
Carbon Platform NestJS microservice.

Package update: `packages/api`: New subdirectory will be added at
`packages/api/src/main/mdx-converter`. This will contains the programmatic APIs detailed above. This
will also provide the message output type to be provided to the messaging `interfaces.ts` file.

Package update: `packages/api/src/main/messaging/interfaces.ts`: New message type will be added.

Out of scope, but still needed: New package: `packages/mdx-components` with all allowable MDX
components in it.

## Issue and work breakdown

- [x] Approved?

> List any issues that should be created prior to starting work on this feature.

**Epics**

- #994

**Issues**

- #1098
- #1099
- #1100
- #1101
- #1102
- #1103
- #1104
- #1105
- #1106
