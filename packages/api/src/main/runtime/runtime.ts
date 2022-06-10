/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getEnvironment } from './get-environment.js'
import { getRunMode } from './get-run-mode.js'
import { Environment, RunMode } from './interfaces.js'
import { isDebugEnabled } from './is-debug-enabled.js'

interface RuntimeConfig {
  isDebugEnabled?: boolean
  runMode?: RunMode
  environment?: Environment
}

class Runtime {
  private config?: RuntimeConfig

  /**
   * Gets the current environment in which the code is running. This is based on the
   * CARBON_ENVIRONMENT environment variable and defaults to "Test".
   */
  public get environment(): Environment {
    return this.config?.environment || getEnvironment()
  }

  /**
   * Returns an indication of whether or not debug mode is currently turned on. This is based on the
   * CARBON_DEBUG environment variable.
   *
   * @returns true if debug mode is enabled; false otherwise.
   */
  public get isDebugEnabled(): boolean {
    return this.config?.isDebugEnabled ?? isDebugEnabled()
  }

  /**
   * The currently set run mode either from the CARBON_RUN_MODE environment variable or from
   * the default value.
   */
  public get runMode(): RunMode {
    return this.config?.runMode || getRunMode()
  }

  public constructor(config?: RuntimeConfig) {
    this.config = config
  }

  /**
   * Returns a string that is a combination of the current environment enum and the provided input
   * string. The string is of the form "[Environment]_[input string]".
   *
   * For example: input: `hello world`; output: `PRODUCTION_hello world`
   *
   * @param input The string off of which the return value is based.
   * @returns A string that includes environment enum information.
   */
  public withEnvironment(input: string): string {
    return `${this.environment}_${input}`
  }
}

export { Runtime }
