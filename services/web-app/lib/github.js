/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getResponse, writeFile } from '@/lib/file-cache'

import { IMAGES_CACHE_PATH } from '@/config/constants'
import { getPlaiceholder } from 'plaiceholder'
import { libraryAllowList } from '@/data/libraries'
import { removeLeadingSlash } from '@/utils/string'
import slugify from 'slugify'
import yaml from 'js-yaml'

/**
 * Validates the route's parameters and returns an object that also includes the library's slug as
 * well as path to the directory that contains the carbon-library.yml. Return an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 */
const validateLibraryParams = async (params = {}) => {
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

      if (params.ref && params.ref !== 'latest') {
        returnParams.ref = params.ref
      }

      if (params.asset) {
        returnParams.asset = params.asset
      }
    }
  }

  // get default branch if a branch isn't specified through params

  if (!returnParams.ref) {
    try {
      const repo = await getResponse(returnParams.host, 'GET /repos/{owner}/{repo}', {
        owner: returnParams.org,
        repo: returnParams.repo
      })

      returnParams.ref = repo.default_branch
    } catch (err) {}
  }

  return returnParams
}

/**
 * If the params map to a valid library in the allowlist, fetch the contents of the library's
 * metadata file. If the params are not valid, early return so the page redirects to 404.
 */
export const getLibraryData = async (params = {}) => {
  const libraryParams = await validateLibraryParams(params)

  if (!libraryParams || Object.keys(libraryParams).length === 0) return null

  let response = {}

  try {
    response = await getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: libraryParams.org,
      repo: libraryParams.repo,
      path: removeLeadingSlash(`${libraryParams.path}/carbon-library.yml`),
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
  const libraryParams = await validateLibraryParams(params)

  if (!libraryParams || Object.keys(libraryParams).length === 0) return []

  // get all asset metadata files in subdirectories

  let response = {}

  try {
    response = await getResponse(
      libraryParams.host,
      'GET /repos/{owner}/{repo}/git/trees/{ref}?recursive=1',
      {
        owner: libraryParams.org,
        repo: libraryParams.repo,
        ref: libraryParams.ref
      }
    )
  } catch (err) {
    return []
  }

  // request contents for each asset metadata file

  const assetContentPromises = response.tree
    .filter(
      (file) =>
        removeLeadingSlash(file.path).startsWith(removeLeadingSlash(libraryParams.path)) &&
        file.path.endsWith('carbon-asset.yml')
    )
    .map((file) => {
      return getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
        owner: libraryParams.org,
        repo: libraryParams.repo,
        path: removeLeadingSlash(file.path),
        ref: libraryParams.ref
      })
    })

  const assetContentData = await Promise.all(assetContentPromises)

  const assets = assetContentData.map((response) => {
    const content = yaml.load(Buffer.from(response.content, response.encoding).toString())

    return {
      params: libraryParams,
      response,
      content
    }
  })

  // find all thumbnail images, get content of each image, filter out assets with no thumbnail

  const imgContentsPromises = assets
    .map((asset) => {
      if (asset.content.thumbnailPath) {
        return getResponse(asset.params.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
          owner: asset.params.org,
          repo: asset.params.repo,
          path: asset.response.path.replace('/carbon-asset.yml', '') + asset.content.thumbnailPath,
          ref: asset.params.ref
        })
      } else {
        return null
      }
    })
    .filter((item) => item)

  const imgContents = await Promise.all(imgContentsPromises)

  // write images to disk

  const imgWritePromises = imgContents.map((content) => {
    const path = content.html_url.replace('https://', '').replace('/blob', '')

    return writeFile(path, Buffer.from(content.content, content.encoding))
  })

  await Promise.all(imgWritePromises)

  // generate placeholder images

  const imgPlaceholderPromises = imgContents.map((content) => {
    const path = content.html_url.replace('https://', '').replace('/blob', '')

    return getPlaiceholder(`/${IMAGES_CACHE_PATH}/${path}`, {
      size: 10
    })
  })

  const imgPlaceholders = await Promise.all(imgPlaceholderPromises)

  // merge in placeholder images

  return assets.map((asset) => {
    const assetExtensions = {}
    const basePath = asset.response.path.replace('/carbon-asset.yml', '')

    const foundImage = imgPlaceholders.find(
      (image) =>
        image.img.src.includes(basePath) && image.img.src.includes(asset.content.thumbnailPath)
    )

    if (foundImage) {
      const { img, base64 } = foundImage
      assetExtensions.thumbnailData = { img, base64 }
    }

    return {
      ...asset,
      content: {
        ...asset.content,
        ...assetExtensions
      }
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
