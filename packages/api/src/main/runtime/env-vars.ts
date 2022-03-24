/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRunMode, RunMode } from '.'
import { Environment, getEnvironment } from './environment'

type Fallback = string

interface Vars {
  [key: string]: Fallback | undefined
}

type Validated<Type> = {
  [Property in keyof Type]: string
}

function loadEnvVars<T extends Vars>(vars: T): Validated<T> {
  const validated = {
    ...vars
  } as Validated<T>

  Object.entries(validated).forEach(([key, fallback]) => {
    validated[key as keyof Validated<T>] = getEnvVar(key, fallback)
  })

  return validated
}

/**
 * Does one of three things:
 * - Retrieve an environment variable's value (if it is set)
 * - Return a default, fallback value (if the var is not set and the app is running in dev mode or
 *   in a build environment).
 * - Otherwise, throws an exception, indicating that the specified var is required.
 *
 * @param varName Name of env variable
 * @param fallbackValue Value to return if env var is not set in Dev mode
 * @returns Value of env variable or supplied fallback value
 */
function getEnvVar(varName: string, fallbackValue = ''): string {
  const value = process.env[varName]

  if (!value && getRunMode() !== RunMode.Dev && getEnvironment() !== Environment.Build) {
    throw new Error(`${varName} is not exported as an environment variable`)
  }

  if (value) {
    return value
  } else {
    return fallbackValue
  }
}

export { loadEnvVars }
