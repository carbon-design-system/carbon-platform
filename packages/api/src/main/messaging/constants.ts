/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Options } from 'amqplib'
import chalk from 'chalk'

import { getRunMode, RunMode } from '../run-mode'

const DEBUG = process.env.CARBON_DEBUG === 'true'
const LOCAL_MESSAGE_QUEUE_URL = 'amqp://localhost:5672'
const MESSAGE_QUEUE_URL = process.env.CARBON_MESSAGE_QUEUE_URL || LOCAL_MESSAGE_QUEUE_URL

/**
 * Default pattern used when binding a queue to an exchange. Blank indicates that there are no
 * specific patterns being used to filter messages (i.e. **all** messages will pass through).
 */
const DEFAULT_BIND_PATTERN = ''

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

// Message queue URL checking
if (getRunMode() === RunMode.Prod && !process.env.CARBON_MESSAGE_QUEUE_URL) {
  throw new Error('CARBON_MESSAGE_QUEUE_URL must be set in RunMode.Prod run mode')
}
if (MESSAGE_QUEUE_URL === LOCAL_MESSAGE_QUEUE_URL) {
  console.warn(`${chalk.bgYellowBright.black('WARN')} Using localhost message queue url`)
}

export {
  DEBUG,
  DEFAULT_BIND_PATTERN,
  DEFAULT_EXCHANGE_OPTIONS,
  DEFAULT_EXCHANGE_TYPE,
  DEFAULT_QUEUE_OPTIONS,
  MESSAGE_QUEUE_URL
}
