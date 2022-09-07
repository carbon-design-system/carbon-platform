/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Redirects previously used by the carbon-website repository.
 * @see https://github.com/carbon-design-system/carbon-website/blob/main/conf.d/rewrite.conf
 */
const websiteRedirects = [['/guidelines/iconography/:slug*', '/guidelines/icons/:slug*']]

/**
 * Redirects for URLs previously available in carbon-website, that are no longer available in
 * carbon-platform.
 * @see https://carbondesignsystem.com/sitemap/sitemap-0.xml
 */
const websiteToPlatformRedirects = [['/guidelines/icons/:slug*', '/elements/icons/:slug*']]

/**
 * `/pages` subdirectories that don't have `index.js`, `index.md`, or `index.mdx` so base paths
 * properly resolve.
 */
const platformRedirects = [
  ['/about-carbon', '/about-carbon/how-carbon-works'],
  ['/about-carbon/case-studies', '/about-carbon/case-studies/overview'],
  ['/assets', '/assets/components'],
  ['/contributing', '/contributing/overview'],
  ['/elements', '/elements/2x-grid/overview'],
  ['/elements/2x-grid', '/elements/2x-grid/overview'],
  ['/elements/color', '/elements/color/overview'],
  ['/elements/icons', '/elements/icons/library'],
  ['/elements/pictograms', '/elements/pictograms/library'],
  ['/elements/motion', '/elements/motion/overview'],
  ['/elements/spacing', '/elements/spacing/overview'],
  ['/elements/themes', '/elements/themes/overview'],
  ['/elements/typography', '/elements/typography/overview'],
  ['/guidelines', '/guidelines/accessibility/overview'],
  ['/guidelines/accessibility', '/guidelines/accessibility/overview'],
  ['/guidelines/content', '/guidelines/content/overview']
]

/**
 * Formats arrays of source and destination paths in an array of Next.js redirect objects.
 * @see https://nextjs.org/docs/api-reference/next.config.js/redirects
 * @param {import('../../typedefs').Redirect[]} redirectArray
 * @returns
 */
const transformRedirectsArray = (redirectArray = []) => {
  return redirectArray.map((redirect = []) => {
    if (!redirect[0] || !redirect[1]) return {}

    return {
      source: redirect[0],
      destination: redirect[1],
      permanent: true
    }
  })
}

export const redirects = transformRedirectsArray([
  ...websiteRedirects,
  ...websiteToPlatformRedirects,
  ...platformRedirects
])
