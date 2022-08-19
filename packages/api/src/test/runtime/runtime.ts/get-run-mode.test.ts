/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { RunMode, Runtime } from '../../../main/runtime/index.js'

test.serial('returns dev when the envvar is not set', (t) => {
  const old = process.env.CARBON_RUN_MODE
  delete process.env.CARBON_RUN_MODE

  const runtime = new Runtime()

  t.is(runtime.runMode, RunMode.Dev)

  process.env.CARBON_RUN_MODE = old
})

test.serial('returns dev when the envvar is set to RunMode.Dev', (t) => {
  const old = process.env.CARBON_RUN_MODE

  const runtime = new Runtime()

  process.env.CARBON_RUN_MODE = 'DEV'
  t.is(runtime.runMode, RunMode.Dev)

  process.env.CARBON_RUN_MODE = 'dev'
  t.is(runtime.runMode, RunMode.Dev)

  process.env.CARBON_RUN_MODE = old
})

test.serial('returns standard when the envvar is set to RunMode.Standard', (t) => {
  const old = process.env.CARBON_RUN_MODE

  const runtime = new Runtime()

  process.env.CARBON_RUN_MODE = 'STANDARD'
  t.is(runtime.runMode, RunMode.Standard)

  process.env.CARBON_RUN_MODE = 'standard'
  t.is(runtime.runMode, RunMode.Standard)

  process.env.CARBON_RUN_MODE = old
})

test.serial('throws when the envvar is set to an unknown value', (t) => {
  const old = process.env.CARBON_RUN_MODE
  process.env.CARBON_RUN_MODE = 'bad'

  const runtime = new Runtime()

  t.throws(() => runtime.runMode)

  process.env.CARBON_RUN_MODE = old
})

test.serial('can be set via config option', (t) => {
  const runtime = new Runtime({ runMode: RunMode.Standard })

  t.is(runtime.runMode, RunMode.Standard)
})
