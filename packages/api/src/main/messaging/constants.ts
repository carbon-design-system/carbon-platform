/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Options } from 'amqplib'
import chalk from 'chalk'

import { getRunMode, PROD } from '../run-mode'

const DEBUG = process.env.CARBON_DEBUG === 'true'
const LOCAL_MESSAGE_QUEUE_URL = 'amqp://localhost:5672'
const MESSAGE_QUEUE_URL = process.env.CARBON_MESSAGE_QUEUE_URL || LOCAL_MESSAGE_QUEUE_URL

const DEFAULT_BIND_PATTERN = ''
const DEFAULT_QUEUE_OPTIONS = {
  durable: false,
  noAck: true
}
const DEFAULT_EXCHANGE_OPTIONS: Options.AssertExchange = {
  durable: false
}
const DEFAULT_EXCHANGE_TYPE = 'fanout'

// Message queue URL checking
if (getRunMode() === PROD && !process.env.CARBON_MESSAGE_QUEUE_URL) {
  throw new Error('CARBON_MESSAGE_QUEUE_URL must be set in PROD run mode')
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
