/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// import { ImportSpecifier } from '@mdx-js/mdx/lib/plugin/recma-jsx-rewrite'
// import { ImportDeclaration } from 'estree-jsx'
// eslint-disable-next-line no-unused-vars -- Used in jdsoc type comments
import { Literal, Root } from 'remark'
// import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
// import { MdxjsEsm } from 'mdast-util-mdxjs-esm'
import remove from 'unist-util-remove'
import visit from 'unist-util-visit'

import { HTMLTags } from './html-tags.mjs'

/**
 * Sanitizes MDX Ast tree:
 * - Removes import/export statements and their usage
 * - Converts unknown component to instance of `UnnknownComponent`
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @param {Root} tree AST: mdx source
 * @returns {object} modified tree
 */
const sanitizeASTTree = (customComponentKeys, tree) => {
  /**
   * @param {unknown} node
   * @returns {node is Literal}
   */
  const fn = (node) => {
    /**
     * @type {any}
     */
    const remarkNode = node
    if (remarkNode.type === 'mdxjsEsm') {
      // find the names of imported variables and save to "importedVars" array
      const varDeclarations = remarkNode.data?.estree?.body.filter(
        (/** @type {{ type: string; }} */ bodyItem) => bodyItem.type === 'ImportDeclaration'
      )
      const variableSpecifiers = varDeclarations?.map(
        (/** @type {{ specifiers: any[]; }} */ declaration) =>
          declaration.specifiers.filter(
            (/** @type {{ type: string; }} */ specificer) => specificer.type === 'ImportSpecifier'
          )
      )
      const variableKeys = variableSpecifiers
        ?.flat()
        ?.map(
          (/** @type {{ imported: { name: any; }; }} */ specificer) => specificer.imported?.name
        )
      if (variableKeys && variableKeys.length) {
        importedVars.push(...variableKeys)
      }

      // return true so that this import is removed
      return true
    }
    return false
  }

  // remove all import statements
  /**
   * @type {string[]}
   */
  const importedVars = []

  remove(tree, fn)

  // // remove all export statements
  // remove(tree, (node) => {
  //   const remarkNode = node
  //   return (
  //     remarkNode.type === 'mdxjsEsm' && !!remarkNode.value && remarkNode.value.startsWith('export ')
  //   )
  // })

  // convert all invalid components into "UnknownComponent"
  const availableKeys = [...customComponentKeys, ...HTMLTags]
  visit(
    tree,
    (node) => !!node.name && !availableKeys.includes(node.name),
    (node) => {
      node.attributes = [{ type: 'mdxJsxAttribute', name: 'name', value: node.name }]
      node.name = 'UnknownComponent'
      node.type = 'mdxJsxFlowElement'
    }
  )

  // find all components that are using any of the previously imported variables
  visit(
    tree,
    (node) =>
      node.attributes?.some(
        (/** @type {{ type: string; value: { value: any; }; }} */ attr) =>
          attr.type === 'mdxJsxAttribute' && importedVars.includes(attr.value.value)
      ),
    // remove invalid attributes from node attributes
    (node) => {
      node.attributes = node.attributes?.filter(
        (/** @type {{ type: string; value: { value: any; }; }} */ attr) =>
          !(attr.type === 'mdxJsxAttribute' && importedVars.includes(attr.value.value))
      )
    }
  )
  return tree
}

/**
 * Constructs sanitized plugin
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @returns {Function} the ast sanitized function
 */
const mdxSanitizerPlugin = (customComponentKeys) => sanitizeASTTree.bind(null, customComponentKeys)

export default mdxSanitizerPlugin
