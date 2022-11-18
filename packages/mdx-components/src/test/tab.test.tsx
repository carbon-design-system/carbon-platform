/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { Tab } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('tabs renders without crashing', (t) => {
  const result = render(
    <Tab astNode={{ props: { label: 'Tab 1' } }} _id="1" index={1}>
      wow tab
    </Tab>
  )

  t.snapshot(result.baseElement.innerHTML)
})
