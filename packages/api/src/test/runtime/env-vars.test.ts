/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { loadEnvVars, RunMode } from '../../main/runtime'

describe('loadEnvVars', () => {
  it('throws error when required var is not set in Prod mode', () => {
    const oldRunMode = process.env.CARBON_RUN_MODE
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.CARBON_RUN_MODE = RunMode.Standard
    process.env.FAKE_ENV_VAR = ''

    expect(() => loadEnvVars({ FAKE_ENV_VAR: 'fallback' })).toThrow()
    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.CARBON_RUN_MODE = oldRunMode
  })

  it('returns the correct value when the envvar is set in Prod mode', () => {
    const oldRunMode = process.env.CARBON_RUN_MODE
    const oldFakeEnvVar = process.env.FAKE_ENV_VAR

    process.env.CARBON_RUN_MODE = RunMode.Standard
    process.env.FAKE_ENV_VAR = 'SOME VALUE'

    const vars = loadEnvVars({ FAKE_ENV_VAR: 'fallback' })

    expect(vars.FAKE_ENV_VAR).toBe(process.env.FAKE_ENV_VAR)

    process.env.FAKE_ENV_VAR = oldFakeEnvVar
    process.env.CARBON_RUN_MODE = oldRunMode
  })

  it('returns the fallback when required env vars have not been set in Dev mode', () => {
    const oldRunMode = process.env.CARBON_RUN_MODE
    const oldFakeStandardModeEnvVar = process.env.FAKE_STANDARD_MODE_ENV_VAR

    process.env.CARBON_RUN_MODE = RunMode.Dev
    process.env.FAKE_STANDARD_MODE_ENV_VAR = ''

    const vars = loadEnvVars({ FAKE_STANDARD_MODE_ENV_VAR: 'fallback' })

    expect(vars.FAKE_STANDARD_MODE_ENV_VAR).toBe('fallback')

    process.env.CARBON_RUN_MODE = oldRunMode
    process.env.FAKE_STANDARD_MODE_ENV_VAR = oldFakeStandardModeEnvVar
  })
})
