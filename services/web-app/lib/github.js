/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Logging } from '@carbon-platform/api/logging'
import yaml from 'js-yaml'
import { get, isEmpty, set } from 'lodash'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'

import { libraryAllowList } from '@/data/libraries'
import { getResponse } from '@/lib/file-cache'
import { mdxImgResolver } from '@/utils/mdx-image-resolver'
import mdxSanitizerPlugin from '@/utils/mdx-sanitizer-plugin.mjs'
import rehypeMetaAsAttributes from '@/utils/rehype-meta-as-attributes.mjs'
import { getAssetErrors, getLibraryErrors } from '@/utils/resources'
import { getAssetId, getLibraryVersionAsset } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { addTrailingSlash, removeLeadingSlash } from '@/utils/string'

const logging = new Logging('web-app', 'github.js')

/**
 * Retrieves Mdx file from github repo and serializes it for rendering
 * @param {import('../typedefs').Params} repoParams - Partially-complete parameters
 * @param {string} mdxPath - path to Mdx from repo source
 * @returns {Promise<import('../typedefs').RemoteMdxResponse>} Mdx Source Object
 */
export const getRemoteMdxData = async (repoParams, mdxPath) => {
  /**
   * @type {import('../typedefs').GitHubContentResponse}
   */
  let response = {}

  try {
    response = await getResponse(repoParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: repoParams.org,
      repo: repoParams.repo,
      path: removeLeadingSlash(mdxPath),
      ref: repoParams.ref
    })
  } catch (err) {
    logging.error(err)
  }

  if (!response.content) {
    return {
      compiledSource: (await serialize('<p>Component not found.</p>')).compiledSource,
      frontmatter: {
        title: 'Not found'
      }
    }
  }

  const usageFileSource = Buffer.from(response.content, response.encoding).toString()

  const dirPath = response._links.html.split('/').slice(0, -1).join('/')

  let serializedContent = null
  try {
    serializedContent = await serialize(usageFileSource, {
      mdxOptions: {
        remarkPlugins: [mdxSanitizerPlugin, remarkGfm, unwrapImages],
        rehypePlugins: [rehypeMetaAsAttributes, [rehypeUrls, mdxImgResolver.bind(null, dirPath)]]
      },
      parseFrontmatter: true
    })
    return serializedContent
  } catch (e) {
    serializedContent = {
      compiledSource: (
        await serialize('<p>There was an error reading MDX data, please check format.</p>')
      ).compiledSource,
      frontmatter: {
        title: 'Read Error'
      }
    }
  }

  return serializedContent
}

/**
 * Validates the route's parameters and returns an object that also includes the library's slug as
 * well as path to the directory that contains the carbon.yml. Returns an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 * @param {import('../typedefs').Params} params - Partially-complete parameters
 * @returns {Promise<import('../typedefs').Params>} Complete parameters
 */
