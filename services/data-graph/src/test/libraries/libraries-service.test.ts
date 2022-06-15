/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Library } from '@carbon-platform/api/data-graph'
import test from 'ava'

import { LibrariesService } from '../../main/libraries/libraries-service.js'

test('findAll', (t) => {
  const librariesService = new LibrariesService()

  const result = librariesService.findAll()

  t.true(result instanceof Array)
})

test('findById', (t) => {
  const librariesService = new LibrariesService()

  const result = librariesService.findById('lib1')

  t.true(result instanceof Library)
})
