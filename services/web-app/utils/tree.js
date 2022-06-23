/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Iterates through all nodes in a tree and stops if a returnFunction() condition is met
 * @param {{[key]: any, items: object[]}[]} nodes tree
 * @returns {void}
 */
export const dfs = (nodes, returnFunction) => {
  let node
  const stack = []
  stack.push(...nodes)
  while (stack.length > 0) {
    node = stack.pop()
    if (returnFunction(node)) {
      return node
    } else {
      node.items?.forEach((item) => {
        stack.push(item)
      })
    }
  }
}
