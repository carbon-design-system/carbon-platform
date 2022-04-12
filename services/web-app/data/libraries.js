/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const { RunMode, getRunMode } = require('@carbon-platform/api/runtime')

/**
 * Library groups are defined when a group of libraries all inherit the same base library, and when
 * one of them is the reference, canonical, library that is the most complete and is updated first.
 * This is used to collapse frameworks in the asset catalogs when a framework filter has not been
 * applied.
 */

const carbonChartsGroup = {
  base: 'carbon-charts',
  canonical: 'carbon-charts'
}

const carbonComponentsGroup = {
  base: 'carbon-styles',
  canonical: 'carbon-react'
}

const ibmdotcomGroup = {
  base: 'ibmdotcom-styles',
  canonical: 'ibmdotcom-web-components'
}

/**
const watsonMomentsGroup = {
  base: 'watson-moments-styles',
  canonical: 'watson-moments-react'
}
*/

/**
 * Libraries are only included in the production environment if in this allowlist. Add a library to
 * this object to register the library in production and index its resources. Library slugs are
 * specified as object keys to ensure uniqueness.
 */
const prodLibraries = {
  'carbon-charts': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/core',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-angular': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/angular',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/react',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-svelte': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/svelte',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-vue': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/vue',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/styles',
    sponsor: 'carbon'
    // waiting for carbon react to be indexed
    // group: carbonComponentsGroup
  },
  // 'carbon-react': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon',
  //   path: '/packages/react',
  //   sponsor: 'carbon',
  //   group: carbonComponentsGroup,
  // },
  // 'carbon-angular': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon-components-angular',
  //   path: '/',
  //   sponsor: 'ai-apps',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-vue': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon-components-vue',
  //   path: '/packages/core',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-svelte': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon-components-svelte',
  //   path: '/',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-web-components': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon-web-components',
  //   path: '/',
  //   sponsor: 'ibm-dotcom',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-cli': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/cli',
  //   sponsor: 'carbon'
  // },
  // 'carbon-cli-reporter': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/cli-reporter',
  //   sponsor: 'carbon'
  // },
  // 'carbon-colors': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/colors',
  //   sponsor: 'carbon'
  // },
  // 'carbon-components': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/components',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-elements': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/elements',
  //   sponsor: 'carbon'
  // },
  // 'carbon-feature-flags': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/feature-flags',
  //   sponsor: 'carbon'
  // },
  // 'carbon-grid': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/grid',
  //   sponsor: 'carbon'
  // },
  // 'carbon-icons': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/icons',
  //   sponsor: 'carbon'
  // },
  // 'carbon-icons-handlebars': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/icons-handlebars',
  //   sponsor: 'carbon'
  // },
  // 'carbon-icons-react': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/icons-react',
  //   sponsor: 'carbon'
  // },
  // 'carbon-icons-vue': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/icons-vue',
  //   sponsor: 'carbon'
  // },
  // 'carbon-layout': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/layout',
  //   sponsor: 'carbon'
  // },
  // 'carbon-motion': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/motion',
  //   sponsor: 'carbon'
  // },
  // 'carbon-patterns': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/patterns',
  //   sponsor: 'carbon'
  // },
  // 'carbon-pictograms': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/pictograms',
  //   sponsor: 'carbon'
  // },
  // 'carbon-pictograms-react': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/pictograms-react',
  //   sponsor: 'carbon'
  // },
  // 'carbon-themes': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/themes',
  //   sponsor: 'carbon'
  // },
  // 'carbon-type': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/type',
  //   sponsor: 'carbon'
  // },
  // 'carbon-upgrade': {
  //   host: 'github.ibm.com',
  //   org: 'matt-rosno',
  //   repo: 'carbon',
  //   path: '/packages/upgrade',
  //   sponsor: 'carbon'
  // },
  // 'cloud-pal': {
  //   host: 'github.ibm.com',
  //   org: 'francine-lucca',
  //   repo: 'ibmcloud-pal',
  //   path: '/patterns',
  //   sponsor: 'ibm-cloud'
  // },
  'ibmdotcom-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/react',
    sponsor: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-web-components': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/web-components',
    sponsor: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-services': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/services',
    sponsor: 'ibm-dotcom'
  },
  'ibmdotcom-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/styles',
    sponsor: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-utilities': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/utilities',
    sponsor: 'ibm-dotcom'
  }
  // 'ibm-security': {
  //   host: 'github.ibm.com',
  //   org: 'jdharvey',
  //   repo: 'ibm-security',
  //   path: '/',
  //   sponsor: 'ibm-security'
  // },
  // 'watson-moments-react': {
  //   host: 'github.ibm.com',
  //   org: 'andrea-cardona',
  //   repo: 'carbon-watson-moments',
  //   path: '/packages/react',
  //   sponsor: 'watson',
  //   group: watsonMomentsGroup
  // },
  // 'watson-moments-styles': {
  //   host: 'github.ibm.com',
  //   org: 'andrea-cardona',
  //   repo: 'carbon-watson-moments',
  //   path: '/packages/styles',
  //   sponsor: 'watson',
  //   group: watsonMomentsGroup
  // },
  // 'gatsby-theme-carbon': {
  //   host: 'github.ibm.com',
  //   org: 'francine-lucca',
  //   repo: 'gatsby-theme-carbon',
  //   path: '/packages/gatsby-theme-carbon',
  //   sponsor: 'carbon'
  // },
}

/**
 * This libraries allowlist is just used for development purposes. These are persisted to the
 * `public/data` file system cache and committed so we can use local data when deploying to Netlify
 * (no dependencies on hitting GitHub APIs to fetch data.) In the future, we can replace these with
 * mock libraries that hit edge cases and then use this data set in our test suite.
 */
const devLibraries = {
  'carbon-charts': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/core',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-angular': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/angular',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/react',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-svelte': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/svelte',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-vue': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/vue',
    sponsor: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/styles',
    sponsor: 'carbon',
    group: carbonComponentsGroup
  },
  'carbon-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/react',
    sponsor: 'carbon',
    group: carbonComponentsGroup,
    ref: '451-index-carbon-react'
  },
  'ibmdotcom-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/react',
    sponsor: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-web-components': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/web-components',
    sponsor: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-services': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/services',
    sponsor: 'ibm-dotcom'
  },
  'ibmdotcom-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/styles',
    sponsor: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-utilities': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/utilities',
    sponsor: 'ibm-dotcom'
  }
}

const libraryAllowList = getRunMode() === RunMode.Standard ? prodLibraries : devLibraries

module.exports = {
  libraryAllowList
}
