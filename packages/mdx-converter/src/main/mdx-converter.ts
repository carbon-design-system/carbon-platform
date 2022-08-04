/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { compile } from '@mdx-js/mdx' // TODO: install this dep
import { MDXRemote } from 'next-mdx-remote' // TODO: install as a dep
import { ReactElement } from 'react' // TODO: install as a peer-dep
import * as runtime from 'react-dom' // TODO: install as a peer-dep
import { renderToString } from 'react-dom/server.js' // TODO: install types @ 17 as a dev dep or declare a module
import rehypeUrls from 'rehype-urls' // TODO: install as a dep
import remarkGfm from 'remark-gfm' // TODO: install as a dep
import unwrapImages from 'remark-unwrap-images' // TODO: install as a dep
import { VFile } from 'vfile' // TODO: install as a dep
// TODO: install react-dom types at v 17 as a dev dep
import { matter } from 'vfile-matter' // TODO: install this dep
// TODO: add react >=17 as a peer dep (same as platform icons package)

/*
Goal:
start with mdx from github as a string

end up with a renderable component (+ matter?)

steps:

- take input string and run it through mdx-js/mdx compile
- also run it through matter, reporting errors along the way
- build up a MDXRemote component based off of that output (needs the components in-hand)
*/

interface MdxConverterConfig {
  components: Array<ReactElement>
  sanitizerPlugin: () => (() => void | Promise<void>)
  // imageResolverPlugin: () => (() => void | Promise<void>)
}

class MdxProcessor {
  private config: MdxConverterConfig

  public constructor(config: MdxConverterConfig) {
    this.config = config
  }

  public createComponent(mdxSource: VFile) {
    const compiledSource = this.compileSource(String(mdxSource.value))
    const frontmatter = matter(mdxSource)
    const SafeRemoteMdx = MDXRemote({
      compiledSource,
      frontmatter,
      components: this.config.components
    })

    this.checkRuntimeErrors(SafeRemoteMdx)

    return SafeRemoteMdx
  }

  private compileSource(mdxSource: string) {
    return compile(mdxSource, {
      ...runtime,
      remarkPlugins: [
        [
          this.config.sanitizerPlugin,
          {
            customComponentKeys: this.config.components.map((component) => (component.key)),
            // fallbackComponent,
            allowImports: false,
            allowExports: false,
            stripHTMLComments: true
            // tagReplacements: replacementMapper
          }
        ],
        remarkGfm,
        unwrapImages
      ],
      rehypePlugins: [
        // TODO: what to do about this plugin?
        // [rehypeUrls, mdxImgResolver.bind(null, dirPath)]
      ]
    })
  }

  private checkRuntimeErrors(Component: any /* TODO: figure out type of safeRemoteMdx */) {
    renderToString(Component) // TODO: this can throw... wrap it in our own error?
  }
}

export { MdxProcessor }
