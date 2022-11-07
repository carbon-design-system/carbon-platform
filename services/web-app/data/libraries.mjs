/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RunMode, Runtime } from '@carbon-platform/api/runtime'

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
    maintainer: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-angular': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/angular',
    maintainer: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/react',
    maintainer: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-svelte': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/svelte',
    maintainer: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-charts-vue': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-charts',
    path: '/packages/vue',
    maintainer: 'carbon',
    group: carbonChartsGroup
  },
  'carbon-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/styles',
    maintainer: 'carbon',
    group: carbonComponentsGroup
  },
  'carbon-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/react',
    maintainer: 'carbon',
    group: carbonComponentsGroup
  },
  'carbon-components-vue': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-components-vue',
    path: '/packages/core/src',
    packageJsonPath: '/../package.json',
    group: carbonComponentsGroup
  },
  'carbon-components-angular': {
    host: 'github.com',
    org: 'IBM',
    repo: 'carbon-components-angular',
    path: '/src',
    group: carbonComponentsGroup
  },
  'carbon-components-svelte': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-components-svelte',
    path: '/',
    group: carbonComponentsGroup
  },
  'ibm-cloud-cognitive': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'ibm-cloud-cognitive',
    path: '/packages/cloud-cognitive',
    maintainer: 'ibm-products'
  },
  'ibm-security': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'ibm-cloud-cognitive',
    path: '/packages/security',
    maintainer: 'ibm-security'
  },
  'carbon-components': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/components',
    group: carbonComponentsGroup,
    ref: 'v10'
  },
  'ibmdotcom-react': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/react',
    maintainer: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-web-components': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/web-components',
    maintainer: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-services': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/services',
    maintainer: 'ibm-dotcom'
  },
  'ibmdotcom-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/styles',
    maintainer: 'ibm-dotcom',
    group: ibmdotcomGroup
  },
  'ibmdotcom-utilities': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon-for-ibm-dotcom',
    path: '/packages/utilities',
    maintainer: 'ibm-dotcom'
  }
}

/**
 * This libraries allowlist is just used for development purposes. These are persisted to the
 * `public/data` file system cache and committed so we can use local data when deploying to Netlify
 * (no dependencies on hitting GitHub APIs to fetch data.) In the future, we can replace these with
 * mock libraries that hit edge cases and then use this data set in our test suite.
 */
const devLibraries = {
  // 'carbon-charts': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-charts',
  //   path: '/packages/core',
  //   maintainer: 'carbon',
  //   group: carbonChartsGroup
  // },
  // 'carbon-charts-angular': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-charts',
  //   path: '/packages/angular',
  //   maintainer: 'carbon',
  //   group: carbonChartsGroup
  // },
  // 'carbon-charts-react': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-charts',
  //   path: '/packages/react',
  //   maintainer: 'carbon',
  //   group: carbonChartsGroup
  // },
  // 'carbon-charts-svelte': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-charts',
  //   path: '/packages/svelte',
  //   maintainer: 'carbon',
  //   group: carbonChartsGroup
  // },
  // 'carbon-charts-vue': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-charts',
  //   path: '/packages/vue',
  //   maintainer: 'carbon',
  //   group: carbonChartsGroup
  // },
  'carbon-styles': {
    host: 'github.com',
    org: 'carbon-design-system',
    repo: 'carbon',
    path: '/packages/styles',
    maintainer: 'carbon',
    group: carbonComponentsGroup
  },
  'carbon-react': {
    host: 'github.com',
    org: 'mattrosno',
    repo: 'carbon',
    path: '/packages/react',
    maintainer: 'carbon',
    group: carbonComponentsGroup,
    ref: 'index-contained-list'
  }
  // 'carbon-components-vue': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-components-vue',
  //   path: '/packages/core/src',
  //   packageJsonPath: '/../package.json',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-components-angular': {
  //   host: 'github.com',
  //   org: 'IBM',
  //   repo: 'carbon-components-angular',
  //   path: '/src',
  //   group: carbonComponentsGroup
  // },
  // 'carbon-components-svelte': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-components-svelte',
  //   path: '/',
  //   group: carbonComponentsGroup
  // },
  // 'ibm-cloud-cognitive': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'ibm-cloud-cognitive',
  //   path: '/packages/cloud-cognitive',
  //   maintainer: 'ibm-products'
  // },
  // 'ibm-security': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'ibm-cloud-cognitive',
  //   path: '/packages/security',
  //   maintainer: 'ibm-security'
  // },
  // 'carbon-components': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon',
  //   path: '/packages/components',
  //   group: carbonComponentsGroup,
  //   ref: 'v10'
  // },
  // 'ibmdotcom-react': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-for-ibm-dotcom',
  //   path: '/packages/react',
  //   maintainer: 'ibm-dotcom',
  //   group: ibmdotcomGroup
  // },
  // 'ibmdotcom-web-components': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-for-ibm-dotcom',
  //   path: '/packages/web-components',
  //   maintainer: 'ibm-dotcom',
  //   group: ibmdotcomGroup
  // },
  // 'ibmdotcom-services': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-for-ibm-dotcom',
  //   path: '/packages/services',
  //   maintainer: 'ibm-dotcom'
  // },
  // 'ibmdotcom-styles': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-for-ibm-dotcom',
  //   path: '/packages/styles',
  //   maintainer: 'ibm-dotcom',
  //   group: ibmdotcomGroup
  // },
  // 'ibmdotcom-utilities': {
  //   host: 'github.com',
  //   org: 'carbon-design-system',
  //   repo: 'carbon-for-ibm-dotcom',
  //   path: '/packages/utilities',
  //   maintainer: 'ibm-dotcom'
  // }
}

const runtime = new Runtime()
const libraryAllowList = runtime.runMode === RunMode.Standard ? prodLibraries : devLibraries

/**
 * libraries with no maintaining team default to `community`.
 */
Object.keys(libraryAllowList).forEach((library) => {
  if (!libraryAllowList[library].maintainer) {
    libraryAllowList[library].maintainer = 'community'
  }
})

export { libraryAllowList }
