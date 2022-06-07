/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type } from '@/data/type'

export const globalNavData = [
  // remove L0 for the first release
  // {
  //   title: 'About'
  // },
  // {
  //   title: 'Standards'
  // },
  // {
  //   path: '/assets',
  //   title: 'Assets'
  // }
]

export const standardsNavData = [
  {
    path: '/standards',
    title: 'About Standards'
  }
]

export const assetsNavData = [
  {
    path: '/filter-data-table-test',
    title: 'Filter Datatable Test'
  },
  {
    title: 'About Carbon',
    items: [
      {
        path: '/about-carbon/platform-roadmap',
        title: 'Platform roadmap'
      }
    ]
  },
  {
    title: 'Designing',
    items: [
      {
        path: '/designing/get-started',
        title: 'Get started'
      },
      {
        path: '/designing/figma',
        title: 'Figma'
      },
      {
        path: '/designing/sketch',
        title: 'Sketch'
      },
      {
        path: '/designing/axure',
        title: 'Axure'
      },
      {
        path: '/designing/adobe-xd',
        title: 'Adobe XD'
      }
    ]
  },
  {
    path: '/developing',
    title: 'Developing'
  },
  {
    title: 'Elements',
    items: [
      {
        path: '/elements/2x-grid/overview',
        title: '2x Grid',
        hasTabs: true
      },
      {
        path: '/elements/accessibility/overview',
        title: ' Accessibility',
        hasTabs: true
      },
      {
        path: '/elements/content/overview',
        title: ' Content',
        hasTabs: true
      },
      {
        path: '/elements/color/overview',
        title: ' Color',
        hasTabs: true
      },
      {
        path: '/elements/icons/library',
        title: ' Icons',
        hasTabs: true
      },
      {
        path: '/elements/pictograms/library',
        title: ' Pictograms',
        hasTabs: true
      },
      {
        path: '/elements/motion/overview',
        title: ' Motion',
        hasTabs: true
      },
      {
        path: '/elements/spacing/overview',
        title: ' Spacing',
        hasTabs: true
      },
      {
        path: '/elements/themes/overview',
        title: ' Themes',
        hasTabs: true
      },
      {
        path: '/elements/typography/overview',
        title: ' Typography',
        hasTabs: true
      }
    ]
  },
  {
    path: '/assets/libraries',
    title: 'Libraries'
  },
  {
    title: 'Catalogs',
    isSection: true,
    items: [
      {
        path: type.component.path,
        title: type.component.namePlural
      },
      // remove elements for the first release
      // {
      //   path: type.element.path,
      //   title: type.element.namePlural
      // },
      {
        path: type.function.path,
        title: type.function.namePlural
      },
      {
        path: type.pattern.path,
        title: type.pattern.namePlural
      },
      {
        path: type.template.path,
        title: type.template.namePlural
      }
    ]
  },
  {
    title: 'Collections',
    isSection: true,
    items: [
      {
        path: '/assets/data-visualization',
        title: 'Data visualization'
      }
    ]
  }
]
