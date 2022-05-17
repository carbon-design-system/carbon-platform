/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { remove } from 'unist-util-remove'
import components from '@/components/mdx/components'

const mdxSanitizerPlugin = () => (tree) => {
  // remove all import statements
  remove(tree, (node) => node.type === 'mdxjsEsm' && node.value?.startsWith('import '))

  // remove all export statements
  remove(tree, (node) => node.type === 'mdxjsEsm' && node.value?.startsWith('export '))

  // remove all "UnknownComponent" from tree
  const availableKeys = Object.keys(components)
  remove(tree, (node) => node.name && !availableKeys.includes(node.name))
}
export default mdxSanitizerPlugin
