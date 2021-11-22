/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Caution, CircleFill, CircleStroke, Critical } from '@carbon/react/icons'

export const status = {
  draft: {
    icon: CircleStroke,
    name: 'Draft'
  },
  experimental: {
    icon: Caution,
    name: 'Experimental'
  },
  stable: {
    icon: CircleFill,
    name: 'Stable'
  },
  deprecated: {
    icon: Critical,
    name: 'Deprecated'
  }
}
