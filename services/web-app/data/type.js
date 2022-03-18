/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { black, blue, green, magenta, purple, white } from '@carbon/colors'
import { CodeSyntax, Construct, Pattern, TextInput, TextLayout } from '@carbon/pictograms-react'

export const type = {
  component: {
    bgColor: blue[20],
    icon: TextInput,
    name: 'Component',
    namePlural: 'Components',
    path: '/assets/components',
    textColor: blue[60]
  },
  element: {
    bgColor: black,
    icon: Construct,
    name: 'Element',
    namePlural: 'Elements',
    path: '/assets/elements',
    textColor: white
  },
  function: {
    bgColor: green[20],
    icon: CodeSyntax,
    name: 'Function',
    namePlural: 'Functions',
    path: '/assets/functions',
    textColor: green[60]
  },
  pattern: {
    bgColor: purple[20],
    icon: Pattern,
    name: 'Pattern',
    namePlural: 'Patterns',
    path: '/assets/patterns',
    textColor: purple[60]
  },
  template: {
    bgColor: magenta[20],
    icon: TextLayout,
    name: 'Template',
    namePlural: 'Templates',
    path: '/assets/templates',
    textColor: magenta[60]
  }
}
