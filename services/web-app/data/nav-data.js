/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type } from '@/data/type'

export const globalNavData = [
  {
    path: '/about',
    title: 'About'
  },
  {
    path: '/standards',
    title: 'Standards'
  },
  {
    path: '/assets',
    title: 'Assets'
  }
]

export const aboutNavData = [
  {
    path: '/about',
    title: 'About Carbon'
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
    path: '/assets',
    title: 'About Assets'
  },
  {
    path: '/assets/libraries',
    title: 'Libraries'
  },
  {
    path: '/assets/design-kits',
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
        path: '/assets/data-visualization',
        title: 'Data visualization'
      }
    ]
  }
]
