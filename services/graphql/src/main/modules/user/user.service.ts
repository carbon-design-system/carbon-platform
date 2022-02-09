/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Injectable } from '@nestjs/common'

import { NewUserInput } from './dto/new-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './models/user.model'

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Jane Doe 1', email: 'jane.doe1@example.com' },
    { id: 2, name: 'Jane Doe 2', email: 'jane.doe2@example.com' },
    {
      id: 3,
      name: 'Jane Doe 3',
      email: 'jane.doe3@example.com'
    },
    { id: 4, name: 'Jane Doe 4', email: 'jane.doe4@example.com' }
  ]

  // TODO: what to do if this is undefined
  findUserById(userId: number): User {
    return this.users.find((user) => user.id === Number(userId))!
  }

  findAll(): User[] {
    return this.users
  }

  createUser(userInput: NewUserInput): User {
    const user: User = {
      ...userInput,
      id:
        Math.max(
          ...this.users.map(function (o) {
            return o.id
          })
        ) + 1
    }
    this.users.push(user)
    return user
  }

  updateUser(id: number, userInput: UpdateUserInput): User {
    let user = this.findUserById(id)
    if (!user) {
      throw new Error('user with given id could not be found')
    }
    user = {
      ...user,
      ...userInput
    }
    return user
  }
}
