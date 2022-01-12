/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { enforceEnvVars } from '../../main/enforce-env-vars'
import { DEV, PRODUCTION, TEST } from '../../main/run-mode'

describe('enforceEnvVars', () => {
  describe('throws error', () => {
    it('when required var is not set', () => {
      const oldFakeEnvVar = process.env.FAKE_ENV_VAR

      process.env.FAKE_ENV_VAR = ''

      expect(() => enforceEnvVars({ ALL: ['FAKE_ENV_VAR'] })).toThrow()
      process.env.FAKE_ENV_VAR = oldFakeEnvVar
    })
    it('when the required env vars match the environment and have not been set', () => {
      const oldRunMode = process.env.CARBON_RUN_MODE
      const oldFakeProdEnvVar = process.env.FAKE_PROD_ENV_VAR

      process.env.CARBON_RUN_MODE = PRODUCTION
      process.env.FAKE_PROD_ENV_VAR = ''

      expect(() => enforceEnvVars({ PRODUCTION: ['FAKE_PROD_ENV_VAR'] })).toThrow()

      process.env.CARBON_RUN_MODE = oldRunMode
      process.env.FAKE_PROD_ENV_VAR = oldFakeProdEnvVar
    })
  })

  describe('returns true', () => {
    it('when expected env vars are set', () => {
      const oldFakeEnvVar = process.env.FAKE_ENV_VAR

      process.env.FAKE_ENV_VAR = 'SOME VALUE'

      expect(enforceEnvVars({ ALL: ['FAKE_ENV_VAR'] })).toBeTruthy()

      process.env.FAKE_ENV_VAR = oldFakeEnvVar
    })

    it('when the required env vars do not match the environment', () => {
      const oldRunMode = process.env.CARBON_RUN_MODE
      const oldFakeProdEnvVar = process.env.FAKE_PROD_ENV_VAR

      process.env.CARBON_RUN_MODE = TEST
      process.env.FAKE_PROD_ENV_VAR = ''

      expect(enforceEnvVars({ PRODUCTION: ['FAKE_PROD_ENV_VAR'] })).toBeTruthy()

      process.env.CARBON_RUN_MODE = oldRunMode
      process.env.FAKE_PROD_ENV_VAR = oldFakeProdEnvVar
    })
  })

  describe('returns false', () => {
    it('when called with throwError = false and invalid env vars', () => {
      const oldFakeEnvVar = process.env.FAKE_ENV_VAR

      process.env.FAKE_ENV_VAR = ''

      expect(enforceEnvVars({ ALL: ['FAKE_ENV_VAR'] }, false)).toBeFalsy()
      process.env.FAKE_ENV_VAR = oldFakeEnvVar
    })

    it('when the required env vars match the environment and have not been set and throwError = false', () => {
      const oldRunMode = process.env.CARBON_RUN_MODE
      const oldFakeProdEnvVar = process.env.FAKE_PROD_ENV_VAR

      process.env.CARBON_RUN_MODE = DEV
      process.env.FAKE_PROD_ENV_VAR = ''

      expect(enforceEnvVars({ DEV: ['FAKE_PROD_ENV_VAR'] }, false)).toBeFalsy()

      process.env.CARBON_RUN_MODE = oldRunMode
      process.env.FAKE_PROD_ENV_VAR = oldFakeProdEnvVar
    })
  })
})
