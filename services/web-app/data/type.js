/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { black, blue, gray, green, magenta, purple, warmGray, white } from '@carbon/colors'
import { CodeSyntax, Construct, Dashboard, Pattern, TextInput } from '@carbon/pictograms-react'

export const type = {
  component: {
    bgColor: blue[20],
    icon: TextInput,
    name: 'Component',
    namePlural: 'Components',
    path: '/assets/components',
    textColor: blue[70]
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
  },
  'design-only': {
    bgColor: gray[20],
    name: 'Design Only',
    path: '/assets',
    textColor: gray[70]
  },
  collection: {
    bgColor: warmGray[20],
    icon: Construct,
    name: 'Collection',
    namePlural: 'Collections',
    textColor: gray[70]
  }
}
