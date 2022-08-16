/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { remarkMarkAndUnravel } from '@mdx-js/mdx/lib/plugin/remark-mark-and-unravel.js'
import htmlCommentRegex from 'html-comment-regex'
import { Literal, Parent, Root } from 'mdast'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import { Processor, unified } from 'unified'
import { Node, visit } from 'unist-util-visit'
import { VFile } from 'vfile'

import { ComponentReplacedException } from './exceptions/component-replaced-exception.js'
import { ExportFoundException } from './exceptions/export-found-exception.js'
import { ImportFoundException } from './exceptions/import-found-exception.js'
import { UnknownComponentException } from './exceptions/unknown-component-exception.js'
import { Config } from './interfaces.js'

let conversionProcessor: Processor<Root, Root, Root, void> | undefined

function getConversionProcessor() {
  if (!conversionProcessor) {
    conversionProcessor = unified().use(remarkParse).use(remarkMdx).use(remarkMarkAndUnravel)
  }

  return conversionProcessor
}

/**
 * Converts a chunk of mdx source string into an MDAST node
 *
 * @param {string} src src mdx string to convert to MDAST node
 * @returns {MdxJsxFlowElement} A partial AST based on the input string.
 */
function getMdAstNodeFromSrc(src: string): MdxJsxFlowElement {
  const processor = getConversionProcessor()
  const rootNode = processor.parse(src) as Node

  // Must not be present if a node is generated.
  delete rootNode.position

  return rootNode as MdxJsxFlowElement
}

/**
 * Sanitizes MDX Ast tree:
 * - Finds any component that isn't listed in the supplied in the allowedComponents array
 *  and replaces it's content with fallbackComponent
 * - if !config.allowImports throws an ImportFoundException
 * - if !config.allowExports throws an ExportFoundException
 * - Replace all components in config.tagReplacements with their replacement content
 *
 * @param {Config} config configuration settings to customize the sanitizer's behavior
 * @param {object} tree AST: mdx source
 */
function sanitizeAst(config: Config, tree: Parent) {
  replaceImportsAndExports(config, tree)

  replaceUnknownComponents(config, tree)

  replaceMappedTags(config, tree)
}

function replaceImportsAndExports(config: Config, tree: Parent) {
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
}

function replaceUnknownComponents(config: Config, tree: Parent) {
  visit(
    tree,
    (node) => {
      const flowElement = node as MdxJsxFlowElement
      return !!flowElement.name && !config.allowedComponents.includes(flowElement.name ?? '')
    },
    (node: MdxJsxFlowElement, index: number, parent: Parent) => {
      const stringSrc = config.fallbackComponent(node)

      const replacementNode = getMdAstNodeFromSrc(stringSrc)
      parent.children[index] = replacementNode

      config.onError(new UnknownComponentException(node.name!, node.position))
    }
  )
}

function replaceMappedTags(config: Config, tree: Parent) {
  visit(
    tree,
    (node) => Object.keys(config.tagReplacements).includes((node as MdxJsxFlowElement).name ?? ''),
    (node: MdxJsxFlowElement, index: number, parent: Parent) => {
      const stringSrc = config.tagReplacements[node.name ?? '']?.(node) ?? ''

      const replacementNode = getMdAstNodeFromSrc(stringSrc)
      parent.children[index] = replacementNode

      config.onError(new ComponentReplacedException(node.name!, node.position))
    }
  )
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
  if (!config.allowedComponents) {
    config.allowedComponents = []
  }
  if (!config.onError) {
    config.onError = () => undefined
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

export { getConfigDefaults, mdxSanitizerPlugin }
