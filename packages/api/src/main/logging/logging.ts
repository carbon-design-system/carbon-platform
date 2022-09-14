/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import chalk from 'chalk'

import { MessagingClient } from '../messaging/index.js'
import { Environment, RunMode, Runtime } from '../runtime/index.js'
import { CARBON_SERVICE_NAME } from './constants.js'
import { Loggable, LogLevel, LogLoggedMessage } from './interfaces.js'

const logColors = {
  debug: chalk.bgMagenta,
  info: chalk.bgBlue,
  warn: chalk.bgYellow,
  error: chalk.bgRed
}

interface LoggingConfig {
  /**
   * A freeform string that allows a second layer of search/tagging on logs.
   * Typically this is something like a class name, file name, or other name describing a "chunk"
   * of code or logic.
   */
  component: string

  /**
   * The name of the service under which this instance should create logs. If not specified, this
   * will default to the value obtained from the CARBON_SERVICE_NAME envvar.
   */
  service?: string

  /**
   * A client containing a connection to the message broker. If not specified, one will be obtained
   * implicitly.
   */
  messagingClient?: MessagingClient

  /**
   * A runtime config instance to facilitate modifying the behavior of the logger via dependency
   * injection.
   */
  runtime?: Runtime

  /**
   * Explicit override of remote logging
   */
  isRemoteLoggingEnabled?: boolean
}

/**
 * An instantiatable class that provides API methods that can be used to log application data. In
 * "Dev" run mode, logs are only output locally. In "Standard" run mode, they are sent as messages
 * to the logging service, which ultimately logs them in LogDNA.
 */
class Logging {
  /**
   * Sets the global setting for whether or not remote logging is allowed to be enabled. This
   * supersedes all environment-based switches and instance-based overrides.
   */
  public static isRemoteLoggingAllowed = true

  /**
   * The currently set component value for this logging instance. This can be manually re-set as
   * needed.This is useful when wanting to reuse a single logging instance across multiple
   * components.
   *
   * @param component The new component string to use.
   */
  public component: string

  private readonly runtime: Runtime
  private readonly isDebugLoggingEnabled: boolean
  private readonly isRemoteLoggingEnabled: boolean
  private readonly messagingClient?: MessagingClient
  private readonly service: string

  /**
   * Creates a Logging instance for the given service/component combo.
   *
   * @param config Configuration options for the Logging instance.
   */
  constructor(config: LoggingConfig) {
    this.component = config.component
    this.runtime = config.runtime || new Runtime()

    // Runtime always takes precedence, if set
    this.isDebugLoggingEnabled = this.runtime.isDebugEnabled ?? this.runtime.runMode === RunMode.Dev

    if (Logging.isRemoteLoggingAllowed) {
      this.isRemoteLoggingEnabled =
        config.isRemoteLoggingEnabled ??
        (this.runtime.runMode === RunMode.Standard &&
          this.runtime.environment !== Environment.Build)
    } else {
      this.isRemoteLoggingEnabled = false
    }

    this.service = config.service || CARBON_SERVICE_NAME

    if (this.isRemoteLoggingEnabled) {
      this.messagingClient = config.messagingClient || MessagingClient.getInstance()
    }
  }

  /**
   * Logs a debugging message. This includes things like important function entry/exit, the size of
   * a list obtained from a remote source, the results after filtering an input set, etc.
   *
   * **NOTE:** Debug messaging is enabled in the "Dev" run mode and disabled in the "Standard" run
   * mode. It is safe and acceptable to leave debug statements in code, where appropriate, unlike
   * `console.log` statements, which would typically be removed from production code.
   *
   * **NOTE:** Debug logging can be turned on for a service running in "Standard" mode if
   * `CARBON_DEBUG=true` is exported as an environment variables. This isn't typically needed, but
   * can be useful for advanced debugging of production-running applications.
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
    // Make errors/exceptions look a specific way
    if (message instanceof Error) {
      message = message.stack || message.name + ': ' + message.message
    }

    return {
      component: this.component,
      level,
      message,
      environment: this.runtime.environment,
      service: this.service,
      timestamp: Date.now()
    }
  }

  /**
   * Logs the logEntry to all appropriate log destinations.
   *
   * @param logEntry The log entry to log.
   */
  private async log(logEntry: LogLoggedMessage) {
    // Only log to the console in dev mode
    if (this.runtime.runMode !== RunMode.Standard) {
      this.logConsole(logEntry)
    }

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

    const lines = String(logEntry.message).split(/\r?\n|\r/)

    lines.forEach((line) => {
      // Using concatenation because it is slightly faster than template literals
      console[logEntry.level](
        this.getDateString(date) +
          chalk.magenta(' service:' + logEntry.service + ' ') +
          colorizer(logEntry.level) +
          chalk.green(' [' + logEntry.component + '] ') +
          line
      )
    })
  }

  private getDateString(date: Date) {
    return (
      date.getFullYear() +
      '-' +
      String(date.getMonth()).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0') +
      ' ' +
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0') +
      '.' +
      String(date.getMilliseconds()).padStart(3, '0')
    )
  }

  /**
   * Sends the log entry as an emitted event to the message broker for consolidating remote logging
   * by the logging service.
   *
   * @param logEntry The log entry to log.
   */
  private async logRemote(logEntry: LogLoggedMessage) {
    await this.messagingClient?.emit('log_logged', logEntry)
  }
}

export { Logging }
