/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Position } from 'unist'
class ImportFoundException extends Error {
  value: string
  position: any
  constructor(value: string, position: Position) {
    super('Import statement found')
    this.value = value
    this.position = position
  }
}

export { ImportFoundException }
