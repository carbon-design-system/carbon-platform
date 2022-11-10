/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { Video } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('vimeo', (t) => {
  const result = render(<Video vimeoId="abc123">hi</Video>)

  t.snapshot(result.baseElement.innerHTML)
})
