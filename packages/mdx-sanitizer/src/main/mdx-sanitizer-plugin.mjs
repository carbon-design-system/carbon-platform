/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import remove from 'unist-util-remove'
import visit from 'unist-util-visit'

import { HTMLTags } from './html-tags.mjs'

/**
 * Sanitizes MDX Ast tree:
 * - Removes import/export statements and their usage
 * - Converts unknown component to instance of `UnnknownComponent`
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @param {import('mdast').Root} tree AST: mdx source
 * @returns {object} modified tree
 */
const sanitizeASTTree = (customComponentKeys, tree) => {
  const fn = (/** @type {import('mdast-util-mdxjs-esm').MdxjsEsm} */ node) => {
    if (node.type === 'mdxjsEsm') {
      // find the names of imported variables and save to "importedVars" array
      const varDeclarations = node.data?.estree?.body.filter(
        (bodyItem) =>
          /** @type { import('estree').ModuleDeclaration } */ (bodyItem).type ===
          'ImportDeclaration'
      )
      const variableSpecifiers = varDeclarations?.map((declaration) =>
        /** @type { import('estree').ImportDeclaration } */ (declaration).specifiers.filter(
          (specificer) => specificer.type === 'ImportSpecifier'
        )
      )
      const variableKeys = variableSpecifiers
        ?.flat()
        ?.map(
          (specificer) =>
            /** @type {import('estree').ImportSpecifier } */ (specificer).imported?.name
        )
      if (variableKeys && variableKeys.length) {
        importedVars.push(...variableKeys)
      }

      // return true so that this import is removed
      return true
    }
    return false
  }

  /**
   * @type {string[]}
   */
  const importedVars = []

  remove(
    tree,
    /** @type {import('unist-util-remove/node_modules/unist-util-is').Test<import('mdast').Root>} */ (
      fn
    )
  )

  // convert all invalid components into "UnknownComponent"
  const availableKeys = [...customComponentKeys, ...HTMLTags]
  visit(
    tree,
    // eslint-disable-next-line max-len -- can't split this
    /** @type {import('unist-util-visit/node_modules/unist-util-is').Test<import('mdast-util-mdx-jsx').MdxJsxFlowElement>} */
    // eslint-disable-next-line no-extra-parens -- need this for types to work
    (
      (/** @type { import('mdast-util-mdx-jsx').MdxJsxFlowElement } */ node) =>
        !!node.name && !availableKeys.includes(node.name)
    ),
    (/** @type {import('mdast-util-mdx-jsx').MdxJsxFlowElement } */ node) => {
      node.attributes = [{ type: 'mdxJsxAttribute', name: 'name', value: node.name }]
      node.name = 'UnknownComponent'
      node.type = 'mdxJsxFlowElement'
    }
  )

  // find all components that are using any of the previously imported variables
  visit(
    tree,
    // eslint-disable-next-line max-len -- can't split this
    /** @type {import('unist-util-visit/node_modules/unist-util-is').Test<import('mdast-util-mdx-jsx').MdxJsxFlowElement>} */
    // eslint-disable-next-line no-extra-parens -- need this for types to work
    (
      (/** @type { import('mdast-util-mdx-jsx').MdxJsxFlowElement } */ node) =>
        node.attributes?.some(
          (attr) =>
            attr.type === 'mdxJsxAttribute' &&
            importedVars.includes(
              /** @type { import('mdast-util-mdx-jsx').MdxJsxAttributeValueExpression } */ (
                attr.value
              )?.value
            )
        )
    ),
    // remove invalid attributes from node attributes
    (/** @type {import('mdast-util-mdx-jsx').MdxJsxFlowElement } */ node) => {
      node.attributes = node.attributes?.filter(
        (attr) =>
          !(
            attr.type === 'mdxJsxAttribute' &&
            importedVars.includes(
              /** @type { import('mdast-util-mdx-jsx').MdxJsxAttributeValueExpression } */ (
                attr.value
              )?.value
            )
          )
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
