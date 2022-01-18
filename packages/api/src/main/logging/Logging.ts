/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import chalk from 'chalk'

import { EventMessage, MessagingClient } from '../messaging'
import { DEBUG } from '../messaging/constants' // TODO: fix this
import { DEV, getRunMode, PROD } from '../run-mode'
import { LogLevel, LogLoggedMessage } from './interfaces'

const logColors = {
  debug: chalk.magenta,
  info: chalk.blue,
  warn: chalk.yellow,
  error: chalk.red
}

type Loggable = string | number | boolean | Array<any> | Object | Error

class Logging {
  private readonly component: string
  private readonly environment: string
  private readonly isDebugLoggingEnabled: boolean
  private readonly isRemoteLoggingEnabled: boolean
  private readonly messagingClient: MessagingClient
  private readonly service: string

  constructor(serviceName: string, component: string) {
    this.component = component
    // TODO: this should be based on an envvar indicating whether the service is running in a test
    // environment or a prod environment
    this.environment = 'PRODUCTION'
    this.isDebugLoggingEnabled = getRunMode() === DEV || DEBUG
    this.isRemoteLoggingEnabled = getRunMode() === PROD
    this.service = serviceName

    if (this.isRemoteLoggingEnabled) {
      this.messagingClient = MessagingClient.getInstance()
    }
  }

  public async debug(message: Loggable) {
    if (!this.isDebugLoggingEnabled) {
      return
    }

    const logEntry = this.createMessage(message, 'debug')
    await this.log(logEntry)
  }

  public async info(message: string) {
    const logEntry = this.createMessage(message, 'info')
    await this.log(logEntry)
  }

  public async warn(message: string | Error) {
    const logEntry = this.createMessage(message, 'warn')
    await this.log(logEntry)
  }

  public async error(message: string | Error) {
    const logEntry = this.createMessage(message, 'error')
    await this.log(logEntry)
  }

  private createMessage(message: Loggable, level: LogLevel): LogLoggedMessage {
    if (message instanceof Error) {
      message = message.stack || message.name + ': ' + message.message
    } else if (typeof message !== 'string') {
      message = String(message)
    }

    return {
      component: this.component,
      level,
      message,
      environment: this.environment,
      service: this.service,
      timestamp: new Date().getTime()
    }
  }

  private async log(logEntry: LogLoggedMessage) {
    this.logConsole(logEntry)

    if (this.isRemoteLoggingEnabled) {
      await this.logRemote(logEntry)
    }
  }

  private logConsole(logEntry: LogLoggedMessage) {
    const colorizer = logColors[logEntry.level]
    const date = new Date(logEntry.timestamp)

    // Using concatenation because it is slightly faster than template literals
    console[logEntry.level](
      date.toLocaleString() +
        chalk.magenta(' service:' + logEntry.service) +
        colorizer(' ' + logEntry.level) +
        chalk.green(' [' + logEntry.component + '] ') +
        logEntry.message
    )
  }

  private async logRemote(logEntry: LogLoggedMessage) {
    await this.messagingClient?.emit(EventMessage.LogLogged, logEntry)
  }
}

export { Logging }
