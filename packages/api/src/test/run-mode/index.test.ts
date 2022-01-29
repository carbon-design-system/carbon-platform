/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, RunMode } from '../../main/run-mode'

describe('getRunMode', () => {
  it('returns dev when the envvar is not set', () => {
    const old = process.env.NODE_ENV
    delete process.env.NODE_ENV

    expect(getRunMode()).toBe(RunMode.Dev)

    process.env.NODE_ENV = old
  })

  it('returns dev when the envvar is set to RunMode.Dev', () => {
    const old = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    expect(getRunMode()).toBe(RunMode.Dev)

    process.env.NODE_ENV = old
  })

  it('returns production when the envvar is set to RunMode.Prod', () => {
    const old = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    expect(getRunMode()).toBe(RunMode.Prod)

    process.env.NODE_ENV = old
  })

  it('throws when the envvar is set to an unknown value', () => {
    const old = process.env.NODE_ENV
    process.env.NODE_ENV = 'bad'

    expect(getRunMode).toThrow()

    process.env.NODE_ENV = old
  })
})
