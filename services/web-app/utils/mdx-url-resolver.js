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

  // Remove leading slash
  if (url.path.startsWith('/')) {
    url.path = url.path.substring(1)
  }

  // Don't touch extension-less paths (i.e. routes)
  if (!url.path.split('/').pop().includes('.')) {
    return undefined
  }

  // TODO: make sure you can't see private stuff if you provide an absolute url

  const resultUrl = new URL(mdxFileUrlString)
  const pathParts = resultUrl.pathname.split('/')

  // Take off the org/repo from the GH URL
  const orgRepo = pathParts.splice(0, 2).join('/')

  // Set the pathname to the path without the org/repo combo
  resultUrl.pathname = pathParts.join('/')

  // Resolve the dirName (without the org/repo) against the incoming url path
  const dirName = path.dirname(resultUrl.pathname)
  const resolvedPath = path.resolve(dirName, url.path)

  // Combine the resolvedPath (which is not guaranteed to not have '..' anywhere in it) with the
  // org/repo
  resultUrl.pathname = resolvedPath.startsWith('/')
    ? orgRepo + resolvedPath
    : orgRepo + '/' + resolvedPath
  resultUrl.search = '?raw=true'

  return resultUrl.href
}
