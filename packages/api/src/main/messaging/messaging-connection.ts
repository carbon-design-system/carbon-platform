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
  private actualConnection?: amqp.Connection
  private actualChannel?: amqp.ConfirmChannel
  private channelPromise?: Promise<amqp.ConfirmChannel>

  public constructor(config: MessagingConnectionConfig) {
    this.config = config
    this.logging = new Logging({
      component: 'messaging-connection',
      isRemoteLoggingEnabled: false
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
      while (!this.actualConnection || !this.actualChannel) {
        try {
          this.logging.debug('Connecting to message broker at ' + this.config.url)

          this.actualConnection = await amqp.connect(
            this.config.url,
            this.config.socketOptions ?? {}
          )

          this.actualChannel = await this.actualConnection.createConfirmChannel()
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

      return this.actualChannel
    })()

    return this.channelPromise
  }

  public async close() {
    this.logging.debug('Closing messaging connection')

    try {
      await this.actualChannel?.close()
      await this.actualConnection?.close()
    } catch (e) {
      this.logging.warn('Exception caught while trying to close an existing messaging connection')
      if (e instanceof Error) {
        this.logging.warn(e)
      }
    }

    // Future uses of this connection will trigger a reconnect
    delete this.actualChannel
    delete this.actualConnection
    delete this.channelPromise
  }
}

export { MessagingConnection }
