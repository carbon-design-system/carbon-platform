/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Library } from '@carbon-platform/api/data-graph'

import { LibrariesResolver } from '../../main/libraries/libraries-resolver'

const testLibraries = [
  new Library({ id: 'lib1', description: 'asdf1 description', name: 'asdf1' }),
  new Library({ id: 'lib2', description: 'asdf2 description', name: 'asdf2' })
]

const mockedLibrariesService = {
  findAll: jest.fn(() => testLibraries)
}

test('libraries', () => {
  const librariesResolver = new LibrariesResolver(mockedLibrariesService as any)

  const result = librariesResolver.libraries()

  expect(result).toBe(testLibraries)
})
