/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CreateUserInput, User } from '@carbon-platform/api/data-graph'
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { UsersService } from './users.service'

@Resolver(User)
export class UsersResolver {
  private readonly userService: UsersService

  constructor(userService: UsersService) {
    this.userService = userService
  }

  @Query(() => User, { nullable: true })
  user(@Args({ name: 'id', type: () => ID }) id: string): User | undefined {
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
    return 'Awesome Name' + user.name
  }

  // This adds a field to the User type emitted in the gql schema
  @ResolveField(() => Int)
  age(@Parent() user: User): number {
    return Number.parseInt(user.id) * 10
  }

  @Mutation(() => User)
  async createUser(@Args('newUserData') newUserData: CreateUserInput) {
    return this.userService.createUser(newUserData)
  }

  // @Mutation((returns) => User)
  // async updateUser(
  //   @Args({ name: 'id', type: () => ID }) id: number,
  //   @Args('partialUserData') partialUserData: UpdateUserInput
  // ) {
  //   return this.userService.updateUser(id, partialUserData)
  // }
}
