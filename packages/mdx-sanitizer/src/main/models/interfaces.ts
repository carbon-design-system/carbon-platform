/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Node as UnistNode } from 'unist'
interface Node extends UnistNode {
  type: string
  name?: string
  value?: string | object
  children?: Node[]
  attributes?: {
    name: string
    type: string
    value?: string | { value?: string | object }
  }[]

  data?: {
    estree?: {
      body: {
        type: string
        specifiers: {
          type: string
          imported?: {
            name: string
          }
        }[]
      }[]
    }
    [key: string]: any
  }
}

export { Node }
