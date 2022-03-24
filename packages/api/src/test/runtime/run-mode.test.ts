/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, RunMode } from '../../main/runtime'

describe('getRunMode', () => {
  it('returns dev when the envvar is not set', () => {
    const old = process.env.CARBON_RUN_MODE
    delete process.env.CARBON_RUN_MODE

    expect(getRunMode()).toBe(RunMode.Dev)

    process.env.CARBON_RUN_MODE = old
  })

  it('returns dev when the envvar is set to RunMode.Dev', () => {
    const old = process.env.CARBON_RUN_MODE

    process.env.CARBON_RUN_MODE = 'DEV'
    expect(getRunMode()).toBe(RunMode.Dev)

    process.env.CARBON_RUN_MODE = 'dev'
    expect(getRunMode()).toBe(RunMode.Dev)

    process.env.CARBON_RUN_MODE = old
  })

  it('returns standard when the envvar is set to RunMode.Standard', () => {
    const old = process.env.CARBON_RUN_MODE

    process.env.CARBON_RUN_MODE = 'STANDARD'
    expect(getRunMode()).toBe(RunMode.Standard)

    process.env.CARBON_RUN_MODE = 'standard'
    expect(getRunMode()).toBe(RunMode.Standard)

    process.env.CARBON_RUN_MODE = old
  })

  it('throws when the envvar is set to an unknown value', () => {
    const old = process.env.CARBON_RUN_MODE
    process.env.CARBON_RUN_MODE = 'bad'

    expect(getRunMode).toThrow()

    process.env.CARBON_RUN_MODE = old
  })
})
