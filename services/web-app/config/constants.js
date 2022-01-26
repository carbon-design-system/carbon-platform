/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, PRODUCTION } from '@carbon-platform/api/run-mode'

export const CACHE_PATH = getRunMode() === PRODUCTION ? '.carbon' : 'public/data'
export const IMAGES_CACHE_PATH = '.carbon'
