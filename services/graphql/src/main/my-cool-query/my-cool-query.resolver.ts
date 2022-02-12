// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { User } from '@carbon-platform/api/models'
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql'

@ObjectType()
export class MyCoolQuery {
  @Field(() => String)
  public something: string = 'asdf'

  @Field(() => String)
  public otherThing: number = 123

  @Field(() => User)
  public user?: User
}

@Resolver(MyCoolQuery)
class MyCoolQueryResolver {
  @Query(() => MyCoolQuery)
  myCoolQuery(): MyCoolQuery {
    const q = new MyCoolQuery()
    q.user = new User(1, 'Joe H', 'me@example.com')
    return q
  }
}

export { MyCoolQueryResolver }
