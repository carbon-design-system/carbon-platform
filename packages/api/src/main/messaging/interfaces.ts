/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DataGraphMessage, DataGraphResponse } from '../data-graph/index.js'
import { LogLoggedMessage } from '../logging/index.js'

/**
 * An incoming message to a service is first treated as unvalidated. Once validated, the incoming
 * message type should be asserted as some type of [EventMessage or QueryMessage] payload.
 */
interface UnvalidatedMessage {
  [key: string]: any
}

/**
 * EventMessages can be `emit()`ted by a `MessagingClient` and are sent to an exchange whose name is
 * based on the EventMessage key.
 */
interface EventMessage {
  log_logged: { payload: LogLoggedMessage }

  // TODO: make this real
  user_logged_in: { payload: string }

  // For testing purposes
  null: { payload: null }
}

/**
 * QueryMessages can be `query()`'d by a `MessagingClient` and are sent to an exchange whose name is
 * based on the QueryMessage key.
 */
interface QueryMessage {
  data_graph: { payload: DataGraphMessage; response: DataGraphResponse }

  // For testing purposes
  ping: { payload: string; response: string }
}

/**
 * Each service gets a queue. Services bind their queue to one or more exchanges to receive
 * messages.
 */
enum Queue {
  DataGraph = 'q_data_graph_v1',
  Logging = 'q_logging_v1',
  Search = 'q_search_v1'
}

export { EventMessage, QueryMessage, Queue, UnvalidatedMessage }
