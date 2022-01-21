/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import amqp from 'amqplib'
import { v4 as uuidv4 } from 'uuid'

import { EventMessage, QueryMessage } from './config'
import { MESSAGE_QUEUE_URL } from './constants'

const RANDOM_QUEUE_NAME = ''
const DEFAULT_ROUTING_KEY = ''
const CONNECT_RETRY_INTERVAL = 5000

type ReplyCallbacks = Map<string, (value: any) => void>

/**
 * MessagingClient is the main way in which services interact with the message broker. It is
 * accessed as a singleton instance via `MessagingClient.getInstance()`. The two main methods
 * provided are `emit` and `query`. Emit is used to broadcast a message to all other services
 * without expectation of a response. Query is used to send a message with the expectation of
 * receiveing a correlated reply from another service.
 */
class MessagingClient {
  private static instance?: MessagingClient

  /**
   * Obtain a singleton instance of a MessagingClient used to send messages.
   *
   * @returns The singleton.
   */
  public static getInstance(): MessagingClient {
    if (!MessagingClient.instance) {
      MessagingClient.instance = new MessagingClient()
    }

    return MessagingClient.instance
  }

  private connection?: amqp.Connection
  private channel?: amqp.ConfirmChannel
  private replyQueue?: amqp.Replies.AssertQueue
  private replyCallbacks: ReplyCallbacks

  private constructor() {
    this.replyCallbacks = new Map()
  }

  /**
   * Establishes a connection, channel, and reply queue with the message broker. Most users of this
   * class will not need to call this, as it is implicitly called before all other methods. It is
   * public for testing purposes.
   *
   * @param retry Whether or not to indefinitely wait for a connection to be established before
   * allowing this method to return.
   * @returns The channel that was established after connecting to the message broker.
   */
  public async connect(retry = true): Promise<amqp.ConfirmChannel> {
    while (!this.connection || !this.channel) {
      try {
        this.connection = await amqp.connect(MESSAGE_QUEUE_URL)

        this.channel = await this.connection.createConfirmChannel()
        this.replyQueue = await this.channel.assertQueue(RANDOM_QUEUE_NAME, { exclusive: true })

        // Listen for responses on the reply queue
        await this.channel.consume(
          this.replyQueue.queue,
          this.replyReceived.bind(this),
          // No explicit acks needed, since this is the service's personal reply queue
          { noAck: true }
        )
      } catch (e) {
        console.error('Could not connect to messaging service', e)

        this.disconnect()

        if (retry) {
          // Retry again after a few seconds
          await new Promise((resolve) => {
            setTimeout(resolve, CONNECT_RETRY_INTERVAL)
          })
        } else {
          throw e
        }
      }
    }

    return this.channel
  }

  /**
   * Internal callback used when consuming messages received on the reply queue (i.e. responses to
   * `query` calls).
   *
   * @param reply The message received from the broker.
   */
  private replyReceived(reply: amqp.ConsumeMessage | null) {
    const correlationId = reply?.properties.correlationId as string
    const resolve = this.replyCallbacks.get(correlationId)

    if (!resolve) {
      return
    }

    resolve(reply?.content.toString())
    this.replyCallbacks.delete(correlationId)
  }

  /**
   * Severs the connection to the message broker and cleans up any related resources.
   */
  public async disconnect() {
    if (this.channel) {
      await this.channel.close()
      delete this.channel
    }

    if (this.connection) {
      await this.connection.close()
      delete this.connection
    }

    this.replyCallbacks.clear()
  }

  /**
   * Asynchronously broadcasts a message to all services that are listening for the specified
   * message type. Use this method to broadcast that "something happened" and when no response is
   * expected in return.
   *
   * @param eventType The type of message being broadcast.
   * @param message The body of the message.
   * @returns A promise that resolves when the message has been confirmed by the message broker.
   */
  public async emit(eventType: EventMessage, message: any): Promise<void> {
    // Connect and ensure channel is established
    const channel = await this.connect()

    // Entire method invocation is deferred and returned as a promise
    return new Promise((resolve) => {
      const dataToSend = {
        pattern: eventType,
        data: message
      }

      // Send to queue returns true if it is safe to continue sending messages; or false if pending
      // "confirms" should first be awaited
      const sendResult = channel.publish(
        eventType,
        DEFAULT_ROUTING_KEY,
        Buffer.from(JSON.stringify(dataToSend))
      )

      // Typically an emit would not be awaited, but resolving the Promise after a successful send
      // ensures that it can be
      if (sendResult) {
        resolve()
      } else {
        channel.waitForConfirms().then(resolve)
      }
    })
  }

  /**
   * Asynchronously sends a message to the service that has identified itself as being capable of
   * handling the specified type of query. Use this method for point-to-point communication between
   * services when it is expected that the remote service should respond to the specified query.
   *
   * This method is generic and accepts a type indicating the type of the returned message.
   *
   * @param queryType The type of message being broadcast.
   * @param message The body of the message.
   * @returns A promise that resolves to an object of the specified type. The object represents a
   * de-serialized version of the correlated reply received from the remote service.
   */
  public async query<T>(queryType: QueryMessage, message: any): Promise<T> {
    // Connect and ensure channel and reply queue are established
    const channel = await this.connect()

    const correlationId = uuidv4()
    const dataToSend = {
      pattern: queryType,
      id: correlationId,
      data: message
    }

    // Create a new promise and store its resolve callback in the registry. Resolve is called later
    // on when a correlated response is received from the reply queue
    const replyPromise = new Promise<T>((resolve) => {
      this.replyCallbacks.set(correlationId, resolve)
    })

    // Publish returns true if it is safe to continue sending messages; or false if pending
    // "confirms" should first be awaited
    const publishResult = channel.publish(
      queryType,
      DEFAULT_ROUTING_KEY,
      Buffer.from(JSON.stringify(dataToSend)),
      {
        replyTo: this.replyQueue!.queue,
        correlationId: correlationId
      }
    )

    if (!publishResult) {
      await channel.waitForConfirms()
    }

    return replyPromise
  }
}

const __test__ = {
  destroyInstance: () => {
    const unlocked = MessagingClient as any

    if (unlocked.instance) {
      unlocked.instance.disconnect()
      unlocked.instance = null
    }
  },
  RANDOM_QUEUE_NAME
}

export { __test__, MessagingClient }
