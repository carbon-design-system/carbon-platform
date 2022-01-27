/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DEV, getRunMode, PROD } from '../../main/run-mode'

describe('getRunMode', () => {
  it('returns dev when the envvar is not set', () => {
    const old = process.env.CARBON_RUN_MODE
    delete process.env.CARBON_RUN_MODE

    expect(getRunMode()).toBe(DEV)

    process.env.CARBON_RUN_MODE = old
  })

  it('returns dev when the envvar is set to DEV', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = 'DEV'

    expect(getRunMode()).toBe(DEV)

    process.env.CARBON_RUN_MODE = old
  })

  it('returns production when the envvar is set to PROD', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = 'PROD'

    expect(getRunMode()).toBe(PROD)

    process.env.CARBON_RUN_MODE = old
  })

  it('throws when the envvar is set to an unknown value', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = 'bad'

    expect(getRunMode).toThrow()

    process.env.CARBON_RUN_MODE = old
  })
})
