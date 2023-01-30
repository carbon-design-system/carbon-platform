/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assetsNavData, globalNavData, standardsNavData } from '@/data/nav-data'

/**
 * Helper function to conditionally remove the last portion of a path.
 *
 * @param {string} path
 * @param {boolean} popPath
 * @returns {string}
 */
const getPath = (path, popPath) => {
  if (popPath) {
    return path?.split('/')?.slice(0, -1)?.join('/')
  }

  return path
}

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
 * @param {boolean} hasTabs - if the page has page tabs
 * @returns {string}
 */
export const getMetaTitle = (path, navData = [], hasTabs = false) => {
  const allNavData = [...globalNavData, ...standardsNavData, ...assetsNavData, ...navData]
  let title = ''

  // if page tabs, pop the last path for the path to match, and all the paths in nav data
  if (hasTabs) {
    path = path?.split('/')?.slice(0, -1)?.join('/')
  }

  allNavData.forEach((data1) => {
    if (getPath(data1.path, hasTabs) === path) {
      title = data1.title
    } else if (Array.isArray(data1.items)) {
      data1.items.forEach((data2) => {
        if (getPath(data2.path, hasTabs) === path) {
          title = `${data2.title} - ${data1.title}`
        } else if (Array.isArray(data2.items)) {
          data2.items.forEach((data3) => {
            if (getPath(data3.path, hasTabs) === path) {
              title = `${data3.title} - ${data2.title} - ${data1.title}`
            }
          })
        }
      })
    }
  })

  return title
}
