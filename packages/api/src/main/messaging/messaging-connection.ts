/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import amqp from 'amqplib'

const CONNECT_RETRY_INTERVAL = 5000

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
  private actualConnection?: amqp.Connection
  private actualChannel?: amqp.ConfirmChannel
  private channelPromise?: Promise<amqp.ConfirmChannel>

  public constructor(config: MessagingConnectionConfig) {
    this.config = config
  }

  /**
   * TODO: docs
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
          this.actualConnection = await amqp.connect(
            this.config.url,
            this.config.socketOptions ?? {}
          )
          this.actualChannel = await this.actualConnection.createConfirmChannel()
        } catch (e) {
          console.error('Could not connect to messaging service', e)

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

      this.config.callback?.bind(this)()

      return this.actualChannel
    })()

    return this.channelPromise
  }

  public async close() {
    console.warn('Closing messaging connection')

    try {
      await this.actualChannel?.close()
      await this.actualConnection?.close()
    } catch (e) {
      console.warn('Exception caught while trying to close an existing messaging connection', e)
    }

    // Future uses of this connection will trigger a reconnect
    delete this.actualChannel
    delete this.actualConnection
    delete this.channelPromise
  }
}

export { MessagingConnection }
