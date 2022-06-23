/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { getEnvVar } from '../../main/runtime/get-env-var.js'
import { RunMode } from '../../main/runtime/interfaces.js'
import { Runtime } from '../../main/runtime/runtime.js'

test('it correctly gets an environment variable', (t) => {
  const runtime = new Runtime()
  const result = getEnvVar('NODE_ENV', '', runtime)

  t.is(result, 'test')
})

test('it correctly uses the fallback', (t) => {
  const runtime = new Runtime()
  const result = getEnvVar('NOT_FOUND', 'fallback', runtime)

  t.is(result, 'fallback')
})

test('it throws an exception when the var is not set in standard mode', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard })
  try {
    getEnvVar('NOT_FOUND', 'fallback', runtime)
  } catch (err) {
    t.pass()
  }
})
