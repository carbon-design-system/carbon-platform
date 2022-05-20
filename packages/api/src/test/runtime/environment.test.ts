/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment, getEnvironment, withEnvironment } from '../../main/runtime'

describe('getEnvironment', () => {
  it('returns test when the envvar is not set', () => {
    const old = process.env.CARBON_ENVIRONMENT
    delete process.env.CARBON_ENVIRONMENT

    expect(getEnvironment()).toBe(Environment.Test)

    process.env.CARBON_ENVIRONMENT = old
  })

  it('returns test when the envvar is set to Environment.Test', () => {
    const old = process.env.CARBON_ENVIRONMENT

    process.env.CARBON_ENVIRONMENT = 'TEST'
    expect(getEnvironment()).toBe(Environment.Test)

    process.env.CARBON_ENVIRONMENT = 'test'
    expect(getEnvironment()).toBe(Environment.Test)

    process.env.CARBON_ENVIRONMENT = old
  })

  it('returns production when the envvar is set to Environment.Production', () => {
    const old = process.env.CARBON_ENVIRONMENT

    process.env.CARBON_ENVIRONMENT = 'PRODUCTION'
    expect(getEnvironment()).toBe(Environment.Production)

    process.env.CARBON_ENVIRONMENT = 'production'
    expect(getEnvironment()).toBe(Environment.Production)

    process.env.CARBON_ENVIRONMENT = old
  })

  it('returns build when the envvar is set to Environment.Build', () => {
    const old = process.env.CARBON_ENVIRONMENT

    process.env.CARBON_ENVIRONMENT = 'BUILD'
    expect(getEnvironment()).toBe(Environment.Build)

    process.env.CARBON_ENVIRONMENT = 'build'
    expect(getEnvironment()).toBe(Environment.Build)

    process.env.CARBON_ENVIRONMENT = old
  })

  it('throws when the envvar is set to an unknown value', () => {
    const old = process.env.CARBON_ENVIRONMENT
    process.env.CARBON_ENVIRONMENT = 'bad'

    expect(getEnvironment).toThrow()

    process.env.CARBON_ENVIRONMENT = old
  })
})

describe('withEnvironment', () => {
  it('correctly returns a prefixed string', () => {
    const old = process.env.CARBON_ENVIRONMENT
    delete process.env.CARBON_ENVIRONMENT

    const input = 'hello world'
    const expected = `TEST_${input}`

    expect(withEnvironment(input)).toBe(expected)

    process.env.CARBON_ENVIRONMENT = old
  })
})
