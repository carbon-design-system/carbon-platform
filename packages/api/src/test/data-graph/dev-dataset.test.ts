/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { DevDataset } from '../../main/data-graph/dev-dataset.js'

test('it throws when adding a query with a duplicate name', (t) => {
  const devDataset = new DevDataset()

  t.throws(() =>
    devDataset.addDynamic({ name: 'dup', response: {} }, { name: 'dup', response: {} })
  )
})
