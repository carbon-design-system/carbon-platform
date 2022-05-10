/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import imageExtensions from 'image-extensions'
import sizeOf from 'image-size'
import path from 'path'

import { IMAGES_CACHE_PATH } from '@/config/constants'

/**
 * Resolve image paths. Set `height` and `width` attributes on images as those
 * are required for Next.js Image do to its thing.
 *
 * TODO: resolve relative links so a library component can link to another
 * component in that library.
 */
export const mdxImgResolver = (dirPath, url, node) => {
  const extensions = new Set(imageExtensions)

  if (!url.host && url.path && extensions.has(path.extname(url.path).slice(1).toLowerCase())) {
    const imgPath = decodeURIComponent(`/${IMAGES_CACHE_PATH}/${dirPath}/${url.path}`)

    if (node.tagName === 'img') {
      try {
        const dimensions = sizeOf(`${process.cwd()}/public${imgPath}`)

        node.properties.height = dimensions.height
        node.properties.width = dimensions.width
      } catch (err) {
        console.error(err)
      }
    }

    return imgPath
  }
}
