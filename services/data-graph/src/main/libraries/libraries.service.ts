/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Library } from '@carbon-platform/api/data-graph'
import { Nest } from '@carbon-platform/api/microservice'

@Nest.Injectable()
class LibrariesService {
  private libraries: Library[] = [
    new Library({ id: 'lib1', description: 'asdf', name: 'asdf' }),
    new Library({ id: 'lib2', description: 'asdf', name: 'asdf' }),
    new Library({ id: 'lib3', description: 'asdf', name: 'asdf' })
  ]

  findLibraryById(libraryId: string): Library | undefined {
    return this.libraries.find((library) => library.id === libraryId)
  }

  findAll(): Library[] {
    return this.libraries
  }
}

export { LibrariesService }
