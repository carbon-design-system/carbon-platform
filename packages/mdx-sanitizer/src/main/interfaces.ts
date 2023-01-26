/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Node } from 'unist'

interface ComponentReplaceFn {
  (node: Node): string
}

interface TagReplacementMap {
  [tag: string]: ComponentReplaceFn
}

interface Config {
  allowedComponents: string[]
  fallbackComponent: ComponentReplaceFn
  allowImports: boolean
  allowExports: boolean
  stripHTMLComments?: boolean
  tagReplacements: TagReplacementMap
  onError: (err: Error) => void
}

export type { ComponentReplaceFn, Config, TagReplacementMap }
