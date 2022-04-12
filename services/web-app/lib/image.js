/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getPlaiceholder } from 'plaiceholder'

export const getPlaceholderImages = async (imagePaths = []) => {
  return Promise.all(
    imagePaths.map(async (src) => {
      try {
        const { base64, img } = await getPlaiceholder(src, {
          size: 16
        })

        return {
          ...img,
          blurDataURL: base64
        }
      } catch (err) {
        return {}
      }
    })
  ).then((values) => values)
}
