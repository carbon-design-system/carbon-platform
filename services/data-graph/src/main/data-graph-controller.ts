/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DataGraphMessage, DataGraphResponse } from '@carbon-platform/api/data-graph'
import { UnvalidatedMessage } from '@carbon-platform/api/messaging'
import { Trace } from '@carbon-platform/api/microservice'
import { Controller } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { GraphQLSchemaHost } from '@nestjs/graphql'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { graphql, GraphQLSchema } from 'graphql'

import { validateDataGraphMessage } from './validate-data-graph-message'

@Controller()
class DataGraphController {
  private moduleRef: ModuleRef
  private schema?: GraphQLSchema

  constructor(moduleRef: ModuleRef) {
    this.moduleRef = moduleRef
  }

  @Trace()
  @MessagePattern('data_graph')
  public async dataGraph(
    @Payload() data: UnvalidatedMessage,
    @Ctx() context: RmqContext
  ): Promise<DataGraphResponse> {
    // Lazy load the schema
    if (!this.schema) {
      this.schema = this.moduleRef.get(GraphQLSchemaHost, { strict: false }).schema
    }

    let dataGraphMessage: DataGraphMessage

    try {
      dataGraphMessage = validateDataGraphMessage(data)
    } catch (e) {
      // Remove the message from the exchange with a negative ack
      context.getChannelRef().nack()
      throw e
    }

    // Actually query the data-graph
    const result = await graphql({
      schema: this.schema,
      source: dataGraphMessage.query,
      variableValues: dataGraphMessage.variables
    })

    // Ack the message since we have a valid response
    context.getChannelRef().ack(context.getMessage())

    return {
      data: result.data || {},
      errors: result.errors
    }
  }
}

export { DataGraphController }
