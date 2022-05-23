/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InputType, PickType } from '@nestjs/graphql'

import { User } from '../models/user.model'

/**
 * Defines the object structure that can be provided to the create user mutation. It is based on the
 * User class.
 */
@InputType()
export class CreateUserInput extends PickType(User, ['email', 'name'], InputType) {}
