/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
class ContentNotFoundException extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

export { ContentNotFoundException }
