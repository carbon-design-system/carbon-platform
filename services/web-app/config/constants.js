/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getRunMode, RunMode } from '@carbon-platform/api/runtime'

export const CACHE_PATH = getRunMode() === RunMode.Prod ? '.carbon' : 'public/data'
export const IMAGES_CACHE_PATH = '.carbon'
