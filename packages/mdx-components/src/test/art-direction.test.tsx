/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { ArtDirection } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('art direction renders without crashing', (t) => {
  const result = render(
    <ArtDirection>
      <img alt="mobile" src="mobile" />
      <img alt="tablet" src="tablet" />
      <img alt="desktop" src="desktop" />
    </ArtDirection>
  )

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('art direction with single child renders without crashing', (t) => {
  const result = render(
    <ArtDirection>
      <img alt="mobile" src="mobile" />
    </ArtDirection>
  )

  t.snapshot(result.baseElement.innerHTML)
})
