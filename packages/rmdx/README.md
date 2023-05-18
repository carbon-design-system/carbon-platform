# RMDX (Remote MDX)

A set of utilities that allow remote MDX to be safely rendered as a component tree in a React app.

**The general flow is:**

1. MDX is parsed into an Abstract Syntax Tree (AST)
2. The AST is passed as a prop to an `RmdxNode`
3. The `RmdxNode` is rendered, resulting in a tree of React components

## Basic example

Given the following MDX:

```mdx
# Hello there!

This is a <Test foo="bar" />
```

Here is a block of code that processes it and renders it:

```ts
import { process, RmdxNode, Renderer } from '@carbon-platform/rmdx'

const renderers: Record<string, Renderer> = {
  document: ({ children }) => {
    return children
  },
  'heading-1': ({ children }) => {
    return <h1>{children}</h1>
  },
  paragraph: ({ children }) => {
    return children
  }
}

const components: Record<string, Renderer> = {
  Test: ({ foo }) => {
    if (foo === 'bar') {
      return <div>Test</div>
    } else {
      return <span>Test</span>
    }
  }
}

const mdx = '(The MDX string from above)'
const processedMdx = process(mdx, Object.keys(components))

const Page = () => {
  return <RmdxNode components={{ ...renderers, ...components }} astNode={processedMdx.ast} />
}
```

## How it works

There are two parts to the process.

Part 1 is converting an MDX string into an AST (the `process(...)` function). This is handled
automatically and the only configurable input to this function is a list of JSX component tags that
are allowed to exist in the source MDX string.

This part of the processing does not depend on any React or UI framework. It will work on both the
server side and the client side of an application.

The output of this function is a JSON object containing the frontmatter from the source string and
an AST representation of the source string. This AST is meant to be passed directly to "part 2" of
the process.

Part 2 of the process is translating the AST from part 1 into a tree of react components. As a user
of this library, you accomplish this by defining how various AST node types should be rendered. You
then provide this set of component mappings as a prop to the `RmdxNode` React component, and finally
render that React component in your application.

In the example above, `document`, `paragraph`, and `heading-1` renderers are defined to handle each
of these three node types. For a list of all possible node types that may be encountered in the AST,
check out the [node-handlers](./src/main/node-handlers) folder. In the example, the `heading-1`
renderer returns an `h1` element with the provided `children` inside of it.

In most cases, it is expected that a renderer will render the provided `children` prop as some point
in its return value. It should be noted that though this props is called "children" it is only a
_representation_ of the actual child components, and therefore can't be worked with directly as
would typically be allowable in React. More specifically, each child is wrapped in its own RmdxNode
and the group of children is wrapped in a singular `RmdxNode` as well. There are a set of utility
functions provided that make working with children easier, should the need arise to investigate them
during rendering.

### `unwrap(node: ReactElement<RmdxNodeProps>)`

Given a `children` object provided to a `Renderer` when rendering an RMDX AST, return `RmdxNode`s
for each of the actual child nodes from the RMDX AST. This is useful to interrogate the children
being passed along to RMDX `Renderer`s since by default they are wrapped in a singular `RmdxNode` as
opposed to an array of React nodes.

### `peek(child: ReactElement<RmdxNodeProps>)`

Given an `RmdxNode`, returns the to-be-rendered component, its props, and the associated RMDX node
type. This is useful in a `Renderer` to investigate details about an incoming child which has been
wrapped in an `RmdxNode`.

## Security considerations

This package is purposefully restrictive with regards to what types of Markdown and MDX are
allowed/disallowed. This means things like MDX Flow Expressions (e.g. `{x + y}`) are disallowed
because of their potential for code injection or other malicious behavior. But in exchange, this
package permits MDX from any arbitrary source to be safely rendered within an application since it
does not rely on `eval`-ing any code to produce a DOM tree.

Here's a simple example of why flow expressions are problematic when rendering untrusted MDX:

```mdx
Nothing to { (() => document.getElementsByTagName('body')[0].innerHTML = 'see')() } here.
```

As you can see (heh, humor), the entire page is replaced with the text "see". This is obviously
problematic if you're dealing with untrusted MDX written by someone else.

Using RMDX, that same input would result in the following AST output:

```json
{
  "frontmatter": {},
  "ast": {
    "type": "document",
    "children": [
      {
        "type": "paragraph",
        "children": [
          {
            "type": "text",
            "value": "Nothing to ",
            "props": {
              "parentType": "paragraph"
            }
          },
          {
            "type": "__error__",
            "data": {
              "errorIndex": 0
            }
          },
          {
            "type": "text",
            "value": " here.",
            "props": {
              "parentType": "paragraph"
            }
          }
        ],
        "props": {
          "parentType": "document"
        }
      }
    ],
    "props": {
      "parentType": ""
    }
  },
  "errors": [
    {
      "type": "RestrictedSyntaxException",
      "position": {
        "start": {
          "line": 1,
          "column": 12,
          "offset": 11
        },
        "end": {
          "line": 1,
          "column": 84,
          "offset": 83
        }
      },
      "src": "{ (() => document.getElementsByTagName('body')[0].innerHTML = 'see')() }"
    }
  ]
}
```
