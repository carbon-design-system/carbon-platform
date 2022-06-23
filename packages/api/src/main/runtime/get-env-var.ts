/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment, RunMode } from './interfaces.js'
import { Runtime } from './runtime.js'

/**
 * Does one of three things:
 * - Retrieve an environment variable's value (if it is set)
 * - Return a default, fallback value (if the var is not set and the app is running in dev mode or
 *   in a build environment).
 * - Otherwise, throws an exception, indicating that the specified var is required.
 *
 * @param varName Name of env variable
 * @param fallbackValue Value to return if env var is not set in Dev mode
 * @param runtime Runtime configuration object
 * @returns Value of env variable or supplied fallback value
 */
function getEnvVar(varName: string, fallbackValue = '', runtime: Runtime): string {
  const value = process.env[varName]

  if (!value && runtime.runMode !== RunMode.Dev && runtime.environment !== Environment.Build) {
    throw new Error(`${varName} is not exported as an environment variable`)
  }

  if (value) {
    return value
  } else {
    return fallbackValue
  }
}

export { getEnvVar }
