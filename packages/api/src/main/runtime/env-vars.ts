/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRunMode, RunMode } from '.'

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
 * Retrieves environment variable value and defaults to fallback if provided (only on Dev mode)
 *
 * @param varName name of env variable
 * @param fallbackValue Value to return if env var is not set in Dev mode
 * @returns value of env variable or supplied fallback value
 */
function getEnvVar(varName: string, fallbackValue = ''): string {
  const value = process.env[varName]

  if (!value && getRunMode() === RunMode.Prod) {
    throw new Error(`${varName} is not exported as an environment variable`)
  }

  if (value) {
    return value
  } else {
    return fallbackValue
  }
}

export { loadEnvVars }
