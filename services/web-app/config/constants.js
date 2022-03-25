/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, loadEnvVars, RunMode } from '@carbon-platform/api/runtime'

const CACHE_PATH = getRunMode() === RunMode.Standard ? '.carbon' : 'public/data'
const IMAGES_CACHE_PATH = '.carbon'

const ALLOWED_REFERERS = [
  { protocol: 'https:', domain: '.carbondesignsystem.com' },
  { protocol: 'https:', domain: 'web-app.j73b4w218e4.us-south.codeengine.appdomain.cloud' },
  { protocol: 'http:', domain: 'localhost' },
  { protocol: 'https:', domain: 'localhost' }
]

const { CARBON_INTERNAL_API_SECRET } = loadEnvVars({ CARBON_INTERNAL_API_SECRET: 'DEV_SECRET' })

export { ALLOWED_REFERERS, CACHE_PATH, CARBON_INTERNAL_API_SECRET, IMAGES_CACHE_PATH }
