/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging, Trace } from '@carbon-platform/api/logging'
import { Runtime } from '@carbon-platform/api/runtime'
import { AllowedComponents, AstNode, process } from '@carbon-platform/rmdx'
import { Inject, Injectable } from '@nestjs/common'

/**
 * An injectable service that can translate source MDX into an RMDX AST.
 */
@Injectable()
class RmdxService {
  private readonly logging: Logging
  private readonly allowedComponents: AllowedComponents

  public constructor(
    runtime: Runtime,
    @Inject('ALLOWED_COMPONENTS') allowedComponents: AllowedComponents
  ) {
    this.logging = new Logging({ component: 'RmdxService', runtime })
    this.allowedComponents = allowedComponents
  }

  @Trace()
  public process(srcMdx: string): AstNode {
    // TODO: log warnings and/or errors?
    return process(srcMdx, this.allowedComponents)
  }
}

export { RmdxService }
