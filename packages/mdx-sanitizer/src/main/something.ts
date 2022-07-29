/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Parent } from 'mdast'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { visit } from 'unist-util-visit'

import { HTMLTags } from './html-tags.js'

/**
 * Sanitizes MDX Ast tree:
 * - Removes import/export statements and their usage
 * - Converts unknown component to instance of `UnnknownComponent`
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @param {object} tree AST: mdx source
 * @returns {Root} modified tree
 */
const sanitizeASTTree = (customComponentKeys: string[], tree: Parent) => {
  console.log(customComponentKeys, tree)
  // Imports/Exports, replace with unsupported notification
  visit(tree, { type: 'mdxjsEsm' }, (node: MdxJsxFlowElement) => {
    node.attributes = [{ type: 'mdxJsxAttribute', name: 'name', value: node.name }]
    node.name = 'UnknownComponent'
    node.type = 'mdxJsxFlowElement'
  })
  // Replace unknown components with UnknownComponent notification
  // link out to storybook
  const availableComponentKeys = [...customComponentKeys, ...HTMLTags]
  visit(
    tree,
    (node) =>
      !!(node as MdxJsxFlowElement).name &&
      !availableComponentKeys.includes((node as MdxJsxFlowElement).name ?? ''),
    (node: MdxJsxFlowElement) => {
      node.attributes = [{ type: 'mdxJsxAttribute', name: 'name', value: node.name }]
      node.name = 'UnknownComponent'
      node.type = 'mdxJsxFlowElement'
    }
  )
}
/**
 * Constructs sanitized plugin
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @returns {Function} the ast sanitized function
 */
const mdxSanitizerPlugin = (customComponentKeys: string[]) =>
  sanitizeASTTree.bind(customComponentKeys)

export default mdxSanitizerPlugin
