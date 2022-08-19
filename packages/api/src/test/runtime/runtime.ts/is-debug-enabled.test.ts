/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { RunMode, Runtime } from '../../../main/runtime/index.js'

test.serial('returns undefined when the envvar is not set', (t) => {
  const old = process.env.CARBON_DEBUG
  delete process.env.CARBON_DEBUG

  const runtime = new Runtime()

  t.is(runtime.isDebugEnabled, undefined)

  process.env.CARBON_DEBUG = old
})

test.serial('returns true when the envvar is set', (t) => {
  const old = process.env.CARBON_DEBUG
  process.env.CARBON_DEBUG = 'true'

  const runtime = new Runtime()

  t.is(runtime.isDebugEnabled, true)

  process.env.CARBON_DEBUG = old
})

test('can be manually specified as true', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: true })

  t.is(runtime.isDebugEnabled, true)
})

test('can be manually specified as false', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard, isDebugEnabled: false })

  t.is(runtime.isDebugEnabled, false)
})
