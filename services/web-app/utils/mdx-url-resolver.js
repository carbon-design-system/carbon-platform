/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path'

/**
 * Resolve relative paths.
 */
export const mdxUrlResolver = (mdxFileUrlString, url) => {
  if (!mdxFileUrlString || !url.path) {
    return undefined
  }

  if (url.host) {
    return undefined
  }

  if (url.path.startsWith('/')) {
    url.path = url.path.substring(1)
  }

  // TODO: make sure you can't see private stuff if you provide an absolute url
  // TODO: make sure you can't jump outside of your own repo

  const resultUrl = new URL(mdxFileUrlString)

  const dirName = path.dirname(resultUrl.pathname)
  const resolvedPath = path.resolve(dirName, url.path)

  resultUrl.pathname = resolvedPath
  resultUrl.search = '?raw=true'

  return resultUrl.href
}
