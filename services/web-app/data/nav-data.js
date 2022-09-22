/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assetTypes } from '@/data/asset-types'

export const globalNavData = [
  // remove L0 for the first release
  // {
  //   title: 'About'
  // },
  // {
  //   title: 'Standards'
  // },
  // {
  //   path: '/',
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
    title: 'About Carbon',
    items: [
      {
        path: '/about-carbon/how-carbon-works',
        title: 'How Carbon works'
      },
      {
        path: '/about-carbon/platform-roadmap',
        title: 'Platform roadmap'
      },
      {
        path: '/about-carbon/releases',
        title: 'Releases'
      },
      {
        path: '/about-carbon/community-sites',
        title: 'Community sites'
      },
      {
        path: '/about-carbon/articles',
        title: 'Articles'
      },
      {
        path: '/about-carbon/meetups',
        title: 'Meetups'
      },
      {
        title: 'Case studies',
        items: [
          {
            path: '/about-carbon/case-studies/overview',
            title: 'Overview'
          },
          {
            path: '/about-carbon/case-studies/consistency-in-the-cloud',
            title: 'Consistency in the Cloud'
          },
          {
            path: '/about-carbon/case-studies/ibm-commerce-platform',
            title: 'IBM Commerce Platform'
          }
        ]
      },
      {
        title: 'Help',
        items: [
          {
            path: '/about-carbon/help/faq',
            title: 'FAQ'
          },
          {
            path: '/about-carbon/help/certificate-of-originality',
            title: 'Certificate of Originality'
          },
          {
            path: '/about-carbon/help/contact',
            title: 'Contact'
          }
        ]
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
    title: 'Contributing',
    items: [
      {
        path: '/contributing/overview',
        title: 'Overview'
      },
      {
        path: '/contributing/bugs-and-requests',
        title: 'Bugs and requests'
      },
      {
        path: '/contributing/documentation',
        title: 'Documentation'
      },
      {
        path: '/contributing/schema',
        title: 'Schema'
      },
      {
        path: '/contributing/components',
        title: 'Components'
      },
      {
        path: '/contributing/icons',
        title: 'Icons'
      },
      {
        path: '/contributing/patterns',
        title: 'Patterns'
      },
      {
        path: '/contributing/pictograms',
        title: 'Pictograms'
      },
      {
        path: '/contributing/add-ons',
        title: 'Add-ons'
      }
    ]
  },
  {
    title: 'Migrating',
    items: [
      {
        path: '/migrating/guide/overview',
        title: 'Guide',
        hasTabs: true
      },
      {
        path: '/migrating/faq',
        title: 'FAQ'
      }
    ]
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
        path: '/elements/color/overview',
        title: 'Color',
        hasTabs: true
      },
      {
        path: '/elements/icons/library',
        title: 'Icons',
        hasTabs: true
      },
      {
        path: '/elements/motion/overview',
        title: 'Motion',
        hasTabs: true
      },
      {
        path: '/elements/pictograms/library',
        title: 'Pictograms',
        hasTabs: true
      },
      {
        path: '/elements/spacing/overview',
        title: 'Spacing',
        hasTabs: true
      },
      {
        path: '/elements/themes/overview',
        title: 'Themes',
        hasTabs: true
      },
      {
        path: '/elements/typography/overview',
        title: 'Typography',
        hasTabs: true
      }
    ]
  },
  {
    title: 'Guidelines',
    items: [
      {
        path: '/guidelines/accessibility/overview',
        title: 'Accessibility',
        hasTabs: true
      },
      {
        path: '/guidelines/content/overview',
        title: 'Content',
        hasTabs: true
      }
    ]
  },
  {
    title: 'Catalogs',
    isSection: true,
    items: [
      {
        title: 'Assets',
        items: [
          {
            path: assetTypes.component.path,
            title: assetTypes.component.namePlural
          },
          {
            path: assetTypes.function.path,
            title: assetTypes.function.namePlural
          },
          {
            path: assetTypes.pattern.path,
            title: assetTypes.pattern.namePlural
          },
          {
            path: assetTypes.template.path,
            title: assetTypes.template.namePlural
          }
        ]
      },
      {
        path: '/design-kits',
        title: 'Design kits'
      },
      {
        path: '/libraries',
        title: 'Libraries'
      }
    ]
  },
  {
    title: 'Collections',
    isSection: true,
    items: [
      {
        title: 'Data visualization',
        items: [
          {
            path: '/data-visualization',
            title: 'Data visualization'
          },
          {
            path: '/data-visualization/get-started',
            title: 'Get started'
          },
          {
            path: '/data-visualization/chart-anatomy',
            title: 'Chart anatomy'
          },
          {
            path: '/data-visualization/color-palettes',
            title: 'Color palettes'
          },
          {
            path: '/data-visualization/axes-and-labels',
            title: 'Axes and labels'
          },
          {
            path: '/data-visualization/legends',
            title: 'Legends'
          },
          {
            path: '/data-visualization/dashboards',
            title: 'Dashboards'
          }
        ]
      }
    ]
  }
]
