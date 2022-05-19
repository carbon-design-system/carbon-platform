/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type } from '@/data/type'

export const globalNavData = [
  {
    title: 'About'
  },
  {
    title: 'Standards'
  },
  {
    path: '/assets',
    title: 'Assets'
  }
]

export const standardsNavData = [
  {
    path: '/standards',
    title: 'About Standards'
  }
]

export const assetsNavData = [
  {
    title: 'About Carbon',
    items: [
      {
        path: '/assets/about-carbon/how-carbon-works',
        title: 'How Carbon works'
      },
      {
        path: '/assets/about-carbon/platform-roadmap',
        title: 'Platform roadmap'
      },
      {
        path: '/assets/about-carbon/releases',
        title: 'Releases'
      },
      {
        path: '/assets/about-carbon/articles',
        title: 'Articles'
      },
      {
        path: '/assets/about-carbon/case-studies',
        title: 'Case studies'
      },
      {
        path: '/assets/about-carbon/meetups',
        title: 'Meetups'
      }
    ]
  },
  {
    title: 'Designing'
  },
  {
    title: 'Developing'
  },
  {
    title: 'Contribute',
    items: [
      {
        path: '/assets/contribute/overview',
        title: 'Overview'
      },
      {
        path: '/assets/contribute/bugs-and-requests',
        title: 'Bugs and requests'
      },
      {
        path: '/assets/contribute/documentation',
        title: 'Documentation (schema)'
      },
      {
        path: '/assets/contribute/components',
        title: 'Components'
      },
      {
        path: '/assets/contribute/icons',
        title: 'Icons'
      },
      {
        path: '/assets/contribute/patterns',
        title: 'Patterns'
      },
      {
        path: '/assets/contribute/pictograms',
        title: 'Pictograms'
      },
      {
        path: '/assets/contribute/add-ons',
        title: 'Add-ons'
      }
    ]
  },
  {
    title: 'Guidelines',
    items: [
      {
        title: '2x Grid',
        items: [
          {
            path: '/assets/guidelines/2x-grid/overview',
            title: 'Overview'
          },
          {
            path: '/assets/guidelines/2x-grid/implementation',
            title: 'Implementation'
          }
        ]
      },
      {
        path: '/assets/guidelines/accessibility/overview',
        title: ' Accessibility',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/content/overview',
        title: ' Content',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/color/overview',
        title: ' Color',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/icons/library',
        title: ' Icons',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/pictograms/library',
        title: ' Pictograms',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/motion/overview',
        title: ' Motion',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/spacing/overview',
        title: ' Spacing',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/themes/overview',
        title: ' Themes',
        hasTabs: true
      },
      {
        path: '/assets/guidelines/typography/overview',
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

export const libraryNavData = [
  {
    title: 'Assets',
    path: '/assets/carbon-charts/library-assets'
  },
  {
    title: 'Design kits',
    path: ''
  },
  {
    title: 'Tutorials',
    items: [
      {
        title: 'Tutorial 1',
        items: [
          {
            title: 'Overview',
            path: ''
          },
          {
            title: '1. Installing Carbon',
            path: ''
          },
          {
            title: '2. Building pages',
            path: ''
          },
          {
            title: '3. Using APIs',
            path: ''
          },
          {
            title: '4. Creating components',
            path: ''
          },
          {
            title: '5. Deploying to cloud',
            path: ''
          },
          {
            title: 'Conclusion',
            path: ''
          }
        ]
      },
      {
        title: 'Tutorial 2',
        path: ''
      }
    ]
  },
  {
    title: 'Versions',
    path: ''
  },

  {
    title: 'Catalogs'
  }
]
