/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LogLoggedMessage } from '../logging'

/**
 * An incoming message to a service is first treated as unvalidated. Once validated, the incoming
 * message type should be asserted as some type of [EventMessage or QueryMessage] payload.
 */
interface UnvalidatedMessage {
  [key: string]: any
}

// TODO: move this
interface DataGraphMessage {
  query: string
}

// TODO: move this
interface DataGraphResponse {
  stuff: string
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

export { EventMessage, QueryMessage, UnvalidatedMessage }
