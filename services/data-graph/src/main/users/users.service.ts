/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CreateUserInput, User } from '@carbon-platform/api/data-graph'
import { Injectable } from '@nestjs/common'

@Injectable()
class UsersService {
  private users: User[] = [
    { id: '1', name: 'Jane Doe 1', email: 'jane.doe1@example.com' },
    { id: '2', name: 'Jane Doe 2', email: 'jane.doe2@example.com' },
    { id: '3', name: 'Jane Doe 3', email: 'jane.doe3@example.com' },
    { id: '4', name: 'Jane Doe 4', email: 'jane.doe4@example.com' }
  ]

  findUserById(userId: string): User | undefined {
    return this.users.find((user) => user.id === userId)
  }

  findAll(): User[] {
    return this.users
  }

  createUser(userInput: CreateUserInput): User {
    const user: User = {
      id: String(Math.max(...this.users.map((u) => Number.parseInt(u.id))) + 1),
      name: userInput.name,
      email: userInput.email
    }
    this.users.push(user)
    return user
  }

  // updateUser(id: number, userInput: UpdateUserInput): User {
  //   let user = this.findUserById(id)
  //   if (!user) {
  //     throw new Error('user with given id could not be found')
  //   }
  //   user = {
  //     ...user,
  //     ...userInput
  //   }
  //   return user
  // }
}

export { UsersService }
