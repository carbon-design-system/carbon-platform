/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql'
@ObjectType()
class MediumPost {
  @Field(() => ID)
  id: string

  @Field(() => String)
  publicationName: string

  @Field(() => String)
  title: string

  @Field(() => String)
  author: string

  @Field(() => String)
  thumbnail: string

  @Field(() => String)
  link: string

  @Field(() => GraphQLTimestamp)
  date: number

  constructor(
    id: string,
    publicationName: string,
    title: string,
    author: string,
    thumbnail: string,
    link: string,
    date: number
  ) {
    this.id = id
    this.publicationName = publicationName
    this.title = title
    this.author = author
    this.thumbnail = thumbnail
    this.link = link
    this.date = date
  }
}

export { MediumPost }
