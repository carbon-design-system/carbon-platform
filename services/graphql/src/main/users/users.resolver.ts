// TODO: remove
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { User } from '@carbon-platform/api/models'
import { Args, ID, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { UserService } from './users.service'

@Resolver(User)
export class UsersResolver {
  private readonly userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  @Query(() => User)
  user(@Args({ name: 'id', type: () => ID }) id: number): User {
    console.log('does it still have to call this?')
    return this.userService.findUserById(id)
  }

  @Query(() => [User])
  users(): User[] {
    return this.userService.findAll()
  }

  // This overrides the name field resolution
  @ResolveField(() => String)
  name(@Parent() user: User): string {
    return 'Awesome Name'
  }

  // This adds a field to the User type emitted in the gql schema
  @ResolveField(() => Int)
  age(@Parent() user: User): number {
    return user.id * 10
  }

  // @Mutation((returns) => User)
  // async addUser(@Args('newUserData') newUserData: NewUserInput) {
  //   return this.userService.createUser(newUserData)
  // }

  // @Mutation((returns) => User)
  // async updateUser(
  //   @Args({ name: 'id', type: () => ID }) id: number,
  //   @Args('partialUserData') partialUserData: UpdateUserInput
  // ) {
  //   return this.userService.updateUser(id, partialUserData)
  // }
}
