/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import amqp from 'amqplib'

import { Logging } from '../logging/logging.js'
import { CONNECT_RETRY_INTERVAL } from './constants.js'

const WAIT_FOR_CONFIRMS_TIMEOUT = 3000

interface MessagingConnectionConfig {
  onChannelReady?: (channel: amqp.ConfirmChannel) => void | Promise<void>
  url: string
  retry: boolean
  socketOptions: {
    [key: string]: any
  }
}

/**
 * Wrapper class around message broker connection properties.
 */
class MessagingConnection {
  private readonly config: MessagingConnectionConfig
  private readonly logging: Logging
  private connection?: amqp.Connection
  private _channel?: amqp.ConfirmChannel
  private channelPromise?: Promise<amqp.ConfirmChannel>

  public constructor(config: MessagingConnectionConfig) {
    this.config = config
    this.logging = new Logging({
      component: 'MessagingConnection',
      isRemoteLoggingEnabled: false
    })
  }

  /**
   * The underlying channel of the messaging connection. This lazily establishes the connection to
   * the message broker. Once the connection is established, the callback provided in the config
   * object to the constructor will be invoked prior to the channel being returned to the caller.
   *
   * **NOTE:** This method will throw if the provided callback throws. It will also throw in the
   * event of a connection error if the MessagingConnection object is configured with retry=false.
   */
  public get channel(): Promise<amqp.ConfirmChannel> {
    // Guard - Connection attempt is either already pending or has been completed
    if (this.channelPromise) {
      return this.channelPromise
    }

    // No existing connection. Set up a promise of a new one
    this.channelPromise = this.establishConnection()

    return this.channelPromise
  }

  private async establishConnection() {
    let isFirstTry = true

    while (!this.connection || !this._channel) {
      try {
        isFirstTry && this.logConnectionAttempt()

        this.connection = await amqp.connect(this.config.url, this.config.socketOptions)
        this._channel = await this.connection.createConfirmChannel()
        this.setUpErrorHandlers()
      } catch (e) {
        isFirstTry && this.logConnectionFailure(e)

        // Cleanup, but don't destory the promise we're currently inside
        await this.close(isFirstTry, false)

        if (this.config.retry) {
          // Retry again after a few seconds
          await new Promise((resolve) => {
            setTimeout(resolve, CONNECT_RETRY_INTERVAL)
          })
        } else {
          throw e
        }
      }

      isFirstTry = false
    }

    this.logging.info('Successfully connected to message broker')

    if (this.config.onChannelReady) {
      this.logging.debug(`-> callback: ${this.config.onChannelReady.name}()`)
      await this.config.onChannelReady(this._channel)
      this.logging.debug(`<- callback: ${this.config.onChannelReady.name}()`)
    }

    return this._channel
  }

  public async close(shouldLogStatus = true, destroyPromise = true) {
    shouldLogStatus && this.logging.debug('Closing messaging connection')

    await this.waitForConfirms(WAIT_FOR_CONFIRMS_TIMEOUT, shouldLogStatus)

    await this.closeResource(
      this._channel,
      'Exception caught closing channel while trying to close messaging connection'
    )

    await this.closeResource(
      this.connection,
      'Exception caught while trying to close messaging connection'
    )

    // Future uses of this connection will trigger a reconnect
    delete this._channel
    delete this.connection
    destroyPromise && delete this.channelPromise
  }

  private async closeResource(closeable: { close: Function } | undefined, failureText: string) {
    try {
      await closeable?.close()
    } catch (e) {
      this.logging.debug(failureText)
      if (e instanceof Error) {
        this.logging.debug(e)
      }
    }
  }

  private logConnectionAttempt() {
    // Use a URL object to avoid logging usernames and passwords included in the url
    const url = new URL(this.config.url.replace(/^amqp/, 'http'))
    this.logging.info('Connecting to message broker at ' + url.host)
  }

  private logConnectionFailure(err: unknown) {
    this.logging.error('Could not connect to messaging service')
    if (err instanceof Error) {
      this.logging.error(err)
    }
  }

  private setUpErrorHandlers() {
    this.connection?.once('error', async (err) => {
      this.logging.error('Messaging connection emitted an error')
      this.logging.error(err)

      await this.close()
    })

    this.connection?.once('close', async (err) => {
      this.logging.warn('Messaging connection closed')
      err && this.logging.warn(err)

      await this.close()
    })

    this._channel?.once('error', async (err) => {
      this.logging.error('Messaging channel emitted an error')
      this.logging.error(err)

      await this.close()
    })

    this._channel?.once('close', async (err) => {
      this.logging.warn('Messaging channel closed')
      err && this.logging.warn(err)

      await this.close()
    })
  }

  /**
   * Waits up to the specified amount of time for message confirmations to finish.
   *
   * @param timeout Maximum time in milliseconds to wait for confirms.
   * @param shouldLogStatus Whether or not to log status.
   */
  private async waitForConfirms(timeout: number, shouldLogStatus: boolean) {
    try {
      await Promise.race([
        this._channel?.waitForConfirms(),
        new Promise((_resolve, reject) => {
          setTimeout(() => reject(new Error('Timed out waiting for confirms')), timeout)
        })
      ])
    } catch (e) {
      if (shouldLogStatus) {
        this.logging.warn('Exception caught waiting for confirms')
        if (e instanceof Error) {
          this.logging.warn(e)
        }
      }
    }
  }
}

export { MessagingConnection }
