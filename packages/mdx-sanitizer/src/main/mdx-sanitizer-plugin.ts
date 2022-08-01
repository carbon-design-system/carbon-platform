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
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'

import { ExportFoundException } from './exceptions/export-found-exception'
import { ImportFoundException } from './exceptions/import-found-exception'
import { HTMLTags } from './html-tags'
import { Config } from './interfaces'

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)

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
const sanitizeASTTree = async (config: Config, tree: Parent) => {
  console.log(config.customComponentKeys, tree)

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

      // TODO: fix type
      const replaceContentNode: any = await new Promise((resolve) => {
        processor.run(processor.parse(stringSrc), stringSrc, (_, replaceContentTree) => {
          resolve(replaceContentTree)
        })
      })

      replaceContentNode.position.end = { line: null, column: null, offset: null }
      parent.children[index] = replaceContentNode
    }
  )

  // Replace replacement mapper components
  visit(
    tree,
    (node) => Object.keys(config.tagReplacements).includes((node as MdxJsxFlowElement).name ?? ''),
    async (node: MdxJsxFlowElement, index: number, parent: Parent) => {
      const stringSrc = config.tagReplacements[(node as MdxJsxFlowElement).name ?? '']?.(node)

      // TODO: fix type
      const replaceContentNode: any = await new Promise((resolve) => {
        processor.run(processor.parse(stringSrc), stringSrc, (_, replaceContentTree) => {
          resolve(replaceContentTree)
        })
      })
      replaceContentNode.position.end = { line: null, column: null, offset: null }
      parent.children[index] = replaceContentNode
    }
  )
}

/**
 * Varifies mdx sanitizer configuration object and adds defaults where necessary
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
      vFile.value = (vFile.value as string).replace(htmlCommentRegex, '')
      return parse(vFile)
    }
    return null
  }
  return sanitizeASTTree.bind(config)
}

export default mdxSanitizerPlugin
