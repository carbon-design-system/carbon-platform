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
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import remarkSmartyPants from 'remark-smartypants'
import remarkUnwrapImages from 'remark-unwrap-images'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { VFileMessage } from 'vfile-message'

import { MdxCompileException } from './exceptions/mdx-compile-exception.js'

interface MdxProcessorConfig {
  allowedTags: string[]
  components: {
    [key: string]: ReactElement
  }
  fallbackComponent: (node: unknown) => string
  imageResolverPlugin: () => () => void | Promise<void>
  logger: {
    debug: Function
    info: Function
    warn: Function
    error: Function
  }
  onError: () => void
  sanitizerPlugin: () => () => void | Promise<void>
  tagReplacements: {
    [tag: string]: () => string
  }
}

class MdxProcessor {
  private config: MdxProcessorConfig

  public constructor(config: MdxProcessorConfig) {
    this.config = config
  }

  /**
   * Process a provided vFile, turning it into executable JS and frontmatter.
   *
   * @param mdxSource The input mdx source, as a vFile.
   *
   * @returns An vFile-like object containing a value (the JS) and a data object which contains
   * frontmatter, if available.
   */
  public async process(mdxSource: VFile) {
    this.config.logger.debug('-> process() input length: ' + mdxSource.value.length)

    // Insert the frontmatter into the VFile
    matter(mdxSource, { strip: true })

    let compiledSource
    try {
      compiledSource = await this.compileSource(mdxSource)
    } catch (err) {
      this.config.logger.warn(err)

      if (err instanceof VFileMessage) {
        throw new MdxCompileException(err.reason, err.position || undefined)
      }

      throw err
    }

    try {
      await this.checkRuntimeErrors(compiledSource)
    } catch (err) {
      this.config.logger.warn(err)
      throw err
    }

    // A pseudo-vfile
    this.config.logger.debug(
      '<- process() output length: ' +
        compiledSource.value.length +
        ', data: ' +
        JSON.stringify(compiledSource.data)
    )
    return { value: compiledSource.value, data: compiledSource.data }
  }

  private compileSource(mdxSource: VFile) {
    return compile(mdxSource, {
      outputFormat: 'function-body',
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
        [
          this.config.sanitizerPlugin,
          {
            allowedComponents: [...Object.keys(this.config.components), ...this.config.allowedTags],
            fallbackComponent: this.config.fallbackComponent,
            allowImports: false,
            allowExports: false,
            onError: this.config.onError,
            stripHTMLComments: true,
            tagReplacements: this.config.tagReplacements
          }
        ],
        remarkGfm,
        remarkUnwrapImages,
        remarkSmartyPants
      ],
      rehypePlugins: [[rehypeUrls, this.config.imageResolverPlugin]]
    })
  }

  private async checkRuntimeErrors(compiledSource: VFile) {
    const { default: MdxContent } = await run(compiledSource, {
      ...runtime,
      // This is needed because of the providerImportSource prop. In this package, a provider isn't
      // used, so this hook can be a no-op and defer to the provided components object
      useMDXComponents: () => undefined
    })

    return renderToString(
      MdxContent({
        components: this.config.components
      })
    )
  }
}

export { MdxProcessor }
