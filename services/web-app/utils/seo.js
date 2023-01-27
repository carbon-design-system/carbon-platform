/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assetsNavData, globalNavData, standardsNavData } from '@/data/nav-data'

/**
 * For a given path like `/about-carbon/how-carbon-works`, if that matches any known nav data,
 * construct a title like "How Carbon works - About Carbon" to ensure all titles are unique. The
 * lowest node in the tree is shown first in the meta title.
 *
 * This could probably be rewritten as a recursive function, but so far there are no known instances
 * of navigation trees that are four level deep.
 *
 * @param {string} path - typically next/router `asPath`
 * @param {Array} navData - optional nav data for dynamic side navs, e.g. libraries
 * @returns {string}
 */
export const getMetaTitle = (path, navData = []) => {
  const allNavData = [...globalNavData, ...standardsNavData, ...assetsNavData, ...navData]
  let title = ''

  allNavData.forEach((data1) => {
    if (data1.path === path) {
      title = data1.title
    } else if (Array.isArray(data1.items)) {
      data1.items.forEach((data2) => {
        if (data2.path === path) {
          title = `${data2.title} - ${data1.title}`
        } else if (Array.isArray(data2.items)) {
          data2.items.forEach((data3) => {
            if (data3.path === path) {
              title = `${data3.title} - ${data2.title} - ${data1.title}`
            }
          })
        }
      })
    }
  })

  return title
}
