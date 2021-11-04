/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getResponse } from '@/lib/file-cache'
import { libraryAllowList } from '@/data/libraries'
import slugify from 'slugify'
import yaml from 'js-yaml'

/**
 * Validates the route's parameters and returns an object that also includes the library's slug as
 * well as path to the directory that contains the carbon-library.yml. Return an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 */
const validateLibraryParams = (params = {}) => {
  let returnParams = {}

  for (const [slug, library] of Object.entries(libraryAllowList)) {
    if (
      params.host === library.host &&
      params.org === library.org &&
      params.repo === library.repo &&
      params.library === slug
    ) {
      returnParams = {
        slug,
        ...library
      }

      if (params.ref !== 'latest') {
        returnParams.ref = params.ref
      }

      if (params.asset) {
        returnParams.asset = params.asset
      }
    }
  }

  return returnParams
}

/**
 * If the params map to a valid library in the allowlist, fetch the contents of the library's
 * metadata file. If the params are not valid, early return so the page redirects to 404.
 */
export const getLibraryData = async (params = {}) => {
  const libraryParams = validateLibraryParams(params)

  if (!libraryParams || Object.keys(libraryParams).length === 0) return null

  let response = {}

  try {
    response = await getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: libraryParams.org,
      repo: libraryParams.repo,
      path: `${libraryParams.path}/carbon-library.yml`,
      ref: libraryParams.ref
    })
  } catch (err) {
    return null
  }

  const content = yaml.load(Buffer.from(response.content, response.encoding).toString())

  const assets = await getLibraryAssets(params)

  const filteredAssets = libraryParams.asset
    ? assets.filter((asset) => slugify(asset.content.name, { lower: true }) === libraryParams.asset)
    : assets

  return {
    params: libraryParams,
    response,
    content,
    assets: filteredAssets
  }
}

/**
 * If the params map to a valid library in the allowlist, get the default branch if there isn't a
 * specified ref, then recursively get all asset metadata files. Find the files that are in the
 * library's subdirectory and then fetch the contents for each asset metadata file.
 */
export const getLibraryAssets = async (params = {}) => {
  const libraryParams = validateLibraryParams(params)

  if (!libraryParams || Object.keys(libraryParams).length === 0) return []

  // get default branch if a branch isn't specified through params

  let ref = libraryParams.ref

  if (!ref) {
    try {
      const repo = await getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}', {
        owner: libraryParams.org,
        repo: libraryParams.repo
      })

      ref = repo.default_branch
    } catch (err) {
      return []
    }
  }

  // get all asset metadata files in subdirectories

  let response = {}

  try {
    response = await getResponse(
      libraryParams.host,
      'GET /repos/{owner}/{repo}/git/trees/{ref}?recursive=1',
      {
        owner: libraryParams.org,
        repo: libraryParams.repo,
        ref: ref
      }
    )
  } catch (err) {
    return []
  }

  // request contents for each asset metadata file

  const assetContentPromises = response.tree
    .filter(
      (file) => file.path.startsWith(libraryParams.path) && file.path.endsWith('carbon-asset.yml')
    )
    .map((file) => {
      return getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
        owner: libraryParams.org,
        repo: libraryParams.repo,
        path: file.path,
        ref: ref
      })
    })

  const assetContentData = await Promise.all(assetContentPromises)

  return assetContentData.map((response) => {
    const content = yaml.load(Buffer.from(response.content, response.encoding).toString())

    return {
      params: libraryParams,
      response,
      content
    }
  })
}

/**
 * Iterates over all libraries in the allowlist and fetches library data with no ref so the default
 * branch is used.
 */
export const getAllLibraries = async () => {
  const promises = []

  for (const [slug, library] of Object.entries(libraryAllowList)) {
    const params = {
      ...library,
      library: slug,
      ref: 'latest'
    }

    promises.push(getLibraryData(params))
  }

  const libraries = await Promise.all(promises)

  return {
    libraries
  }
}
