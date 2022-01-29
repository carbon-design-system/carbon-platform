/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
class Logging {
  private component: string

  constructor(component: string) {
    this.component = component
  }

  public async debug(message: string) {
    console.debug(this.component, message)
  }

  public async info(message: string) {
    console.info(this.component, message)
  }

  public async warn(message: string) {
    console.warn(this.component, message)
  }

  public async error(message: string) {
    console.error(this.component, message)
  }
}

export { Logging }
