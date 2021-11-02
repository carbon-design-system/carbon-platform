/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getPlaiceholder } from 'plaiceholder'

export const generateBlurImage = async (path) => {
  const { base64, img } = await getPlaiceholder(path, {
    size: 10
  })

  return { base64, img }
}
