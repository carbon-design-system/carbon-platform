/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Position } from 'unist'

import { NodeHandlerData, SerializedMdxError } from '../interfaces.js'

/**
 * Base class from which all other processing exceptions inherit. This class is obstract since it is
 * intended to be sub-classed rather than used directly.
 */
abstract class ProcessingException extends Error {
  protected static NO_POSITION: Position = {
    start: {
      line: -1,
      column: -1
    },
    end: {
      line: -1,
      column: -1
    }
  }

  protected readonly src: SerializedMdxError['src']
  protected readonly position?: SerializedMdxError['position']

  public constructor(src: string, position?: NodeHandlerData['node']['position']) {
    super(src)

    this.src = src
    this.position = position
  }

  public serialize(): SerializedMdxError {
    return {
      type: this.constructor.name,
      position: this.position || ProcessingException.NO_POSITION,
      src: this.src
    }
  }
}

export { ProcessingException }
