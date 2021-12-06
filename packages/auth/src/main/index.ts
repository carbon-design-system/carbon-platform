/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SESSION_SECRET } from './config/constants'
import passport from './passport'
import store, { getUserBySessionCookie, updateUserBySessionCookie } from './store'

export { getUserBySessionCookie, passport, SESSION_SECRET, store, updateUserBySessionCookie }
