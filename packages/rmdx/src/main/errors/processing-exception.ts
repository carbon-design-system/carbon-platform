/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NodeHandlerData } from '../interfaces.js'

class ProcessingException extends Error {
  private node: NodeHandlerData['node']
  private position: NodeHandlerData['node']['position']

  public constructor(message: string, node: NodeHandlerData['node']) {
    super(message)
    this.node = node
    this.position = node.position
  }

  override toString() {
    return `MDX:${this.position?.start.line}:${this.position?.start.column}: ${this.message}`
  }
}

export { ProcessingException }
