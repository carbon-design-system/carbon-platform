/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IMAGES_CACHE_PATH } from '@/config/constants'

export const getImgSrc = (repo = {}, path = '') => {
  if (!repo.baseUrl || !path) return null

  return `/${IMAGES_CACHE_PATH}${repo.baseUrl.replace('https://api.github.com', '')}${path}`
}
