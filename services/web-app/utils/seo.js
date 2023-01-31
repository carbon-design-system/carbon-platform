/*
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { assetsNavData, globalNavData, standardsNavData } from '@/data/nav-data'

/**
 * Helper function to determine the corresponding sideNav path from a given page path.
 *
 * @param {string} path
 * @param {boolean} hasTabs
 * @returns {string}
 */
const getSideNavPath = (path, hasTabs) => hasTabs ? path?.split('/')?.slice(0, -1)?.join('/') : path

/**
 * For a given path like `/about-carbon/how-carbon-works`, if that matches any known nav data,
 * construct a title like "How Carbon works - About Carbon" to ensure all titles are unique. The
 * lowest node in the tree is shown first in the meta title.
 *
 * @param {string} path - typically next/router `asPath`
 * @param {Array} navData - optional nav data for dynamic side navs, e.g. libraries
 * @param {boolean} hasTabs - if the page has page tabs
 * @returns {string}
 */
export const getMetaTitle = (path, navData = [], hasTabs = false) => {
  const allNavData = [...globalNavData, ...standardsNavData, ...assetsNavData, ...navData]

  // if page tabs, pop the last path for the path to match, and all the paths in nav data
  const sideNavPath = getSideNavPath(path, hasTabs)

  return getPageTitle(allNavData, sideNavPath, hasTabs)
}
