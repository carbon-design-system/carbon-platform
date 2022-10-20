/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import test from 'ava'

import { DevDataset } from '../../main/data-graph/dev-dataset.js'

test('it throws when adding a query with a duplicate name', (t) => {
  const devDataset = new DevDataset()

  t.throws(() =>
    devDataset.addDynamic({ name: 'dup', responseData: {} }, { name: 'dup', responseData: {} })
  )
})

test('it does not throw when adding a query with the same name and different variables', (t) => {
  const devDataset = new DevDataset()

  t.notThrows(() =>
    devDataset.addDynamic(
      { name: 'dup', variables: { different: 'yeah' }, responseData: {} },
      { name: 'dup', variables: {}, responseData: {} }
    )
  )
})