const validateLibraryParams = async (params = {}) => {
  /**
   * @type {import('../typedefs').Params}
   */
  let returnParams = {}

  for (const [slug, library] of Object.entries(libraryAllowList)) {
    if (
      params.host === library.host &&
      params.org === library.org &&
      params.repo === library.repo &&
      params.library === slug
    ) {
      returnParams = {
        library: slug,
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

  try {
    const repo = await getResponse(returnParams.host, 'GET /repos/{owner}/{repo}', {
      owner: returnParams.org,
      repo: returnParams.repo
    })

    if (repo && !returnParams.ref) {
      returnParams.ref = repo.default_branch
    }
  } catch (err) {}

  return returnParams
}

/**
 * Merges inheritable properties from one asset to another if that property isn't set
 * @param {import('../typedefs').Asset[]} assets
 * @param {import('../typedefs').Asset[]} inheritAssets
 * @returns {import('../typedefs').Asset[]}
 */
const mergeInheritedAssets = (assets = [], inheritAssets = []) => {
  const inheritableProperties = ['name', 'description', 'type', 'tags', 'platform', 'thumbnailPath']

  return assets.map((asset) => {
    const assetId = getAssetId(asset)

    if (!assetId) return asset

    const inheritAsset = inheritAssets.find((inherit) => getAssetId(inherit) === assetId)

    if (inheritAsset) {
      inheritableProperties.forEach((property) => {
        const inheritProperty = get(inheritAsset, `content.${property}`)

        if (!get(asset, `content.${property}`) && inheritProperty) {
          set(asset, `content.${property}`, inheritProperty)
        }
      })
    }

    return asset
  })
}

/**
 * Validates a library's structure and content and logs any validation errors as warnings
 * @param {import('../typedefs').library} library
 * @returns {boolean} whether the library is valid or not
 */
const validateLibrary = (library) => {
  const libraryErrors = getLibraryErrors(library)
  if (libraryErrors.length) {
    const errors = libraryErrors.map((err) => {
      const { instancePath, message } = err
      return { instancePath, message }
    })
    logging.warn(
      `Skipping library: ${getSlug(library)} due to the following errors: ${JSON.stringify(errors)}`
    )
    return false
  }
  return true
}

/**
 * Validates an asset's structure and content and logs any validation errors as warnings
 * @param {import('../typedefs').asset} asset
 * @returns {boolean} whether the asset is valid or not
 */
const validateAsset = (asset, library) => {
  const assetErrors = getAssetErrors(asset)
  if (assetErrors.length) {
    const errors = assetErrors.map((err) => {
      const { instancePath, message } = err
      return { instancePath, message }
    })
    logging.warn(
      `Skipping asset: ${getSlug(asset)} for library: ${getSlug(
        library
      )} due to the following errors: ${JSON.stringify(errors)}`
    )
    return false
  }
  return true
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
      path: removeLeadingSlash(`${libraryParams.path}/carbon.yml`),
      ref: libraryParams.ref
    })
  } catch (err) {
    return null
  }

  const content = yaml.load(Buffer.from(response.content, response.encoding).toString())

  /**
   * @type {import('../typedefs').LibraryContent}
   */
  const { library } = content

  if (!library) {
    logging.warn(`Could not retrieve ${libraryParams.library} library's content at this time`)
    return null
  }

  if (!validateLibrary(library)) {
    return null
  }

  let assets = await getLibraryAssets(params)

  if (library.inherits) {
    const inheritParams = getLibraryVersionAsset(library.inherits)

    if (inheritParams.library && libraryAllowList[inheritParams.library]) {
      const fullInheritParams = await validateLibraryParams({
        ...libraryAllowList[inheritParams.library],
        ...inheritParams
      })

      if (!isEmpty(fullInheritParams)) {
        const inheritAssets = await getLibraryAssets(fullInheritParams)

        assets = mergeInheritedAssets(assets, inheritAssets)
      }
    }
  }

  const packageJsonContent = await getPackageJsonContent(params, library.packageJsonPath)

  const filteredAssets = assets.filter((asset) => {
    const isValidAsset = validateAsset(asset.content, library)
    if (libraryParams.asset) {
      return isValidAsset && getSlug(asset.content) === libraryParams.asset
    }
    return isValidAsset
  })

  return {
    params: libraryParams,
    response,
    content: {
      ...packageJsonContent,
      ...library, // spread last to use schema description if set
      noIndex: !!library.noIndex && process.env.INDEX_ALL !== '1' // default to false if not specified
    },
    assets: filteredAssets
  }
}

/**
 * If the params map to a valid library in the allowlist, get the default branch if there isn't a
 * specified ref, then recursively get all asset metadata files. Find the files that are in the
 * library's subdirectory and then fetch the contents for each asset metadata file.
 * @param {import('../typedefs').Params} params
 * @returns {Promise<import('../typedefs').Asset[]>}
 */
const getLibraryAssets = async (params = {}) => {
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
        removeLeadingSlash(file.path).startsWith(
          removeLeadingSlash(addTrailingSlash(libraryParams.path))
        ) && file.path.endsWith('carbon.yml')
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

  let assets = []

  assetContentData.forEach((response) => {
    const content = yaml.load(Buffer.from(response.content, response.encoding).toString())
    /**
     * @type {import('../typedefs').AssetContent[]}
     */
    const { assets: libAssets } = content

    if (!libAssets || isEmpty(libAssets)) {
      return []
    }

    assets.push(
      ...Object.keys(libAssets).map((assetKey) => {
        const asset = libAssets[assetKey]
        return {
          params: libraryParams,
          response,
          content: {
            id: assetKey,
            ...asset,
            noIndex: !!asset.noIndex && process.env.INDEX_ALL !== '1' // default to false if not specified
          }
        }
      })
    )
  })

  assets = assets.filter((asset) => {
    // if fetching a specific asset, only return that
    return libraryParams.asset ? getSlug(asset.content) === libraryParams.asset : true
  })
  return assets
}

/**
 * Gets the GitHub open issue count for an asset using the asset's name searching only issue title
 * @param {import('../typedefs').Asset} asset
 * @returns {number}
 */
export const getAssetIssueCount = async (asset) => {
  const { host, org, repo } = asset.params

  /**
   * @type {import('../typedefs').GitHubSearchResponse}
   */
  let response = {}

  try {
    response = await getResponse(host, 'GET /search/issues', {
      q: `${asset.content.name}+repo:${org}/${repo}+is:issue+is:open+in:title`
    })
  } catch (err) {
    return null
  }

  return response?.total_count ?? 0
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
      library: slug,
      ref: 'latest',
      ...library
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
 * @returns {Promise<import('../typedefs').LibraryContent>}
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
