/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CreateUserInput, User } from '@carbon-platform/api/data-graph'
import { Trace } from '@carbon-platform/api/microservice'
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { UsersService } from './users-service.js'

@Resolver(User)
export class UsersResolver {
  private readonly userService: UsersService

  constructor(userService: UsersService) {
    this.userService = userService
  }

  @Trace()
  @Query(() => [User])
  users(@Args('id', { type: () => ID, nullable: true }) id: string | undefined): User[] {
    if (!id) {
      return this.userService.findAll()
    }

    const user = this.userService.findById(id)

    if (!user) {
      return []
    }

    return [user]
  }

  // This adds a field to the User type emitted in the gql schema
  @Trace()
  @ResolveField(() => Int)
  age(@Parent() user: User): number {
    return Number.parseInt(user.id) * 10
  }

  @Trace()
  @Mutation(() => User)
  async createUser(@Args('newUserData') newUserData: CreateUserInput) {
    return this.userService.create(newUserData)
  }
}
