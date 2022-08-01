/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
class ImportFoundException extends Error {
  value: string
  position: any
  // TODO: change type
  constructor(value: string, position: any) {
    super('Import statement found')
    this.value = value
    this.position = position
  }
}

export { ImportFoundException }
