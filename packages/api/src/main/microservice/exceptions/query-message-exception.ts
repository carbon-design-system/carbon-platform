/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RpcException } from '@nestjs/microservices'

/**
 * This is a base type that can be extended for the purposes of throwing exceptions in Platform
 * microservice query message handlers. When throw from inside a query message handler exceptions
 * extending this class will be automatically intercepted, serialized, and sent back to the caller
 * in a way which causes the caller's message response Promise to `reject`.
 */
class QueryMessageException extends RpcException {}

export { QueryMessageException }
