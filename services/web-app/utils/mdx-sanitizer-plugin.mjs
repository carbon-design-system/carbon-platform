/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { remove } from 'unist-util-remove'

function mdxSanitizerPlugin(tree) {
  console.log('mdx-sanitizer-plugin')
  console.log(tree) // <- this is an AST

  // remove all import statements
  remove(tree, (node) => node.type === 'mdxjsEsm' && node.value?.startsWith('import '))

  // remove all "UnknownComponent" from tree,
  // can turn this into a function that checks against our list of mdxComponents
  remove(tree, { type: 'mdxJsxFlowElement', name: 'UnknownComponent' })

  console.log(tree)
}
export default mdxSanitizerPlugin
