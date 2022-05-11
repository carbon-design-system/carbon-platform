/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import imageExtensions from 'image-extensions'
import path from 'path'

/**
 * Resolve image paths.
 */
export const mdxImgResolver = (dirPath, url) => {
  const extensions = new Set(imageExtensions)

  if (!url.host && url.path && extensions.has(path.extname(url.path).slice(1).toLowerCase())) {
    return decodeURIComponent(`${dirPath}/${url.path}?raw=true`)
  }
}
