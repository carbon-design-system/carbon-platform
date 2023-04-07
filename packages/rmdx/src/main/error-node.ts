/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Node } from 'unist'

/**
 * A node that gets injected into an RMDX AST in place of unexpected or malformed MDX nodes.
 */
class ErrorNode {
  private readonly errorIndex: number

  public constructor(errorIndex: number) {
    this.errorIndex = errorIndex
  }

  public serialize(): Node {
    return {
      type: '__error__',
      data: {
        errorIndex: this.errorIndex
      }
    }
  }
}

export { ErrorNode }
