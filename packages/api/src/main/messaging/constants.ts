/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Options } from 'amqplib'
import chalk from 'chalk'

import { loadEnvVars } from '../runtime'

/**
 * Fallback URL to use when no message queue URL is provided.
 */
const LOCAL_MESSAGE_QUEUE_URL = 'amqp://localhost:5672'

const {
  /**
   * The self-signed cert presented by the message queue.
   */
  CARBON_MESSAGE_QUEUE_CERTIFICATE,
  /**
   * Message queue to which to connect.
   */
  CARBON_MESSAGE_QUEUE_URL,
  /**
   * Username to use during message queue authentication.
   */
  CARBON_MESSAGE_QUEUE_USERNAME,
  /**
   * Password to use during message queue authentication.
   */
  CARBON_MESSAGE_QUEUE_PASSWORD
} = loadEnvVars({
  CARBON_MESSAGE_QUEUE_CERTIFICATE: '',
  CARBON_MESSAGE_QUEUE_URL: LOCAL_MESSAGE_QUEUE_URL,
  CARBON_MESSAGE_QUEUE_USERNAME: '',
  CARBON_MESSAGE_QUEUE_PASSWORD: ''
})

/**
 * Default pattern used when binding a queue to an exchange. Blank indicates that there are no
 * specific patterns being used to filter messages (i.e. **all** messages will pass through).
 */
const DEFAULT_BIND_PATTERN = ''

/**
 * Default exchange options. By default, exchanges will not be persisted to storage.
 */
const DEFAULT_EXCHANGE_OPTIONS: Options.AssertExchange = {
  durable: false
}

/**
 * Default exchange type. By default, exchanges will be set up as fanout exchanges, meaning all
 * queues bound to this exchange will receive all messages sent to the exchange.
 */
const DEFAULT_EXCHANGE_TYPE = 'fanout'

/**
 * Default queue options. By default a queue will not be persisted to storage and will not require
 * explicit acknowledgement that a received message has been processed and should be removed from
 * the queue.
 */
const DEFAULT_QUEUE_OPTIONS = {
  durable: false,
  noAck: true
}

/**
 * Defalt socket options. This incorporates a certificate representing the message queue if one was
 * provided as an environment variable.
 */
const DEFAULT_SOCKET_OPTIONS = {
  ca: CARBON_MESSAGE_QUEUE_CERTIFICATE ? [CARBON_MESSAGE_QUEUE_CERTIFICATE] : []
}

/**
 * Each service gets a queue. Services bind their queue to one or more exchanges to receive
 * messages.
 */
enum Queue {
  Github = 'q_github_v1',
  Logging = 'q_logging_v1',
  Search = 'q_search_v1'
}

// Message queue URL checking
if (CARBON_MESSAGE_QUEUE_URL === LOCAL_MESSAGE_QUEUE_URL) {
  console.warn(`${chalk.bgYellowBright.black('WARN')} Using localhost message queue url`)
}

// Add auth to message queue URL, if present
const messageQueueUrlWithAuth = CARBON_MESSAGE_QUEUE_URL.replace(
  '$USERNAME:$PASSWORD',
  `${CARBON_MESSAGE_QUEUE_USERNAME}:${CARBON_MESSAGE_QUEUE_PASSWORD}`
)

export {
  CARBON_MESSAGE_QUEUE_CERTIFICATE,
  CARBON_MESSAGE_QUEUE_PASSWORD,
  messageQueueUrlWithAuth as CARBON_MESSAGE_QUEUE_URL,
  CARBON_MESSAGE_QUEUE_USERNAME,
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  DEFAULT_SOCKET_OPTIONS,
  Queue
}
