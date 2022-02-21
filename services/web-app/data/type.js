/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CodeSyntax, Construct, Pattern, TextInput, TextLayout } from '@carbon/pictograms-react'

export const type = {
  component: {
    icon: TextInput,
    name: 'Component'
  },
  element: {
    icon: Construct,
    name: 'Element'
  },
  function: {
    icon: CodeSyntax,
    name: 'Function'
  },
  pattern: {
    icon: Pattern,
    name: 'Pattern'
  },
  template: {
    icon: TextLayout,
    name: 'Template'
  }
}
