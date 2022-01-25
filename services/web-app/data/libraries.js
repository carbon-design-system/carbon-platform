/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { DEV, getRunMode } = require('@carbon-platform/api/run-mode')

/**
 * Libraries are only included in the platform if in this allowlist. Library slugs are specified as
 * object keys to ensure uniqueness.
 */
const libraries = {
  'carbon-charts': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-charts',
    path: '/packages/core',
    sponsor: 'carbon'
  },
  'carbon-charts-angular': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-charts',
    path: '/packages/angular',
    sponsor: 'carbon'
  },
  'carbon-charts-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-charts',
    path: '/packages/react',
    sponsor: 'carbon'
  },
  'carbon-charts-svelte': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-charts',
    path: '/packages/svelte',
    sponsor: 'carbon'
  },
  'carbon-charts-vue': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-charts',
    path: '/packages/vue',
    sponsor: 'carbon'
  },
  'carbon-styles': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/styles',
    sponsor: 'carbon'
  },
  'carbon-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/carbon-react',
    sponsor: 'carbon'
  },
  'carbon-angular': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-components-angular',
    path: '/',
    sponsor: 'ai-apps'
  },
  'carbon-vue': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-components-vue',
    path: '/packages/core'
  },
  'carbon-svelte': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-components-svelte',
    path: '/'
  },
  'carbon-web-components': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-web-components',
    path: '/',
    sponsor: 'ibm-dotcom'
  },
  'carbon-cli': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/cli',
    sponsor: 'carbon'
  },
  'carbon-cli-reporter': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/cli-reporter',
    sponsor: 'carbon'
  },
  'carbon-colors': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/colors',
    sponsor: 'carbon'
  },
  'carbon-components': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/components'
  },
  'carbon-elements': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/elements',
    sponsor: 'carbon'
  },
  'carbon-feature-flags': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/feature-flags',
    sponsor: 'carbon'
  },
  'carbon-grid': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/grid',
    sponsor: 'carbon'
  },
  'carbon-icons': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons',
    sponsor: 'carbon'
  },
  'carbon-icons-handlebars': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons-handlebars',
    sponsor: 'carbon'
  },
  'carbon-icons-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons-react',
    sponsor: 'carbon'
  },
  'carbon-icons-vue': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons-vue',
    sponsor: 'carbon'
  },
  'carbon-layout': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/layout',
    sponsor: 'carbon'
  },
  'carbon-motion': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/motion',
    sponsor: 'carbon'
  },
  'carbon-patterns': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/patterns',
    sponsor: 'carbon'
  },
  'carbon-pictograms': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/pictograms',
    sponsor: 'carbon'
  },
  'carbon-pictograms-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/pictograms-react',
    sponsor: 'carbon'
  },
  'carbon-themes': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/themes',
    sponsor: 'carbon'
  },
  'carbon-type': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/type',
    sponsor: 'carbon'
  },
  'carbon-upgrade': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/upgrade',
    sponsor: 'carbon'
  },
  'cloud-pal': {
    host: 'github.ibm.com',
    org: 'francine-lucca',
    repo: 'ibmcloud-pal',
    path: '/patterns',
    sponsor: 'ibm-cloud'
  },
  'ibmdotcom-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/react',
    sponsor: 'ibm-dotcom'
  },
  'ibmdotcom-web-components': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/web-components',
    sponsor: 'ibm-dotcom'
  },
  'ibmdotcom-services': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/services',
    sponsor: 'ibm-dotcom'
  },
  'ibmdotcom-styles': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/styles',
    sponsor: 'ibm-dotcom'
  },
  'ibmdotcom-utilities': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/utilities',
    sponsor: 'ibm-dotcom'
  },
  'ibm-security': {
    host: 'github.ibm.com',
    org: 'jdharvey',
    repo: 'ibm-security',
    path: '/',
    sponsor: 'ibm-security'
  },
  'watson-moments-react': {
    host: 'github.ibm.com',
    org: 'andrea-cardona',
    repo: 'carbon-watson-moments',
    path: '/packages/react',
    sponsor: 'watson'
  },
  'watson-moments-styles': {
    host: 'github.ibm.com',
    org: 'andrea-cardona',
    repo: 'carbon-watson-moments',
    path: '/packages/styles',
    sponsor: 'watson'
  },
  'gatsby-theme-carbon': {
    host: 'github.ibm.com',
    org: 'francine-lucca',
    repo: 'gatsby-theme-carbon',
    path: '/packages/gatsby-theme-carbon',
    sponsor: 'carbon'
  }
}

/**
 * Libraries to persist to the `public/data` file system cache so we can use this local data when
 * deploying to Vercel.
 */
const ossLibraries = [
  'carbon-charts',
  'carbon-charts-angular',
  'carbon-charts-react',
  'carbon-charts-svelte',
  'carbon-charts-vue',
  'carbon-styles',
  'carbon-components',
  'carbon-angular',
  'carbon-react',
  'carbon-svelte',
  'carbon-vue',
  'carbon-web-components'
]

/**
 * Only use the `ossLibraries` data set if specified in the environment variable.
 */
const libraryAllowList = Object.keys(libraries)
  .filter((key) => (getRunMode() === DEV ? ossLibraries.includes(key) : true))
  .reduce((obj, key) => {
    obj[key] = libraries[key]
    return obj
  }, {})

module.exports = {
  libraryAllowList
}
