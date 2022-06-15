/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
class DuplicateQueryException extends Error {
  constructor(name: string) {
    super(`
Attempted to add query entry to the Dev Dataset with a name that already existed: ${name}

This is likely a mistake and means that you've defined a query someplace in your code that has the
same name as another query. Either use the already existing query or choose a new query name.
`)
  }
}

export { DuplicateQueryException }
