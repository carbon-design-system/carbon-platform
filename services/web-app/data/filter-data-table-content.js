/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tag } from '@carbon/react'

export const headerData = [
  {
    header: 'Sponsor',
    key: 'sponsor'
  },
  {
    header: 'Design kit',
    key: 'design_kit'
  },
  {
    header: 'Type',
    key: 'type'
  }
]

export const rowData = [
  {
    id: 1,
    sponsor: 'IBM Design Language',
    design_kit: 'Color styles',
    type: <Tag type="blue">Elements</Tag>,
    design_tool: 'Figma'
  },
  {
    id: 2,
    sponsor: '',
    design_kit: 'Text styles',
    type: <Tag type="blue">Elements</Tag>,
    design_tool: 'Figma'
  },
  {
    id: 3,
    sponsor: '',
    design_kit: 'Icons',
    type: <Tag type="blue">Elements</Tag>,
    design_tool: 'Figma'
  },
  {
    id: 4,
    sponsor: '',
    design_kit: 'Pictograms',
    type: <Tag type="blue">Elements</Tag>,
    design_tool: 'Sketch'
  },
  {
    id: 5,
    sponsor: 'Carbon',
    design_kit: 'White theme',
    type: <Tag type="green">Components</Tag>,
    design_tool: 'Sketch'
  },
  {
    id: 6,
    sponsor: '',
    design_kit: 'Gray 10 theme',
    type: <Tag type="green">Components</Tag>,
    design_tool: 'Sketch'
  },
  {
    id: 7,
    sponsor: '',
    design_kit: 'Gray 90 theme',
    type: <Tag type="green">Components</Tag>,
    design_tool: 'Sketch'
  },
  {
    id: 8,
    sponsor: '',
    design_kit: 'Gray 100 theme',
    type: <Tag type="green">Components</Tag>,
    design_tool: 'Axure'
  },
  {
    id: 9,
    sponsor: 'IBM Accessibility',
    design_kit: 'Accessibility Toolkit',
    type: <Tag type="red">Guidance</Tag>,
    design_tool: 'Adobe XD'
  }
]
