/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DataGraphMessage, DataGraphResponse } from '../data-graph/index.js'
import { LogLoggedMessage } from '../logging/index.js'
import { RmdxMessage, RmdxResponse } from '../rmdx/index.js'

/**
 * A utility type used to help define QueryMessage types. The first type argument is the payload
 * type of the QueryMessage. The second type argument is the response type of the QueryMessage. The
 * response type cannot be nullable, since a null or undefined query response is used to indicate an
 * unknown failure.
 */
interface QueryDef<Payload, Response extends NonNullable<unknown>> {
  payload: Payload
  response: Response
}

/**
 * A utility type used to help define EventMessage types. The type argument is the payload type of
 * the EventMessage.
 */
interface EventDef<Payload> {
  payload: Payload
}

/**
 * An incoming message to a service is first treated as unvalidated. Once validated, the incoming
 * message type should be asserted as some type of [EventMessage or QueryMessage] payload.
 */
type UnvalidatedMessage<T> = Partial<T>

/**
 * EventMessages can be `emit()`ted by a `MessagingClient` and are sent to an exchange whose name is
 * based on the EventMessage key.
 */
interface EventMessage {
  log_logged: EventDef<LogLoggedMessage>

  // TODO: make this real
  user_logged_in: EventDef<string>

  // For testing purposes
  null: EventDef<null>
}

/**
 * QueryMessages can be `query()`'d by a `MessagingClient` and are sent to an exchange whose name is
 * based on the QueryMessage key.
 */
interface QueryMessage {
  data_graph: QueryDef<DataGraphMessage, DataGraphResponse>

  rmdx: QueryDef<RmdxMessage, RmdxResponse>

  // For testing purposes
  ping: QueryDef<string, string>
}

/**
 * Each service gets a queue. Services bind their queue to one or more exchanges to receive
 * messages.
 */
enum Queue {
  DataGraph = 'q_data_graph_v1',
  Logging = 'q_logging_v1',
  Rmdx = 'q_rmdx_v1',
  Search = 'q_search_v1'
}

export { EventMessage, QueryMessage, Queue, UnvalidatedMessage }
