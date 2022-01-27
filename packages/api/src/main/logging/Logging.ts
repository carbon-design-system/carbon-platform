/*
 * Copyright IBM Corp. 2021, 2022
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

/**
 * An instantiatable class that provides API methods that can be used to log application data. In
 * DEV run mode, logs are only output locally. In PROD run mode, they are sent as messages to the
 * logging service, which ultimately logs them in LogDNA.
 */
class Logging {
  private readonly component: string
  private readonly environment: string
  private readonly isDebugLoggingEnabled: boolean
  private readonly isRemoteLoggingEnabled: boolean
  private readonly messagingClient?: MessagingClient
  private readonly service: string

  /**
   * Creates a Logging instance for the given service/component combo.
   *
   * @param serviceName The name of the service under which this instance should create logs.
   * @param component A freeform string that allows a second layer of search/tagging on logs.
   * Typically this is something like a class name, file name, or other name describing a "chunk"
   * of code or logic.
   */
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

  /**
   * Logs a debugging message. This includes things like important function entry/exit, the size of
   * a list obtained from a remote source, the results after filtering an input set, etc.
   *
   * **NOTE:** Debug messaging is enabled in the DEV run mode and disabled in the PROD run mode. It
   * is safe and acceptable to leave debug statements in code, where appropriate, unlike
   * `console.log` statements, which would typically be removed from production code.
   *
   * **NOTE:** Debug logging can be turned on for a service running in PROD mode if `DEBUG=true` is
   * exported as an environment variables. This isn't typically needed, but can be useful for
   * advanced debugging of production-running applications.
   *
   * @param message The message to log.
   */
  public async debug(message: Loggable) {
    if (!this.isDebugLoggingEnabled) {
      return
    }

    const logEntry = this.createMessage(message, 'debug')
    await this.log(logEntry)
  }

  /**
   * Logs an informational message. This is useful for point-in-time events, such as a service
   * becoming ready, a user account being created, a configuration setting being updated, a new data
   * ingestion endpoint becoming available, etc.
   *
   * @param message The message to log.
   */
  public async info(message: string) {
    const logEntry = this.createMessage(message, 'info')
    await this.log(logEntry)
  }

  /**
   * Logs a warning message. Warnings are typically unexpected situations, but do not represent a
   * breakdown of the core application logic. Examples include a user account becoming locked due to
   * failed login attempts, encountering an expected file that cannot be found or is blank, usages
   * of deprecated APIs, an operation taking longer than expected, etc.
   *
   * @param message The message to log.
   */
  public async warn(message: string | Error) {
    const logEntry = this.createMessage(message, 'warn')
    await this.log(logEntry)
  }

  /**
   * Logs an error message. Errors are unexpected situations and often represent a breakdown in core
   * logic. This often means entering the `catch` block of a `try/catch` statement. It can also mean
   * encountering `undefined` or `null` where values are expected to be present.
   *
   * @param message The message to log.
   */
  public async error(message: string | Error) {
    const logEntry = this.createMessage(message, 'error')
    await this.log(logEntry)
  }

  /**
   * Creates a message object ready to be logged locally or remotely.
   *
   * @param message The actual message to log.
   * @param level The log level (debug, info, warn, error).
   * @returns An object containing the log and associated metadata.
   */
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

  /**
   * Logs the logEntry to all appropriate log destinations.
   *
   * @param logEntry The log entry to log.
   */
  private async log(logEntry: LogLoggedMessage) {
    this.logConsole(logEntry)

    if (this.isRemoteLoggingEnabled) {
      await this.logRemote(logEntry)
    }
  }

  /**
   * Logs a log to the console with pretty colors.
   *
   * @param logEntry The log entry to log.
   */
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

  /**
   * Sends the log entry as an emitted event to the message broker for consolidating remote logging
   * by the logging service.
   *
   * @param logEntry The log entry to log.
   */
  private async logRemote(logEntry: LogLoggedMessage) {
    await this.messagingClient?.emit(EventMessage.LogLogged, logEntry)
  }
}

export { Logging }
