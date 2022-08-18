/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Position } from 'unist'

class ComponentReplacedException extends Error {
  position?: Position

  constructor(message: string, position: Position | undefined) {
    super(message)
    this.name = this.constructor.name
    this.position = position
  }
}

export { ComponentReplacedException }
