/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ImportSpecifier } from '@mdx-js/mdx/lib/plugin/recma-jsx-rewrite'
import { ImportDeclaration } from 'estree-jsx'
import { Literal, Root } from 'mdast'
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx'
import { MdxjsEsm } from 'mdast-util-mdxjs-esm'
import remove from 'unist-util-remove'
import visit from 'unist-util-visit'

import { HTMLTags } from './HTML-tags'

/**
 * Sanitizes MDX Ast tree:
 * - Removes import/export statements and their usage
 * - Converts unknown component to instance of `UnnknownComponent`
 *
 * @param {string[]} customComponentKeys list of valid custom component keys
 * @param {object} tree AST: mdx source
 * @returns {object} modified tree
 */
const sanitizeASTTree = (customComponentKeys: string[], tree: Root) => {
  // remove all import statements
  const importedVars: string[] = []
  remove(tree, (node: unknown): node is Literal => {
    const remarkNode = node as MdxjsEsm
    if (
      remarkNode.type === 'mdxjsEsm' &&
      remarkNode.value &&
      remarkNode.value.startsWith('import ')
    ) {
      // find the names of imported variables and save to "importedVars" array
      const varDeclarations = remarkNode.data?.estree?.body.filter(
        (bodyItem) => bodyItem.type === 'ImportDeclaration'
      )
      const variableSpecifiers = varDeclarations?.map((declaration) =>
        (declaration as ImportDeclaration).specifiers.filter(
          (specificer) => specificer.type === 'ImportSpecifier'
        )
      )
      const variableKeys = variableSpecifiers
        ?.flat()
        ?.map((specificer) => (specificer as ImportSpecifier).imported?.name)
      if (variableKeys && variableKeys.length) {
        importedVars.push(...variableKeys.map((val) => val!))
      }

      // return true so that this import is removed
      return true
    }
    return false
  })

  // remove all export statements
  remove(tree, (node: unknown): node is Literal => {
    const remarkNode = node as Literal
    return (
      remarkNode.type === 'mdxjsEsm' && !!remarkNode.value && remarkNode.value.startsWith('export ')
    )
  })

  // convert all invalid components into "UnknownComponent"
  const availableKeys = [...customComponentKeys, ...HTMLTags]
  visit(
    tree,
    ((node: MdxJsxFlowElement) => !!node.name && !availableKeys.includes(node.name)) as any,
    (node: MdxJsxFlowElement) => {
      node.attributes = [{ type: 'mdxJsxAttribute', name: 'name', value: node.name }]
      node.name = 'UnknownComponent'
      node.type = 'mdxJsxFlowElement'
    }
  )

  // find all components that are using any of the previously imported variables
  visit(
    tree,
    ((node: MdxJsxFlowElement) =>
      node.attributes?.some(
        (attr) =>
          attr.type === 'mdxJsxAttribute' &&
          importedVars.includes((attr.value as { value: string }).value)
      )) as any,
    // remove invalid attributes from node attributes
    (node: MdxJsxFlowElement) => {
      node.attributes = node.attributes?.filter(
        (attr) =>
          !(
            attr.type === 'mdxJsxAttribute' &&
            importedVars.includes((attr.value as { value: string }).value)
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
const mdxSanitizerPlugin = (customComponentKeys: string[]) =>
  sanitizeASTTree.bind(null, customComponentKeys)

export default mdxSanitizerPlugin
