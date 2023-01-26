/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryMessageException } from './query-message-exception.js'

class InvalidInputException extends QueryMessageException {}

export { InvalidInputException }
