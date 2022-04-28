/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type } from '@/data/type'

export const globalNavData = [
  {
    path: '/standards',
    title: 'Standards'
  }
]

export const standardsNavData = [
  {
    path: '/standards',
    title: 'About Standards'
  }
]

export const homeNavData = [
  {
    path: '/about',
    title: 'About'
  },
  {
    path: '/libraries',
    title: 'Libraries'
  },
  {
    path: '/design-kits',
    title: 'Design kits'
  },
  {
    title: 'Catalogs',
    items: [
      {
        path: type.component.path,
        title: type.component.namePlural
      },
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
    items: [
      {
        path: '/collections/data-visualization',
        title: 'Data visualization'
      }
    ]
  }
]
