/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DynamicModule, Type } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { RmqOptions, Transport } from '@nestjs/microservices'

import { Logging, requestLogMiddleware } from '../logging/index.js'
import {
  CARBON_MESSAGE_QUEUE_URL,
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  DEFAULT_SOCKET_OPTIONS,
  EventMessage,
  QueryMessage,
  Queue
} from '../messaging/index.js'
import { MessagingConnection } from '../messaging/messaging-connection.js'
import { Runtime } from '../runtime/index.js'
import { PORT } from './constants.js'
import { QueryMessageExceptionInterceptor } from './interceptors/query-message-exception-interceptor.js'
import { RpcRequestLogInterceptor } from './interceptors/rpc-request-log-interceptor.js'
import { UncaughtExceptionInterceptor } from './interceptors/uncaught-exception-interceptor.js'
import { RuntimeModule } from './runtime-module.js'

type BindableMessage = EventMessage | QueryMessage

type BindableMessageKey<T extends BindableMessage> = T extends EventMessage
  ? keyof EventMessage
  : keyof QueryMessage

interface MicroserviceConfig {
  /**
   * The NestJS module that defines all of the controller and providers for this microservice. This
   * type loosely matches what is expected by a NestJS "imports" directive.
   */
  module: Type<unknown> | DynamicModule | Promise<DynamicModule>

  /**
   * Whether or not to enable automatic removal of messages from the associated queue. Defaults to
   * false if not specified.
   */
  autoAck?: boolean

  /**
   * The name of the queue from which to consume messages.
   */
  queue: Queue

  /**
   * Runtime configuration object.
   */
  runtime?: Runtime
}

class PlatformMicroservice {
  private readonly module: MicroserviceConfig['module']
  private readonly autoAck: boolean
  private readonly queueName: string
  private readonly runtime: Runtime
  private readonly logging: Logging
  private messagingConnection?: MessagingConnection

  constructor(config: MicroserviceConfig) {
    this.module = config.module
    this.autoAck = config.autoAck || false
    this.runtime = config.runtime || new Runtime()
    this.logging = new Logging({ component: 'PlatformMicroservice', runtime: this.runtime })
    // Use a queue name that is environment-specific
    this.queueName = this.runtime.withEnvironment(config.queue)
  }

  /**
   * Creates a dynamic module containing the provided module along with a RuntimeModule based on the
   * provided runtime object.
   *
   * @returns The dynamic module object.
   */
  private createRootModule(): DynamicModule {
    return {
      module: class PlatformMicroserviceRootModule {},
      imports: [RuntimeModule.register(this.runtime), this.module]
    }
  }

  /**
   * Binds a queue to one or more message types, allowing it to listen for and receive messages of
   * those types.
   *
   * This is accomplished by connecting to RabbitMQ, asserting the constructor-specified queue,
   * asserting an exchange for each message type, binding the queue to the newly asserted exchanges,
   * and then disconnecting from RabbitMQ.
   *
   * This function is generic and can optionally take either EventMessage or QueryMessage as a type
   * argument. This will narrow the scope of choices of message types for IDE auto-complete
   * purposes.
   *
   * @param messageTypes The types of messages to which to bind.
   */
  public async bind<T extends BindableMessage>(
    ...messageTypes: [BindableMessageKey<T>, ...Array<BindableMessageKey<T>>]
  ) {
    if (!this.messagingConnection) {
      this.messagingConnection = new MessagingConnection({
        url: CARBON_MESSAGE_QUEUE_URL,
        socketOptions: DEFAULT_SOCKET_OPTIONS,
        retry: true
      })
    }

    const channel = await this.messagingConnection.channel

    await channel.assertQueue(this.queueName, DEFAULT_QUEUE_OPTIONS)

    for (const messageType of messageTypes) {
      // Use an exchange name that is environment-specific
      const exchange = this.runtime.withEnvironment(messageType)

      await channel.assertExchange(exchange, DEFAULT_EXCHANGE_TYPE, DEFAULT_EXCHANGE_OPTIONS)
      await channel.bindQueue(this.queueName, exchange, DEFAULT_BIND_PATTERN)

      this.logging.info(`Service bound to queue: ${this.queueName}`)
    }

    await this.messagingConnection.close()
  }

  /**
   * Starts the service listening for incoming messages and REST API requests.
   *
   * @returns A promise that never resolves.
   */
  public async start(): Promise<unknown> {
    const application = await NestFactory.create(this.createRootModule())

    const { httpAdapter } = application.get(HttpAdapterHost)

    httpAdapter.use(requestLogMiddleware())

    // Order matters!
    application.useGlobalInterceptors(
      new UncaughtExceptionInterceptor(),
      new RpcRequestLogInterceptor(),
      new QueryMessageExceptionInterceptor()
    )

    application.connectMicroservice<RmqOptions>(
      {
        transport: Transport.RMQ,
        options: {
          noAck: this.autoAck,
          socketOptions: DEFAULT_SOCKET_OPTIONS,
          queue: this.queueName,
          queueOptions: DEFAULT_QUEUE_OPTIONS,
          urls: [CARBON_MESSAGE_QUEUE_URL]
        }
      },
      { inheritAppConfig: true }
    )

    // Invoke all initialization side effects before listening for incoming requests
    await application.init()

    await application.startAllMicroservices()
    return application.listen(PORT)
  }
}

export { PlatformMicroservice }
