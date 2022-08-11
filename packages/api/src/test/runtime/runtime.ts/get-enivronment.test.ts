/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { Environment, Runtime } from '../../../main/runtime/index.js'

test.serial('returns test when the envvar is not set', (t) => {
  const old = process.env.CARBON_ENVIRONMENT
  delete process.env.CARBON_ENVIRONMENT

  const runtime = new Runtime()

  t.is(runtime.environment, Environment.Test)

  process.env.CARBON_ENVIRONMENT = old
})

test.serial('returns test when the envvar is set to Environment.Test', (t) => {
  const old = process.env.CARBON_ENVIRONMENT

  const runtime = new Runtime()

  process.env.CARBON_ENVIRONMENT = 'TEST'
  t.is(runtime.environment, Environment.Test)

  process.env.CARBON_ENVIRONMENT = 'test'
  t.is(runtime.environment, Environment.Test)

  process.env.CARBON_ENVIRONMENT = old
})

test.serial('returns production when the envvar is set to Environment.Production', (t) => {
  const old = process.env.CARBON_ENVIRONMENT

  const runtime = new Runtime()

  process.env.CARBON_ENVIRONMENT = 'PRODUCTION'
  t.is(runtime.environment, Environment.Production)

  process.env.CARBON_ENVIRONMENT = 'production'
  t.is(runtime.environment, Environment.Production)

  process.env.CARBON_ENVIRONMENT = old
})

test.serial('returns build when the envvar is set to Environment.Build', (t) => {
  const old = process.env.CARBON_ENVIRONMENT

  const runtime = new Runtime()

  process.env.CARBON_ENVIRONMENT = 'BUILD'
  t.is(runtime.environment, Environment.Build)

  process.env.CARBON_ENVIRONMENT = 'build'
  t.is(runtime.environment, Environment.Build)

  process.env.CARBON_ENVIRONMENT = old
})

test.serial('throws when the envvar is set to an unknown value', (t) => {
  const old = process.env.CARBON_ENVIRONMENT
  process.env.CARBON_ENVIRONMENT = 'bad'

  const runtime = new Runtime()

  t.throws(() => runtime.environment)

  process.env.CARBON_ENVIRONMENT = old
})
