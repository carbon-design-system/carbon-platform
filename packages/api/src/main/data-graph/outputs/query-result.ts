/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Library } from '../models/library.model'
import { User } from '../models/user.model'

class QueryResult {
  public libraries?: Array<Library>
  public user?: User
  public users?: Array<User>
}

export { QueryResult }
