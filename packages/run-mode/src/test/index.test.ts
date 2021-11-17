/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode } from '../main/index'

describe('return values', () => {
  test('it returns dev when the envvar is not set', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = undefined

    expect(getRunMode()).toBe('DEV')

    process.env.CARBON_RUN_MODE = old
  })

  test('it returns production when the envvar is set to production', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = 'PRODUCTION'

    expect(getRunMode()).toBe('PRODUCTION')

    process.env.CARBON_RUN_MODE = old
  })

  test('it returns test when the envvar is set to test', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = 'TEST'

    expect(getRunMode()).toBe('TEST')

    process.env.CARBON_RUN_MODE = old
  })
})
