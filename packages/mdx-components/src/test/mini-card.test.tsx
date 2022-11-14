/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { cleanup, render } from '@testing-library/react'
import test from 'ava'
import React from 'react'

import { MiniCard } from '../main/index.js'

test.afterEach(() => {
  cleanup()
})

test.serial('mini card renders without crashing', (t) => {
  const result = render(
    <>
      <MiniCard
        title="Tree view component"
        href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
        actionIcon="download"
      />
      <MiniCard
        title="Tree view component"
        href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
        actionIcon="calendar"
      />
      <MiniCard
        title="Tree view component"
        href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
        actionIcon="email"
      />
      <MiniCard
        title="Tree view component"
        href="https://carbon-website-git-fork-designertyler-treeview03092020.carbon-design-system.now.sh/components/tree-view/usage"
        actionIcon="launch"
      />
    </>
  )

  t.snapshot(result.baseElement.innerHTML)
})
