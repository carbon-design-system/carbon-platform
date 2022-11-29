/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { ResourceCard } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('disabled', (t) => {
  const result = render(
    <ResourceCard
      subTitle="With subtitle"
      title="Title"
      aspectRatio="2:1"
      actionIcon="arrowRight"
      href="https://www.carbondesignsystem.com"
      disabled
    >
      <img src="" alt="Use markdown for images in mdx files. ![](img.png)" />
    </ResourceCard>
  )

  t.snapshot(result.baseElement.innerHTML)
})

test.serial('color', (t) => {
  const result = render(
    <ResourceCard
      subTitle="With subtitle"
      title="Title"
      aspectRatio="2:1"
      actionIcon="arrowRight"
      href="https://www.carbondesignsystem.com"
      color="dark"
    >
      <img src="" alt="Use markdown for images in mdx files. ![](img.png)" />
    </ResourceCard>
  )

  t.snapshot(result.baseElement.innerHTML)
})
