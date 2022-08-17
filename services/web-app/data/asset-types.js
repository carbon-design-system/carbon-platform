/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { blue, green, magenta, purple } from '@carbon/colors'
import { CodeSyntax, Dashboard, Pattern, TextInput } from '@carbon/pictograms-react'

export const assetTypes = {
  component: {
    bgColor: blue[20],
    icon: TextInput,
    name: 'Component',
    namePlural: 'Components',
    path: '/assets/components',
    textColor: blue[70]
  },
  function: {
    bgColor: green[20],
    icon: CodeSyntax,
    name: 'Function',
    namePlural: 'Functions',
    path: '/assets/functions',
    textColor: green[70]
  },
  pattern: {
    bgColor: purple[20],
    icon: Pattern,
    name: 'Pattern',
    namePlural: 'Patterns',
    path: '/assets/patterns',
    textColor: purple[70]
  },
  template: {
    bgColor: magenta[20],
    icon: Dashboard,
    name: 'Template',
    namePlural: 'Templates',
    path: '/assets/templates',
    textColor: magenta[70]
  }
}
