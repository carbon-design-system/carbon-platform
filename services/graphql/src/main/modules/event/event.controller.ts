/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { GraphQlMessage, QueryMessage } from '@carbon-platform/api/messaging'
import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { UserResolver } from '../user/user.resolver'

@Controller()
class EventController {
  private readonly userResolver: UserResolver

  constructor(userResolver: UserResolver) {
    this.userResolver = userResolver
  }

  @EventPattern(QueryMessage.GraphqlQuery)
  public async userSearched(@Payload() data: GraphQlMessage) {
    console.log('received Query:', data)
    // const queryRes = await fetch('http://localhost:3000/graphql', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query: data.query })
    // })
    // if (queryRes.ok) {
    //   return queryRes.json().then((res) => {
    //     return res.data
    //   })
    // } else {
    //   return 'unexpected error occured'
    // }
    return this.userResolver.user(2)
  }
}

export { EventController }
