/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, PROD } from '@carbon-platform/api/run-mode'

export const CACHE_PATH = getRunMode() === PROD ? '.carbon' : '.carbon-oss'
export const IMAGES_CACHE_PATH = '.carbon'
