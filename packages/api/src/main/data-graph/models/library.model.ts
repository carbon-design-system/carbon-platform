/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Field, ID, ObjectType } from '@nestjs/graphql'

const defaultValues = {
  demoLinks: [],
  noIndex: false,
  packageJsonPath: '/package.json'
}

@ObjectType({
  description:
    'Libraries are the means to contribute, install, and use one or many assets in ' +
    'products and digital experiences.'
})
class Library {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  description: string

  @Field(() => String, { nullable: true })
  inherits?: string

  @Field(() => String, { defaultValue: defaultValues.packageJsonPath })
  packageJsonPath: string = defaultValues.packageJsonPath

  @Field(() => String, { nullable: true })
  externalDocsUrl?: string

  @Field(() => [String], { defaultValue: defaultValues.demoLinks })
  demoLinks: string[] = defaultValues.demoLinks

  @Field(() => Boolean, { defaultValue: defaultValues.noIndex })
  noIndex: boolean = defaultValues.noIndex

  /**
   * A constructor for the required fields of a library.
   *
   * @param library An object containing the required fields of the library.
   * @param library.id The identifier of the library.
   * @param library.name The name of the library.
   * @param library.description The description of the library.
   */
  constructor(library: { id: string; name: string; description: string }) {
    this.id = library.id
    this.name = library.name
    this.description = library.description
  }
}

export { Library }
