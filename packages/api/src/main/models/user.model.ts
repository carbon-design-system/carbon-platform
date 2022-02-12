/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  constructor(id: number, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }
}
