/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Libraries are only included in the platform if in this allowlist. Library slugs are specified as
 * object keys to ensure uniqueness.
 */
const libraryAllowList = {
  'carbon-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/carbon-react'
  },
  'carbon-cli': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/cli'
  },
  'carbon-cli-reporter': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/cli-reporter'
  },
  'carbon-colors': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/colors'
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
    path: '/packages/elements'
  },
  'carbon-feature-flags': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/feature-flags'
  },
  'carbon-grid': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/grid'
  },
  'carbon-icons': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons'
  },
  'carbon-icons-handlebars': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons-handlebars'
  },
  'carbon-icons-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons-react'
  },
  'carbon-icons-vue': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/icons-vue'
  },
  'carbon-layout': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/layout'
  },
  'carbon-motion': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/motion'
  },
  'carbon-patterns': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/patterns'
  },
  'carbon-pictograms': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/pictograms'
  },
  'carbon-pictograms-react': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/pictograms-react'
  },
  'carbon-themes': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/themes'
  },
  'carbon-type': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/type'
  },
  'carbon-upgrade': {
    host: 'github.ibm.com',
    org: 'matt-rosno',
    repo: 'carbon',
    path: '/packages/upgrade'
  }
}

module.exports = {
  libraryAllowList
}
