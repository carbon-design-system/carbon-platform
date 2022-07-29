/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import htmlCommentRegex from 'html-comment-regex'
import { Parent } from 'mdast'
import { Processor } from 'unified'
import { VFileCompatbile } from 'vfile'

import { Config } from './interfaces'

/**
 * Sanitizes MDX Ast tree:
 * - TODO: fill
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @param {object} tree AST: mdx source
 * @returns {Root} modified tree
 */
const sanitizeASTTree = (customComponentKeys: string[], tree: Parent) => {
  console.log(customComponentKeys, tree)
}

/**
 * Constructs sanitized plugin
 *
 * @param {Processor} this unified processor
 * @param {Config} config configuration settings to customize the sanitizer's behavior
 * @returns {Function} the ast sanitized function
 */
function mdxSanitizerPlugin(this: Processor, config: Config) {
  if (config.stripHTMLComments) {
    const parse = this.parse
    this.parse = (vFile: VFileCompatbile) => {
      vFile.value = vFile.value.replace(htmlCommentRegex, '')
      return parse(vFile)
    }
    return null
  }
  return sanitizeASTTree.bind(config)
}

export default mdxSanitizerPlugin
