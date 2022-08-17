/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { AnchorLink, AnchorLinks, ColorBlock } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('color block renders without crashing', (t) => {
  const result = render(<ColorBlock>#0066ff</ColorBlock>)

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('anchor links renders without crashing', (t) => {
  const result = render(
    <AnchorLinks>
      <AnchorLink>Link 1</AnchorLink>
    </AnchorLinks>
  )

  t.snapshot(result.baseElement.innerHTML)
})
