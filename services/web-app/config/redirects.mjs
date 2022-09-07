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
const websiteRedirects = [
  // Guidelines rewrites
  ['/guidelines/iconography/:slug*', '/guidelines/icons/:slug*'],
  ['/guidelines/layout', '/guidelines/2x-grid/basics'],
  ['/guidelines/content/glossary', '/guidelines/content/action-labels'],
  // Experimental -> Cloud, Data, and AI
  [
    '/experimental/cards/:slug*',
    'https://pages.github.ibm.com/CDAI-design/CDAI-design-website/components/card/:slug*'
  ],
  [
    '/experimental/dashboard-widgets/:slug*',
    'https://pages.github.ibm.com/CDAI-design/CDAI-design-website/components/widget/:slug*'
  ],
  [
    '/experimental/order-summary-template/:slug*',
    'https://pages.github.ibm.com/CDAI-design/CDAI-design-website/patterns/order-summary/:slug*'
  ],
  // Experimental -> community
  ['/experimental/:slug*', '/community/patterns/:slug*'],
  // Community index
  ['/community/components', '/community/component-index'],
  // IA updates 08/2020
  ['/get-started/about-carbon', '/all-about-carbon/what-is-carbon'],
  ['/contributing/governance', '/all-about-carbon/how-we-work'],
  ['/get-started/design/:slug*', '/designing/get-started/kits/:slug*'],
  ['/how-to-contribute/:slug*', '/contributing/:slug*'],
  ['/updates/whats-new', '/whats-happening/releases'],
  ['/whats-happening/changelog-and-roadmap', '/whats-happening/releases'],
  ['/updates/work-in-progress', '/whats-happening/work-in-progress'],
  ['/updates/migration-guide/:slug*', '/help/migration-guide/:slug*'],
  ['/help/support', '/help/contact-us'],
  ['/get-started/develop/:slug*', '/developing/frameworks/:slug*'],
  ['/resources', '/developing/developer-resource'],
  ['/tutorial/angular/:slug*', '/developing/angular-tutorial/:slug*'],
  ['/tutorial/react/:slug*', '/developing/react-tutorial/:slug*'],
  ['/tutorial/vue/:slug*', '/developing/vue-tutorial/:slug*'],
  // Data visualization
  ['/data-visualization/basic-charts', '/data-visualization/simple-charts'],
  ['/data-visualization/advanced-charts', '/data-visualization/complex-charts'],
  // v11
  ['/whats-happening/v11-release', '/migrating/guide'],
  // Added 09/2022
  ['/all-about-carbon/how-we-work', '/all-about-carbon/how-carbon-works']
]

/**
 * Redirects for URLs previously available in carbon-website, that are no longer available in
 * carbon-platform.
 * @see https://carbondesignsystem.com/sitemap/sitemap-0.xml
 */
const websiteToPlatformRedirects = [
  ['/all-about-carbon/how-carbon-works', '/about-carbon/how-carbon-works'],
  ['/all-about-carbon/partners', '/about-carbon/how-carbon-works'],
  ['/all-about-carbon/releases', '/about-carbon/releases'],
  ['/all-about-carbon/the-carbon-ecosystem', '/about-carbon/how-carbon-works'],
  ['/all-about-carbon/the-team', '/about-carbon/how-carbon-works'],
  ['/all-about-carbon/what-is-carbon', '/about-carbon/how-carbon-works'],
  ['/all-about-carbon/who-uses-carbon', '/about-carbon/how-carbon-works'],
  ['/case-studies/:slug*', '/about-carbon/case-studies/:slug*'],
  ['/whats-happening/meetups', '/about-carbon/meetups'],
  ['/whats-happening/news-and-articles', '/about-carbon/articles'],
  ['/whats-happening/work-in-progress', '/assets/components?status[]=draft'],
  ['/guidelines/icons/:slug*', '/elements/icons/:slug*'],
  ['/patterns/dialog-pattern', '/libraries/carbon-styles/latest/assets/dialogs/usage'],
  ['/patterns/disclosures-pattern', '/libraries/carbon-styles/latest/assets/disclosures/usage'],
  ['/patterns/empty-states-pattern', '/libraries/carbon-styles/latest/assets/empty-states/usage'],
  ['/patterns/forms-pattern', '/libraries/carbon-styles/latest/assets/forms/usage'],
  ['/patterns/login-pattern', '/libraries/carbon-styles/latest/assets/login/usage'],
  ['/patterns/notification-pattern', '/libraries/carbon-styles/latest/assets/notifications/usage'],
  ['/patterns/overview', '/assets/patterns'],
  ['/status-indicator-pattern', '/libraries/carbon-styles/latest/assets/status-indicators/usage'],
  ['/text-toolbar-pattern', '/libraries/carbon-styles/latest/assets/text-toolbar/usage'],
  ['/patterns/:slug', '/libraries/carbon-styles/latest/assets/:slug/usage'], // after all `/patterns/`
  ['/test/list-section', '/']
]

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
  return redirectArray
    .filter((redirect) => redirect[0] && redirect[1])
    .map((redirect = []) => ({
      source: redirect[0],
      destination: redirect[1],
      permanent: true
    }))
}

export const redirects = transformRedirectsArray([
  ...websiteRedirects,
  ...websiteToPlatformRedirects,
  ...platformRedirects
])
