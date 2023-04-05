# RMDX (Remote MDX)

A set of utilities that allow remote MDX to be safely rendered as a component tree in a react app.

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
