// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  email: string
}
