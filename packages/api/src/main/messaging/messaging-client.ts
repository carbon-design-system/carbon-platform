/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import amqp from 'amqplib'
import { v4 as uuidv4 } from 'uuid'

import { Logging } from '../logging/logging.js'
import { Runtime } from '../runtime/index.js'
import { CARBON_MESSAGE_QUEUE_URL, DEFAULT_SOCKET_OPTIONS } from './constants.js'
import { EventMessage, QueryMessage } from './interfaces.js'
import { MessagingConnection } from './messaging-connection.js'

const RANDOM_QUEUE_NAME = ''
const DEFAULT_ROUTING_KEY = ''
const RETRY_INTERVAL = 5000

type ReplyCallbacks = Map<
  string,
  {
    resolve: (
      value:
        | QueryMessage[keyof QueryMessage]['response']
        | Promise<QueryMessage[keyof QueryMessage]['response']>
    ) => void
    reject: (reason?: unknown) => void
  }
>

interface MessagingClientConfig {
  runtime: Runtime
}

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
  public static getInstance(config?: MessagingClientConfig): MessagingClient {
    if (!MessagingClient.instance) {
      MessagingClient.instance = new MessagingClient(config)
    }

    return MessagingClient.instance
  }

  private readonly logging: Logging
  private messagingConnection: MessagingConnection
  private replyQueue?: amqp.Replies.AssertQueue
  private replyCallbacks: ReplyCallbacks
  private runtime: Runtime

  private constructor(config?: MessagingClientConfig) {
    this.runtime = config?.runtime || new Runtime()

    this.logging = new Logging({
      component: 'MessagingClient',
      isRemoteLoggingEnabled: false
    })

    this.replyCallbacks = new Map()

    this.messagingConnection = new MessagingConnection({
      url: CARBON_MESSAGE_QUEUE_URL,
      socketOptions: DEFAULT_SOCKET_OPTIONS,
      retry: true,
      onChannelReady: this.handleChannelReady.bind(this)
    })
  }

  private async handleChannelReady(channel: amqp.ConfirmChannel) {
    this.replyQueue = await channel.assertQueue(RANDOM_QUEUE_NAME, {
      exclusive: true
    })

    // Listen for responses on the reply queue
    await channel.consume(
      this.replyQueue.queue,
      this.handleReply.bind(this),
      // No explicit acks needed, since this is the service's personal reply queue
      { noAck: true }
    )
  }

  /**
   * Internal callback used when consuming messages received on the reply queue (i.e. responses to
   * `query` calls).
   *
   * @param reply The message received from the broker.
   */
  private handleReply(reply: amqp.ConsumeMessage | null) {
    const correlationId = reply?.properties.correlationId as string
    const callback = this.replyCallbacks.get(correlationId)

    if (!callback) {
      return
    }

    // Obtain the "response" from the message
    const response = reply?.content ? JSON.parse(reply.content.toString())?.response : undefined

    // Check the response for an error and reject the promise if found. Otherwise resolve it
    if (!response || response?.__error) {
      callback.reject(response?.__error)
    } else {
      callback.resolve(response)
    }

    this.replyCallbacks.delete(correlationId)
  }

  private async publishAndConfirm(
    channel: amqp.ConfirmChannel,
    exchange: string,
    content: Buffer,
    options?: amqp.Options.Publish
  ) {
    const publishResult = channel.publish(exchange, DEFAULT_ROUTING_KEY, content, options)

    // `publish` returns true if it is safe to continue sending messages; or false if pending
    // "confirms" should first be awaited
    if (!publishResult) {
      await channel.waitForConfirms()
    }
  }

  /**
   * Severs the connection to the message broker and cleans up any related resources.
   */
  public async disconnect() {
    await this.messagingConnection.close()

    this.replyCallbacks.clear()
  }

  /**
   * Asynchronously broadcasts a message to all services that are listening for messages of the
   * specified event type. Use this method to broadcast that "something happened" and when no
   * response is expected in return.
   *
   * @param eventType The type of message being broadcast.
   * @param payload The body of the message.
   * @returns A promise that resolves when the message has been confirmed by the message broker.
   */
  public async emit<EventType extends keyof EventMessage>(
    eventType: EventType,
    payload: EventMessage[EventType]['payload']
  ): Promise<void> {
    const dataToSend = {
      pattern: eventType,
      data: payload
    }

    let done = false
    while (!done) {
      try {
        const channel = await this.messagingConnection.channel

        await this.publishAndConfirm(
          channel,
          this.runtime.withEnvironment(eventType),
          Buffer.from(JSON.stringify(dataToSend))
        )

        done = true
      } catch (e) {
        this.logging.error('Unexpected exception thrown while publishing a message')
        if (e instanceof Error) {
          this.logging.error(e)
        }

        // Try again after a few seconds
        await new Promise((resolve) => {
          setTimeout(resolve, RETRY_INTERVAL)
        })
      }
    }
  }

  /**
   * Asynchronously sends a message to the service that has identified itself as being capable of
   * handling the specified type of query. Use this method for point-to-point communication between
   * services when it is expected that the remote service should respond to the specified query.
   *
   * @param queryType The type of the query message to send.
   * @param payload The body of the message.
   * @returns A promise that resolves to a response object for the specified queryType. The object
   * represents a de-serialized version of the correlated reply received from the remote service.
   */
  public async query<Type extends keyof QueryMessage>(
    queryType: Type,
    payload: QueryMessage[Type]['payload']
  ): Promise<QueryMessage[Type]['response']> {
    const correlationId = uuidv4()
    const dataToSend = {
      pattern: queryType,
      id: correlationId,
      data: payload
    }

    // Create a new promise and store its resolve callback in the registry. Resolve is called later
    // on when a correlated response is received from the reply queue
    const replyPromise = new Promise<QueryMessage[Type]['response']>((resolve, reject) => {
      this.replyCallbacks.set(correlationId, { resolve, reject })
    })

    let done = false
    while (!done) {
      try {
        const channel = await this.messagingConnection.channel

        await this.publishAndConfirm(
          channel,
          this.runtime.withEnvironment(queryType),
          Buffer.from(JSON.stringify(dataToSend)),
          {
            replyTo: this.replyQueue!.queue,
            correlationId
          }
        )

        done = true
      } catch (e) {
        this.logging.error('Unexpected exception thrown while publishing a message')
        if (e instanceof Error) {
          this.logging.error(e)
        }

        // Try again after a few seconds
        await new Promise((resolve) => {
          setTimeout(resolve, RETRY_INTERVAL)
        })
      }
    }

    return replyPromise
  }
}

const __test__ = {
  destroyInstance: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is a test hook
    const unlockedMessagingClient = MessagingClient as any

    if (unlockedMessagingClient.instance) {
      unlockedMessagingClient.instance.disconnect()
      unlockedMessagingClient.instance = null
    }
  },
  RANDOM_QUEUE_NAME
}

export { __test__, MessagingClient }
