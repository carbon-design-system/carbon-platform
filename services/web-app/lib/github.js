/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import yaml from 'js-yaml'
import { isEmpty, isEqual } from 'lodash'
import { getPlaiceholder } from 'plaiceholder'

import { IMAGES_CACHE_PATH } from '@/config/constants'
import { libraryAllowList } from '@/data/libraries'
import { getResponse, writeFile } from '@/lib/file-cache'
import { getSlug } from '@/utils/slug'
import { removeLeadingSlash } from '@/utils/string'

/**
 * Validates the route's parameters and returns an object that also includes the library's slug as
 * well as path to the directory that contains the carbon-library.yml. Returns an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 * @param {import('../typedefs').Params} params - Partially-complete parameters
 * @returns {import('../typedefs').Params} Complete parameters
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
 * Takes an inheritance reference like `ibmdotcom-styles@latest/back-to-top` and returns parmas from
 * the library allowlist.
 * @param {string} inheritanceRef - Inheritance reference
 * @returns {import('../typedefs').Params} Resource parameters
 */
const getParamsFromInheritedAsset = (inheritanceRef = '') => {
  const [libraryId] = inheritanceRef.split('@')
  const libraryRef = inheritanceRef.slice(
    inheritanceRef.indexOf('@') + 1,
    inheritanceRef.lastIndexOf('/')
  )
  const [assetId] = inheritanceRef.split('/').reverse()

  const params = libraryAllowList[libraryId]

  return params
    ? {
        ...params,
        library: libraryId,
        ref: libraryRef || 'latest',
        asset: assetId
      }
    : {}
}

/**
 * If the params map to a valid library in the allowlist, fetch the contents of the library's
 * metadata file. If the params are not valid, early return so the page redirects to 404.
 * @param {import('../typedefs').Params} params
 * @returns {import('../typedefs').Library}
 */
export const getLibraryData = async (params = {}) => {
  const libraryParams = await validateLibraryParams(params)

  if (isEmpty(libraryParams)) return null

  /**
   * @type {import('../typedefs').GitHubContentResponse}
   */
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

  /**
   * @type {import('../typedefs').LibraryContent}
   */
  const content = yaml.load(Buffer.from(response.content, response.encoding).toString())

  const assets = await getLibraryAssets(params, true)

  const packageJsonContent = await getPackageJsonContent(params, content.packageJsonPath)

  const filteredAssets = libraryParams.asset
    ? assets.filter((asset) => getSlug(asset.content) === libraryParams.asset)
    : assets

  return {
    params: libraryParams,
    response,
    content: {
      ...packageJsonContent,
      ...content, // spread last to use schema description if set
      private: !!content.private // default to false if not specified
    },
    assets: filteredAssets
  }
}

/**
 * If the params map to a valid library in the allowlist, get the default branch if there isn't a
 * specified ref, then recursively get all asset metadata files. Find the files that are in the
 * library's subdirectory and then fetch the contents for each asset metadata file.
 * @param {import('../typedefs').Params} params
 * @param {boolean} inheritContent
 * @returns {import('../typedefs').Asset[]}
 */
