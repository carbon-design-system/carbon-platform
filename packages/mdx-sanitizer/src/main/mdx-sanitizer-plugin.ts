/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js'
import htmlCommentRegex from 'html-comment-regex'
import { Literal, Parent } from 'mdast'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { Processor, unified } from 'unified'
import { Node, visit } from 'unist-util-visit'
import { VFile } from 'vfile'

import { ExportFoundException } from './exceptions/export-found-exception.js'
import { ImportFoundException } from './exceptions/import-found-exception.js'
import { HTMLTags } from './html-tags.js'
import { Config } from './interfaces.js'

/**
 * Converts a chunk of mdx source string into an MDAST node
 *
 * @param {string} src src mdx string to convert to MDAST node
 * @param {(Node) => void} callback function to call with resulting MDAST node
 * as a param when content has been parsed
 */
async function getMdAstNodeFromSrc(src: string, callback: (node: Node) => void) {
  const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)
  const node: Node = await new Promise((resolve) => {
    processor.run(processor.parse(src), src, (_, replaceContentTree) => {
      resolve(replaceContentTree!)
    })
  })
  // positions expects numbers, have to cast to any to make it work
  node.position!.end = { line: null as any, column: null as any, offset: null as any }

  callback(node)
}

/**
 * Sanitizes MDX Ast tree:
 * - Finds any component that isn't listed in the supplied in the customComponentsKeys array
 *  and replaces it's content with fallbackComponent
 * - if !config.allowImports throws an ImportFoundException
 * - if !config.allowExports throws an ExportFoundException
 * - Replace all components in config.tagReplacements with their replacement content
 *
 * @param {Config} config configuration settings to customize the sanitizer's behavior
 * @param {object} tree AST: mdx source
 * @returns {Root} modified tree
 */
async function sanitizeAst(config: Config, tree: Parent) {
  const promises: Promise<any>[] = []
  // Imports/Exports
  if (!config.allowExports || !config.allowImports) {
    visit(tree, { type: 'mdxjsEsm' }, (node: Literal) => {
      if (!config.allowImports && node.value?.startsWith('import ')) {
        throw new ImportFoundException(node.value, node.position)
      }
      if (!config.allowExports && node.value?.startsWith('export ')) {
        throw new ExportFoundException(node.value, node.position)
      }
    })
  }
  // Replace unknown components with Fallback component
  const availableComponentKeys = [...config.customComponentKeys, ...HTMLTags]
  visit(
    tree,
    (node) =>
      !!(node as MdxJsxFlowElement).name &&
      !availableComponentKeys.includes((node as MdxJsxFlowElement).name ?? ''),
    async (node: MdxJsxFlowElement, index: number, parent: Parent) => {
      const stringSrc = config.fallbackComponent(node)

      promises.push(
        getMdAstNodeFromSrc(stringSrc, (replacementNode) => {
          parent.children[index] = replacementNode as MdxJsxFlowElement
        })
      )
    }
  )

  // Replace replacement mapper components
  visit(
    tree,
    (node) => Object.keys(config.tagReplacements).includes((node as MdxJsxFlowElement).name ?? ''),
    async (node: MdxJsxFlowElement, index: number, parent: Parent) => {
      const stringSrc = config.tagReplacements[node.name ?? '']?.(node) ?? ''

      promises.push(
        getMdAstNodeFromSrc(stringSrc, (replacementNode) => {
          parent.children[index] = replacementNode as MdxJsxFlowElement
        })
      )
    }
  )

  await Promise.all(promises)
}

/**
 * Verifies mdx sanitizer configuration object and adds defaults where necessary
 *
 * @param {Config} config partially configuration settings to customize the sanitizer's behavior
 * @returns {Config} config complete configuration object with defaults baked in
 */
function getConfigDefaults(config: Config) {
  if (config.allowExports !== false && config.allowExports !== true) {
    config.allowExports = true
  }
  if (config.allowImports !== false && config.allowImports !== true) {
    config.allowImports = true
  }
  if (config.stripHTMLComments !== true && config.stripHTMLComments !== false) {
    config.stripHTMLComments = true
  }
  if (!config.fallbackComponent) {
    config.fallbackComponent = () => ''
  }
  if (!config.tagReplacements) {
    config.tagReplacements = {}
  }
  if (!config.customComponentKeys) {
    config.customComponentKeys = []
  }
  return config
}

/**
 * Constructs sanitized plugin and strips HTML comments from source if config.stripHTMLComments
 *
 * @param {Processor} this unified processor
 * @param {Config} config configuration settings to customize the sanitizer's behavior
 * @returns {Function} the ast sanitized function
 */
function mdxSanitizerPlugin(this: Processor, config: Config) {
  getConfigDefaults(config)

  // strip HTML comments if necessary
  if (config.stripHTMLComments) {
    const parse = this.parse
    this.parse = (vFile: VFile) => {
      vFile.value = String(vFile.value).replace(htmlCommentRegex, '')
      return parse(vFile)
    }
  }

  return sanitizeAst.bind(null, config)
}

export { mdxSanitizerPlugin }
