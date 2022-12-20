/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { MessagingClient } from '../messaging/messaging-client.js'
import { RunMode } from '../runtime/interfaces.js'
import { Runtime } from '../runtime/runtime.js'
import { RmdxResponse } from './interfaces.js'

interface RmdxConfig {
  /**
   * A runtime config instance to facilitate modifying the behavior of RMDX processing logger via
   * dependency injection.
   */
  runtime?: Runtime

  /**
   * A client containing a connection to the message broker. If not specified, one will be obtained
   * implicitly.
   */
  messagingClient?: MessagingClient
}

/**
 * Utility class that provides an easy interface for invoking RMDX messaging operations to interact
 * with the rmdx-processing microservice. It provides a static response in Dev RunMode and uses
 * messaging in Stanard RunMode.
 */
class Rmdx {
  private readonly runtime: Runtime
  private readonly messagingClient: MessagingClient

  constructor(config: RmdxConfig) {
    this.runtime = config.runtime || new Runtime()
    this.messagingClient =
      config.messagingClient || MessagingClient.getInstance({ runtime: this.runtime })
  }

  private async queryDevRmdx(): Promise<RmdxResponse> {
    return {
      frontmatter: {},
      ast: {
        children: [
          {
            children: [
              {
                value: 'Hello, world!',
                props: {
                  parentNodeType: 'heading-1'
                },
                nodeType: 'text'
              }
            ],
            props: {
              parentNodeType: 'document'
            },
            nodeType: 'heading-1'
          }
        ],
        props: {
          parentNodeType: ''
        },
        nodeType: 'document'
      },
      errors: []
    }
  }

  private async queryStandardRmdx(srcMdx: string): Promise<RmdxResponse> {
    return this.messagingClient.query('rmdx', { srcMdx })
  }

  public queryRmdx(srcMdx: string): Promise<RmdxResponse> {
    switch (this.runtime.runMode) {
      case RunMode.Dev:
        return this.queryDevRmdx()
      case RunMode.Standard:
        return this.queryStandardRmdx(srcMdx)
    }
  }
}

export { Rmdx }
