/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import amqp from 'amqplib'

import { Logging } from '../logging/logging.js'

const CONNECT_RETRY_INTERVAL = 3000

interface MessagingConnectionConfig {
  callback?: () => void | Promise<void>
  url: string
  retry: boolean
  socketOptions: any
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
      while (!this.connection || !this._channel) {
        try {
          this.logging.info('Connecting to message broker at ' + this.config.url)

          this.connection = await amqp.connect(this.config.url, this.config.socketOptions ?? {})

          this.setUpErrorHandlers()

          this._channel = await this.connection.createConfirmChannel()
        } catch (e) {
          this.logging.error('Could not connect to messaging service')
          if (e instanceof Error) {
            this.logging.error(e)
          }

          await this.close()

          if (this.config.retry) {
            // Retry again after a few seconds
            await new Promise((resolve) => {
              setTimeout(resolve, CONNECT_RETRY_INTERVAL)
            })
          } else {
            throw e
          }
        }
      }

      this.config.callback?.()

      return this._channel
    })()

    return this.channelPromise
  }

  public async close() {
    this.logging.debug('Closing messaging connection')

    try {
      await this._channel?.close()
      await this.connection?.close()
    } catch (e) {
      this.logging.warn('Exception caught while trying to close an existing messaging connection')
      if (e instanceof Error) {
        this.logging.warn(e)
      }
    }

    // Future uses of this connection will trigger a reconnect
    delete this._channel
    delete this.connection
    delete this.channelPromise
  }
}

export { MessagingConnection }
