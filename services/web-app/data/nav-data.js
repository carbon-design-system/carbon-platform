/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const globalNavData = [
  // remove standards for the first release
  // {
  //   path: '/standards',
  //   title: 'Standards'
  // },
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
    path: '/assets',
    title: 'About Assets'
  },
  {
    path: '/assets/libraries',
    title: 'Libraries'
  },
  {
    title: 'Catalogs',
    items: [
      {
        path: '/assets/components',
        title: 'Components'
      },
      // remove elements for the first release
      // {
      //   path: '/assets/elements',
      //   title: 'Elements'
      // },
      {
        path: '/assets/functions',
        title: 'Functions'
      },
      {
        path: '/assets/patterns',
        title: 'Patterns'
      },
      {
        path: '/assets/templates',
        title: 'Templates'
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
