/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { Column, Row } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('row renders without crashing', (t) => {
  const result = render(
    <Row>
      <Column colSm={2} colMd={4} colLg={4}>
        #### 1. Contained button A. Text label <br /> B. Container <br /> C. Icon (optional) #### 3.
        Ghost button A. Text label <br /> C. Icon (optional)
      </Column>
      <Column colSm={2} colMd={4} colLg={4}>
        #### 1. Contained button A. Text label <br /> B. Container <br /> C. Icon (optional) #### 3.
        Ghost button A. Text label <br /> C. Icon (optional)
      </Column>
    </Row>
  )

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('row with string child', (t) => {
  const result = render(<Row>{'a string'}</Row>)

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('row with number child', (t) => {
  const result = render(<Row>{4}</Row>)

  t.snapshot(result.baseElement.innerHTML)
})
