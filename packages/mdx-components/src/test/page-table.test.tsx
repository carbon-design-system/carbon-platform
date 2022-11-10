/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { PageTable } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('handles unacceptable child types', (t) => {
  const result = render(
    <div>
      <PageTable>
        <div>asf</div>
        hello
      </PageTable>
      <PageTable>
        <div>asf</div>
        {4}
      </PageTable>
      <PageTable>
        <div>asf</div>
        {true}
      </PageTable>
      <PageTable>
        {{}}
        {{}}
      </PageTable>
    </div>
  )

  t.snapshot(result.baseElement.innerHTML)
})
