/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { ArticleCard } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('column offsets per breakpoint', (t) => {
  const result = render(
    <div>
      <ArticleCard actionIcon="arrowRight">
        <img src="wowimagesrc" alt="" />
      </ArticleCard>
      <ArticleCard actionIcon="disabled">
        <img src="wowimagesrc" alt="" />
      </ArticleCard>
      <ArticleCard actionIcon="download">
        <img src="wowimagesrc" alt="" />
      </ArticleCard>
      <ArticleCard actionIcon="email">
        <img src="wowimagesrc" alt="" />
      </ArticleCard>
      <ArticleCard actionIcon="launch">
        <img src="wowimagesrc" alt="" />
      </ArticleCard>
    </div>
  )

  t.snapshot(result.baseElement.innerHTML)
})
