/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { H2 } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('h2 with no anchor', (t) => {
  const result = render(<H2 noAnchor>This is a Heading 2</H2>)

  t.snapshot(result.baseElement.innerHTML)
})
