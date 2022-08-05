/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { compile, run } from '@mdx-js/mdx'
import { ReactElement } from 'react'
import * as runtime from 'react/jsx-runtime.js'
import { renderToString } from 'react-dom/server.js'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

/*
Goal:
start with mdx from github as a string

end up with a renderable component (+ matter?)

steps:

- take input string and run it through mdx-js/mdx compile
- also run it through matter, reporting errors along the way
- build up a MDXRemote component based off of that output (needs the components in-hand)
*/

interface MdxProcessorConfig {
  components: Array<ReactElement>
  sanitizerPlugin: () => () => void | Promise<void>
  // imageResolverPlugin: () => (() => void | Promise<void>)
}

class MdxProcessor {
  private config: MdxProcessorConfig

  public constructor(config: MdxProcessorConfig) {
    this.config = config
  }

  public async process(mdxSource: VFile) {
    // Insert the frontmatter into the VFile
    matter(mdxSource, { strip: true })

    const compiledSource = await this.compileSource(mdxSource)
    const { default: MdxContent } = await run(compiledSource, { ...runtime })

    this.checkRuntimeErrors(MdxContent({ components: this.config.components }))

    // A pseudo-vfile
    return { value: compiledSource.value, data: compiledSource.data }
  }

  private compileSource(mdxSource: VFile) {
    return compile(mdxSource, {
      ...runtime,
      outputFormat: 'function-body',
      jsx: false,
      remarkPlugins: [
        [
          this.config.sanitizerPlugin,
          {
            // customComponentKeys: this.config.components.map((component) => component.key),
            customComponentKeys: [],
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

  private checkRuntimeErrors(Component: any) {
    return renderToString(Component) // TODO: this can throw... wrap it in our own error?
  }
}

export { MdxProcessor }
