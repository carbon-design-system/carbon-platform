/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { Column } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('column offsets per breakpoint', (t) => {
  const result = render(
    <div>
      <Column offsetSm={1}>hello</Column>
      <Column offsetMd={1}>hello</Column>
      <Column offsetLg={1}>hello</Column>
      <Column offsetXl={1}>hello</Column>
      <Column offsetMax={1}>hello</Column>
    </div>
  )

  t.snapshot(result.baseElement.innerHTML)
})
