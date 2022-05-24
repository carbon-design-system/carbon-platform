/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type } from '@/data/type'

export const globalNavData = [
  {
    path: '/libraries',
    title: 'Libraries'
  },
  {
    path: '/standards',
    title: 'Standards'
  }
]

export const homeNavData = [
  {
    path: '/about',
    title: 'About Carbon'
  },
  {
    path: '/todo',
    title: 'Designing'
  },
  {
    path: '/todo',
    title: 'Developing'
  },
  {
    path: '/todo',
    title: 'Contributing'
  },
  {
    path: '/todo',
    title: 'Migrating'
  },
  {
    title: 'Guidelines',
    items: [
      {
        path: '/todo',
        title: '2x Grid'
      },
      {
        path: '/todo',
        title: 'Color'
      },
      {
        path: '/todo',
        title: 'Icons'
      },
      {
        path: '/todo',
        title: 'Pictograms'
      },
      {
        path: '/todo',
        title: 'Motion'
      },
      {
        path: '/todo',
        title: 'Spacing'
      },
      {
        path: '/todo',
        title: 'Themes'
      },
      {
        path: '/todo',
        title: 'Typography'
      }
    ]
  }
]

export const librariesNavData = [
  {
    path: '/libraries',
    title: 'About Libraries'
  },
  // {
  //   path: '/libraries/design-kits',
  //   title: 'Design kits'
  // },
  {
    title: 'Asset catalogs',
    items: [
      {
        path: '/libraries' + type.component.path,
        title: type.component.namePlural
      },
      {
        path: '/libraries' + type.function.path,
        title: type.function.namePlural
      },
      {
        path: '/libraries' + type.pattern.path,
        title: type.pattern.namePlural
      },
      {
        path: '/libraries' + type.template.path,
        title: type.template.namePlural
      }
    ]
  },
  {
    title: 'Asset collections',
    items: [
      {
        path: '/libraries' + '/collections/data-visualization',
        title: 'Data visualization'
      }
    ]
  }
]

export const standardsNavData = [
  {
    path: '/standards',
    title: 'About Standards'
  }
]
