/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSyntax, Construct, Pattern, TextInput, TextLayout } from '@carbon/pictograms-react'

export const type = {
  component: {
    color: '#d0e2ff',
    icon: TextInput,
    name: 'Component',
    namePlural: 'Components',
    path: '/assets/components'
  },
  element: {
    icon: Construct,
    name: 'Element',
    namePlural: 'Elements',
    path: '/assets/elements'
  },
  function: {
    color: '#a7f0ba',
    icon: CodeSyntax,
    name: 'Function',
    namePlural: 'Functions',
    path: '/assets/functions'
  },
  pattern: {
    color: '#e8daff',
    icon: Pattern,
    name: 'Pattern',
    namePlural: 'Patterns',
    path: '/assets/patterns'
  },
  template: {
    color: '#ffd6d8',
    icon: TextLayout,
    name: 'Template',
    namePlural: 'Templates',
    path: '/assets/templates'
  }
}
