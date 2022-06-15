/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Library } from '@carbon-platform/api/data-graph'
import test from 'ava'

import { LibrariesResolver } from '../../main/libraries/libraries-resolver.js'

const testLibraries = [
  new Library({ id: 'lib1', description: 'asdf1 description', name: 'asdf1' }),
  new Library({ id: 'lib2', description: 'asdf2 description', name: 'asdf2' })
]

const mockedLibrariesService = {
  findAll: () => testLibraries
}

test('libraries', (t) => {
  const librariesResolver = new LibrariesResolver(mockedLibrariesService as any)

  const result = librariesResolver.libraries()

  t.deepEqual(result, testLibraries)
})
