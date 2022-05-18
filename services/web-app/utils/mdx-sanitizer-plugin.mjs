/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { remove } from 'unist-util-remove'
import { visit } from 'unist-util-visit'

import components from '@/components/mdx/components'

const mdxSanitizerPlugin = () => (tree) => {
  // remove all import statements
  const importedVars = []
  remove(tree, (node) => {
    if (node.type === 'mdxjsEsm' && node.value?.startsWith('import ')) {
      // find the names of imported variables and save to "importedVars" array
      const varDeclarations = node.data?.estree?.body.filter(
        (bodyItem) => bodyItem.type === 'ImportDeclaration'
      )
      const variableSpecifiers = varDeclarations.map((declaration) =>
        declaration.specifiers.filter((specificer) => specificer.type === 'ImportSpecifier')
      )
      const variableKeys = variableSpecifiers.flat().map((specificer) => specificer.imported?.name)
      importedVars.push(...variableKeys)

      // return true so that this import is removed
      return true
    }
  })

  // remove all export statements
  remove(tree, (node) => node.type === 'mdxjsEsm' && node.value?.startsWith('export '))

  // remove all "UnknownComponent" from tree
  const availableKeys = Object.keys(components)
  remove(tree, (node) => node.name && !availableKeys.includes(node.name))

  // find all components that are using any of the previously imported variables
  visit(
    tree,
    (node) =>
      node.attributes?.some(
        (attr) => attr.type === 'mdxJsxAttribute' && importedVars.includes(attr.value?.value)
      ),
    // remove invalid attributes from node attributes
    (node) => {
      node.attributes = node.attributes.filter(
        (attr) => !(attr.type === 'mdxJsxAttribute' && importedVars.includes(attr.value?.value))
      )
    }
  )
}
export default mdxSanitizerPlugin