const getLibraryAssets = async (params = {}, inheritContent = false) => {
  const libraryParams = await validateLibraryParams(params)

  if (isEmpty(libraryParams)) return []

  // get all asset metadata files in subdirectories

  /**
   * @type {import('../typedefs').GitHubTreeResponse}
   */
  let treeResponse = {}

  try {
    treeResponse = await getResponse(
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

  const assetContentPromises = treeResponse.tree
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
    /**
     * @type {import('../typedefs').AssetContent}
     */
    const content = yaml.load(Buffer.from(response.content, response.encoding).toString())

    return {
      params: libraryParams,
      response,
      content: {
        ...content,
        private: !!content.private // default to false if not specified
      }
    }
  })

  const inheritedAssets = inheritContent ? await getInheritedAssets(assets) : []

  const imgPlaceholders = await getImagePlaceholders(assets)

  return assets.map((asset) => {
    const assetExtensions = getAssetExtensions(asset, inheritedAssets, imgPlaceholders)

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
 * Merges inherited content and placeholder image data into an asset's content.
 * @param {import('../typedefs').Asset} originalAsset - Original asset
 * @param {import('../typedefs').Asset[]} inheritedAssets - Inherited assets
 * @param {import('../typedefs').PlaceholderImage[]} imgPlaceholders - Placeholder images
 * @returns {import('../typedefs').AssetContent}
 */
const getAssetExtensions = (originalAsset, inheritedAssets, imgPlaceholders) => {
  const assetExtensions = {}
  const basePath = originalAsset.response.path.replace('/carbon-asset.yml', '')

  // add image placeholder data

  const foundImage = imgPlaceholders.find((image) => {
    return (
      image.img.src.includes(basePath) &&
      image.img.src.includes(originalAsset.content.thumbnailPath)
    )
  })

  if (foundImage) {
    const { img, base64 } = foundImage
    assetExtensions.thumbnailData = { img, base64 }
  }

  // add inherited data

  if (originalAsset.content.inherits) {
    const inheritedParams = getParamsFromInheritedAsset(originalAsset.content.inherits.asset)

    const inheritedAsset = inheritedAssets.find(
      (asset) => isEqual(asset.params) === isEqual(inheritedParams)
    )

    if (inheritedAsset) {
      // loop over properties, extend
      if (
        originalAsset.content.inherits &&
        originalAsset.content.inherits.properties &&
        originalAsset.content.inherits.properties.length
      ) {
        originalAsset.content.inherits.properties.forEach((property) => {
          assetExtensions[property] = inheritedAsset.content[property] || ''
        })

        if (
          originalAsset.content.inherits.properties.includes('thumbnailPath') &&
          inheritedAsset.content.thumbnailData
        ) {
          assetExtensions.thumbnailData = inheritedAsset.content.thumbnailData
        }
      }
    }
  }

  return assetExtensions
}

/**
 * Iterates over an array of assets and returns an array of assets that are to be inherited.
 * @param {import('../typedefs').Asset[]} assets - Assets
 * @returns {import('../typedefs').Asset[]} Array of assets that will be inherited
 */
const getInheritedAssets = async (assets) => {
  const inheritedLibraryAssetsPromises = []

  assets.forEach((asset) => {
    if (asset.content.inherits) {
      const inheritedParams = getParamsFromInheritedAsset(asset.content.inherits.asset)

      if (!isEmpty(inheritedParams)) {
        inheritedLibraryAssetsPromises.push(getLibraryAssets(inheritedParams, false))
      }
    }
  })

  const inheritedAssetsResponses = await Promise.all(inheritedLibraryAssetsPromises)

  return inheritedAssetsResponses.flat()
}

/**
 * Finds thumbnail images, gets content of each image, writes each image to disk, generates
 * placeholder images, returns placeholder images
 * @param {import('../typedefs').Asset[]} assets - Assets
 * @returns {Promise<import('../typedefs').PlaceholderImage[]>} Array of placeholder objects
 */
const getImagePlaceholders = async (assets) => {
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

  return Promise.all(imgPlaceholderPromises)
}

/**
 * Iterates over all libraries in the allowlist and fetches library data with no ref so the default
 * branch is used.
 * @returns {import('../typedefs').Libraries}
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
    libraries: libraries.filter((n) => n)
  }
}

/**
 * Requests content of the package.json file and returns some of the properties.
 * @param {import('../typedefs').Params} params
 * @param {string} packageJsonPath
 * @returns {import('../typedefs').LibraryContent}
 */
const getPackageJsonContent = async (params = {}, packageJsonPath = '/package.json') => {
  const libraryParams = await validateLibraryParams(params)

  if (isEmpty(libraryParams)) return {}

  /**
   * @type {import('../typedefs').GitHubContentResponse}
   */
  let response = {}

  try {
    response = await getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: libraryParams.org,
      repo: libraryParams.repo,
      path: removeLeadingSlash(`${libraryParams.path}${packageJsonPath}`),
      ref: libraryParams.ref
    })
  } catch (err) {
    return {}
  }

  /**
   * @type {import('../typedefs').LibraryContent}
   */
  const packageJsonContent = yaml.load(Buffer.from(response.content, response.encoding).toString())

  return {
    description: packageJsonContent.description,
    license: packageJsonContent.license,
    package: packageJsonContent.name,
    version: packageJsonContent.version
  }
}
