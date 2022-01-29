/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { enforceEnvVars, getEnvVar } from '../../main/enforce-env-vars'
import { RunMode } from '../../main/run-mode'

describe('enforceEnvVars', () => {
  it('throws error when required var is not set', () => {
    const oldRunMode = process.env.NODE_ENV
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.NODE_ENV = RunMode.Prod
    process.env.FAKE_ENV_VAR = ''

    expect(() => enforceEnvVars(['FAKE_ENV_VAR'])).toThrow()
    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.NODE_ENV = oldRunMode
  })

  describe('returns true', () => {
    it('when expected env vars are set', () => {
      const oldRunMode = process.env.NODE_ENV
      const oldFakeEnvVar = process.env.FAKE_ENV_VAR

      process.env.NODE_ENV = RunMode.Prod
      process.env.FAKE_ENV_VAR = 'SOME VALUE'

      expect(enforceEnvVars(['FAKE_ENV_VAR'])).toBeTruthy()

      process.env.FAKE_ENV_VAR = oldFakeEnvVar
      process.env.NODE_ENV = oldRunMode
    })

    it('when required env vars have not been set and on Dev mode', () => {
      const oldRunMode = process.env.NODE_ENV
      const oldFakeProdEnvVar = process.env.FAKE_PROD_ENV_VAR

      process.env.NODE_ENV = RunMode.Dev
      process.env.FAKE_PROD_ENV_VAR = ''

      expect(enforceEnvVars(['FAKE_PROD_ENV_VAR'])).toBeTruthy()

      process.env.NODE_ENV = oldRunMode
      process.env.FAKE_PROD_ENV_VAR = oldFakeProdEnvVar
    })
  })

  describe('returns false', () => {
    it('when called with throwError = false and invalid env vars', () => {
      const oldRunMode = process.env.NODE_ENV
      const oldFakeEnvVar = process.env.FAKE_ENV_VAR

      process.env.NODE_ENV = RunMode.Prod
      process.env.FAKE_ENV_VAR = ''

      expect(enforceEnvVars(['FAKE_ENV_VAR'], false)).toBeFalsy()

      process.env.NODE_ENV = oldRunMode
      process.env.FAKE_ENV_VAR = oldFakeEnvVar
    })
  })
})

describe('getEnvVar', () => {
  it('returns the value when the env var is set', () => {
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    const fakeEnvVarValue = 'this has a value'

    process.env.FAKE_ENV_VAR = fakeEnvVarValue

    expect(getEnvVar('FAKE_ENV_VAR')).toEqual(fakeEnvVarValue)

    process.env.FAKE_ENV_VAR = oldFakeEnvVar
  })

  it('returns the fallback when the envvar is not set and fallback is supplied on Dev mode', () => {
    const oldRunMode = process.env.NODE_ENV
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.FAKE_ENV_VAR = ''
    process.env.NODE_ENV = RunMode.Dev

    const fallbackValue = 'this has a value'
    expect(getEnvVar('FAKE_ENV_VAR', fallbackValue)).toEqual(fallbackValue)

    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.NODE_ENV = oldRunMode
  })

  it('throws error when env var and fallback value are not set', () => {
    const oldRunMode = process.env.NODE_ENV
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.FAKE_ENV_VAR = ''
    process.env.NODE_ENV = RunMode.Dev

    expect(() => getEnvVar('FAKE_ENV_VAR')).toThrow()

    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.NODE_ENV = oldRunMode
  })

  it('throws error when the env var is not set and on Prod mode', () => {
    const oldRunMode = process.env.NODE_ENV
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.FAKE_ENV_VAR = ''
    process.env.NODE_ENV = RunMode.Prod

    expect(() => getEnvVar('FAKE_ENV_VAR')).toThrow()

    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.NODE_ENV = oldRunMode
  })

  it('throws error when the envvar is not set and on Prod mode even if fallback is given', () => {
    const oldRunMode = process.env.NODE_ENV
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.FAKE_ENV_VAR = ''
    process.env.NODE_ENV = RunMode.Prod

    const fallbackValue = 'this has a value'
    expect(() => getEnvVar('FAKE_ENV_VAR', fallbackValue)).toThrow()

    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.NODE_ENV = oldRunMode
  })
})
