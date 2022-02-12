// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name?: string

  @Field(() => String)
  email?: string
}
