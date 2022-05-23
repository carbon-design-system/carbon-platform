/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'

import { HTMLTags } from './HTML-tags'

/**
 * Sanitizes MDX Ast tree:
 * - Removes import/export statements and their usage
 * - Converts unknown component to instance of `UnnknownComponent`
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @param {object} tree AST: mdx source
 * @returns undefined
 */
const sanitizeASTTree = (customComponentKeys, tree) => {
  // remove all import statements
  const importedVars = []
  remove(tree, (node) => {
    if (node.type === 'mdxjsEsm' && node.value && node.value.startsWith('import ')) {
      // find the names of imported variables and save to "importedVars" array
      const varDeclarations = node.data?.estree?.body.filter(
        (bodyItem) => bodyItem.type === 'ImportDeclaration'
      )
      const variableSpecifiers = varDeclarations?.map((declaration) =>
        declaration.specifiers.filter((specificer) => specificer.type === 'ImportSpecifier')
      )
      const variableKeys = variableSpecifiers.flat().map((specificer) => specificer?.imported.name)
      importedVars.push(...variableKeys)

      // return true so that this import is removed
      return true
    }
  })

  // remove all export statements
  remove(tree, (node) => node.type === 'mdxjsEsm' && node.value && node.value.startsWith('export '))

  // convert all invalid components into "UnknownComponent"
  const availableKeys = [...customComponentKeys, ...HTMLTags]
  visit(
    tree,
    (node) => node.name && !availableKeys.includes(node.name),
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
        (attr) =>
          attr.type === 'mdxJsxAttribute' && attr.value && importedVars.includes(attr.value.value)
      ),
    // remove invalid attributes from node attributes
    (node) => {
      node.attributes = node.attributes.filter(
        (attr) =>
          !(
            attr.type === 'mdxJsxAttribute' &&
            attr.value &&
            importedVars.includes(attr.value.value)
          )
      )
    }
  )
}

/**
 * Constructs sanitized plugin
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @returns {Function} the ast sanitized function
 */
const mdxSanitizerPlugin = (customComponentKeys) => sanitizeASTTree.bind(null, customComponentKeys)

export default mdxSanitizerPlugin
