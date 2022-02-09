// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewUserInput } from './dto/new-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './models/user.model'
import { UserService } from './user.service'

@Resolver((of) => User)
export class UserResolver {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  @Query((returns) => User)
  user(@Args({ name: 'id', type: () => ID }) id: number): User {
    return this.userService.findUserById(id)
  }

  @Query((returns) => [User])
  users(): User[] {
    return this.userService.findAll()
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput) {
    return this.userService.createUser(newUserData)
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('partialUserData') partialUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(id, partialUserData)
  }
}
