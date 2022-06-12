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
  callback?: (connection: amqp.Connection, channel: amqp.ConfirmChannel) => void | Promise<void>
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
      component: 'messaging-connection',
      isRemoteLoggingEnabled: false
    })
  }

  private setUpErrorHandlers() {
    this.connection?.once('error', (err) => {
      this.logging.error('Messaging connection emitted an error')
      this.logging.error(err)

      this.close()
    })

    this._channel?.once('error', (err) => {
      this.logging.error('Messaging channel emitted an error')
      this.logging.error(err)

      this.close()
    })
  }

  /**
   * The underlying channel of the messaging connection. This lazily establishes the connection to
   * the message broker. Once the connection is established, the callback provided in the config
   * object to the constructor will be invoked prior to the channel being returned to the caller.
   *
   * **NOTE:** This can throw if there is an issue either connecting or running the provided
   * callback.
   */
  public get channel(): Promise<amqp.ConfirmChannel> {
    // Guard - Connection attempt is either already pending or has been completed
    if (this.channelPromise) {
      return this.channelPromise
    }

    // No existing connection. Set up a promise of a new one
    this.channelPromise = (async () => {
      let isFirstTry = true

      while (!this.connection || !this._channel) {
        try {
          if (isFirstTry) {
            // Use a URL object to avoid logging usernames and passwords included in the url
            const url = new URL(this.config.url.replace(/^amqp/, 'http'))
            this.logging.info('Connecting to message broker at ' + url.host)
          }

          this.connection = await amqp.connect(this.config.url, this.config.socketOptions)

          this.setUpErrorHandlers()

          this._channel = await this.connection.createConfirmChannel()
        } catch (e) {
          if (isFirstTry) {
            this.logging.error('Could not connect to messaging service')
            if (e instanceof Error) {
              this.logging.error(e)
            }
          }

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

      this.config.callback && this.logging.debug(`-> callback: ${this.config.callback.name}()`)
      this.config.callback?.(this.connection, this._channel)
      this.config.callback && this.logging.debug(`<- callback: ${this.config.callback.name}()`)

      return this._channel
    })()

    return this.channelPromise
  }

  public async close(logStatus = true, destroyPromise = true) {
    logStatus && this.logging.debug('Closing messaging connection')

    try {
      await Promise.race([
        this._channel?.waitForConfirms(),
        new Promise((_resolve, reject) => {
          setTimeout(
            () => reject(new Error('Timed out waiting for confirms')),
            WAIT_FOR_CONFIRMS_TIMEOUT
          )
        })
      ])
    } catch (e) {
      if (logStatus) {
        this.logging.warn(
          'Exception caught waiting for confirms while trying to close messaging connection'
        )
        if (e instanceof Error) {
          this.logging.warn(e)
        }
      }
    }

    try {
      await this._channel?.close()
    } catch (e) {
      if (logStatus) {
        this.logging.warn(
          'Exception caught closing channel while trying to close messaging connection'
        )
        if (e instanceof Error) {
          this.logging.warn(e)
        }
      }
    }

    try {
      await this.connection?.close()
    } catch (e) {
      if (logStatus) {
        this.logging.warn('Exception caught while trying to close messaging connection')
        if (e instanceof Error) {
          this.logging.warn(e)
        }
      }
    }

    // Future uses of this connection will trigger a reconnect
    delete this._channel
    delete this.connection
    destroyPromise && delete this.channelPromise
  }
}

export { MessagingConnection }
