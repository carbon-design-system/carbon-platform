/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

import { AnchorLink, AnchorLinks } from '../../../dist/main/index'

export default {
  title: 'Anchor Links',
  component: AnchorLinks
}

export const Single = () => <AnchorLink>test</AnchorLink>

export const Group = () => (
  <AnchorLinks>
    <AnchorLink>test</AnchorLink>
    <AnchorLink>test</AnchorLink>
  </AnchorLinks>
)
