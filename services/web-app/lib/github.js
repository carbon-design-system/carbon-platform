/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import $RefParser from '@apidevtools/json-schema-ref-parser'
import { Logging } from '@carbon-platform/api/logging'
import resources from '@carbon-platform/resources/carbon.yml'
import yaml from 'js-yaml'
import { get, isEmpty, set } from 'lodash'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'
import slugify from 'slugify'

import { designKitAllowList, designKitSources } from '@/data/design-kits'
import { libraryAllowList } from '@/data/libraries.mjs'
import { getResponse } from '@/lib/file-cache'
import { mdxImgResolver } from '@/utils/mdx-image-resolver'
import { getAssetErrors, getDesignKitErrors, getLibraryErrors } from '@/utils/resources'
import { getAssetId, getAssetStatus, getLibraryVersionAsset } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { addTrailingSlash, isValidHttpUrl, removeLeadingSlash } from '@/utils/string'
import { dfs } from '@/utils/tree'
import { urlsMatch } from '@/utils/url'

const logging = new Logging({ component: 'github.js' })

/**
 * Generate and return the nav data for a library.
 * @param {import('../typedefs').Params} params
 * @param {import('../typedefs').Library} libraryData
 * @returns {import('../typedefs').LibraryNavData}
 */
export const getLibraryNavData = (params, libraryData) => {
  if (isEmpty(libraryData)) return {}

  const getVersion = () => {
    if (params.ref === 'main' || params.ref === 'master' || params.ref === 'latest') {
      return 'Latest version'
    }

    return `v${libraryData.content.version}`
  }

  const libraryNavData = get(libraryData, ['content', 'navData'], [])

  // traverse items subtree and remove hidden nodes
  dfs(libraryNavData, (item) => {
    const itemSlug = slugify(item.title, { strict: true, lower: true })
    const itemPath = item.parentPath ? `${item.parentPath}/${itemSlug}` : itemSlug
    if (item.items) {
      item.items = item.items?.filter((childItem) => !childItem.hidden)
      item.items.forEach((child) => {
        child.parentPath = itemPath
      })
    }
    if (item.path) {
      item.src = item.path
      item.path = `/libraries/${params.library}/${params.ref}/pages/${itemPath}`
    }
  })

  return {
    back: {
      title: 'Back to all Libraries',
      path: '/libraries'
    },
    headings: [libraryData?.content?.name ?? 'Library', getVersion()],
    items: [
      {
        title: 'Assets',
        path: `/libraries/${params.library}/${params.ref}/assets`
      },
      {
        title: 'Design kits',
        path: `/libraries/${params.library}/${params.ref}/design-kits`
      },
      ...libraryNavData.filter((item) => !item.hidden),
      {
        title: 'Versions',
        path: `/libraries/${params.library}/${params.ref}/versions`
      }
    ],
    path: `/libraries/${params.library}/${params.ref}`
  }
}

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

  if (!repoParams.ref || repoParams.ref === 'latest') {
    repoParams.ref = await getRepoDefaultBranch(repoParams)
  }

  if (!isValidHttpUrl(mdxPath)) {
    const fullContentsPath = path.join(
      'https://',
      repoParams.host,
      '/repos',
      repoParams.org,
      repoParams.repo,
      '/contents'
    )

    if (!urlsMatch(fullContentsPath, path.join(fullContentsPath, mdxPath), 5)) {
      // mdxPath doesn't belong to this repo and doesn't pass security check
      logging.info(
        `Skipping remote mdx content from ${repoParams.host}/${repoParams.org}/${repoParams.repo} due to invalid path ${mdxPath}`
      )
      return null
    }
  }

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

  return serialize(usageFileSource, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, unwrapImages],
      rehypePlugins: [[rehypeUrls, mdxImgResolver.bind(null, dirPath)]]
    },
    parseFrontmatter: true
  }).catch(async (err) => {
    logging.error(err)
    // returning this for now so our app doesn't blow up in case mdx is not valid
    return {
      compiledSource: (await serialize('<p>Could not serialize MDX at this time.</p>'))
        .compiledSource,
      frontmatter: {
        title: 'Parsing Error'
      }
    }
  })
}

/**
 * Given a repo's params, retrieve and return the repo's default branch.
 * @param {import('../typedefs').Params} params - Partially-complete parameters
 * @returns {Promise<string>} Repo's default branch, undefined if not found
 */
const getRepoDefaultBranch = async (params = {}) => {
  try {
    const repo = await getResponse(params.host, 'GET /repos/{owner}/{repo}', {
      owner: params.org,
      repo: params.repo
    })

    return repo?.default_branch
  } catch (err) {
    logging.error(`Error obtaining default branch for repo ${params.org}/${params.repo}: ${err}`)
    return null
  }
}
/**
 * Validates the route's parameters and returns an object that also includes the
 *  path to the directory that contains the carbon.yml. Returns an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 * @param {import('../typedefs').Params} params - Partially-complete parameters
 * @returns {Promise<import('../typedefs').Params>} Complete parameters
 */
const validateDesignKitsParams = async (params = {}) => {
  /**
   * @type {import('../typedefs').Params}
   */
  let returnParams = { ...params }

  for (const designKitSource of designKitSources) {
    if (
      params.host === designKitSource.host &&
      params.org === designKitSource.org &&
      params.repo === designKitSource.repo
    ) {
      returnParams = {
        ...designKitSource
      }

      if (params.ref && params.ref !== 'latest') {
        returnParams.ref = params.ref
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

      if (repo) {
        returnParams.ref = repo.default_branch
      }
    } catch (err) {}
  }

  return returnParams
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
  if (!returnParams.ref) {
    returnParams.ref = await getRepoDefaultBranch(returnParams)
  }

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
 * Validates a design kit's structure and content and logs any validation errors as warnings
 * @param {import('../typedefs').DesignKit} designKit
 * @returns {boolean} whether the design kit is valid or not
 */
const validateDesignKit = (designKit, source) => {
  const designKitErrors = getDesignKitErrors(designKit)
  if (designKitErrors.length) {
    const errors = designKitErrors.map((err) => {
      const { instancePath, message } = err
      return { instancePath, message }
    })
    logging.warn(
      `Skipping design kit: ${getSlug(
        designKit
      )} for ${source} due to the following errors: ${JSON.stringify(errors)}`
    )
    return false
  }
  return true
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
 * Finds library object in libraryAllowList from slug and returns a valid set of params
 * (if librry is valid)
 * @param {string} libraryVersionSlug e.g. 'carbon-charts@0.1.121'
 * @returns {Promise<import('../typedefs').Params>}
 */
export const getLibraryParams = async (libraryVersionSlug) => {
  const inheritParams = getLibraryVersionAsset(libraryVersionSlug)

  if (inheritParams.library && libraryAllowList[inheritParams.library]) {
    return validateLibraryParams({
      ...libraryAllowList[inheritParams.library],
      ...inheritParams
    })
  } else {
    return {}
  }
}

/**
 * Creates an absolute github URL from a give library params and a ref path.
 * @param {import('../typedefs').Params} params
 * @param {string} ref
 * @returns {string} an absolute URL or an empty string if the resulting url is invalid
 */
const getAbsoluteSchemaRef = (params, ref = '') => {
  try {
    const basePath = `https://raw.${params.host}/${params.org}/${params.repo}/${params.ref}`
    const absoluteUrl = path.join(basePath, params.path, ref)
    return urlsMatch(absoluteUrl, basePath, 3) ? absoluteUrl : ''
  } catch (err) {
    return ''
  }
}

const resolveDesignKitUrl = (params, key, value) => {
  const absoluteUrl = getAbsoluteSchemaRef(params, value.$ref)
  if (!absoluteUrl) {
    logging.warn(
      `Skipping design kit: ${key} for library ${params.library} due to invalid ref url: ${value.$ref}`
    )
    return false
  }
  value.$ref = absoluteUrl
  return true
}

/**
 * Dereferences a JSON schema and preserves original refs
 * @param {import('../typedefs').Params} params
 * @param {*} data
 * @returns
 */
const resolveSchemaReferences = async (params, data) => {
  if (data.library.designKits) {
    for await (const [key, value] of Object.entries(data.library.designKits)) {
      if (value.$ref) {
        if (
          !isValidHttpUrl(value.$ref) &&
          !value.$ref.startsWith('#/') &&
          !resolveDesignKitUrl(params, key, value)
        ) {
          delete data.library.designKits[key]
          continue
        }
        try {
          // dereferencing design kits manually so that one invalid design kit
          // doesn't throw out the whole library
          const obj = { kit: data.library.designKits[key], designKits: data.designKits }
          data.library.designKits[key] = (await $RefParser.dereference(obj)).kit
        } catch (err) {
          logging.warn(
            `Skipping design kit: ${key} of library ${params.library} due to reference error: ${err}`
          )
          delete data.library.designKits[key]
        }
      }
    }
  }

  return $RefParser.dereference(data)
}

/**
 * If the params map to a valid design kit in the allowlist, fetch the contents of the design kit's
 * metadata file. If the params are not valid, early return.
 * @param {import('../typedefs').Params} params
 * @returns {import('../typedefs').DesignKit[]}
 */
export const getDesignKitsData = async (params = {}) => {
  const designKitsParams = await validateDesignKitsParams(params)

  if (isEmpty(designKitsParams)) return null

  /**
   * @type {import('../typedefs').GitHubContentResponse}
   */
  let response = {}

  try {
    response = await getResponse(
      designKitsParams.host,
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: designKitsParams.org,
        repo: designKitsParams.repo,
        path: removeLeadingSlash(`${designKitsParams.path}/carbon.yml`),
        ref: designKitsParams.ref
      }
    )
  } catch (err) {
    return null
  }

  let content
  try {
    content = yaml.load(Buffer.from(response.content, response.encoding).toString())
  } catch (err) {
    logging.warn(
      `Error parsing yaml content for design kits from repo ${params.host}/${params.org}/${params.repo}: ${err}`
    )
    return null
  }

  const { designKits } = content

  if (!designKits) {
    logging.warn(
      `Could not retrieve ${params.host}/${params.org}/${params.repo} designKits' content at this time`
    )
    return null
  }

  // validate design kits
  Object.entries(designKits).forEach(([key, value]) => {
    if (!designKitAllowList[key]) {
      logging.warn(
        `Skipping design kit: ${key} from source ${params.host}/${params.org}/${params.repo} because key is not present in allowList`
      )
    }
    if (
      !designKitAllowList[key] ||
      !validateDesignKit(value, `${params.host}/${params.org}/${params.repo}`)
    ) {
      delete designKits[key]
    }
  })

  return Object.entries(designKits).map(([id, designKit]) => {
    return {
      id,
      ...designKit,
      ...designKitAllowList[id]
    }
  })
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

  let content
  try {
    content = await resolveSchemaReferences(
      libraryParams,
      yaml.load(Buffer.from(response.content, response.encoding).toString())
    )
  } catch (err) {
    logging.warn(`Error parsing yaml content for library ${params.library}: ${err}`)
    return null
  }

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

  // validate library design kits
  Object.entries(library.designKits ?? []).forEach(([key, value]) => {
    if (!validateDesignKit(value, `library ${getSlug(library)}`)) {
      delete library.designKits[key]
    }
  })

  let assets = await getLibraryAssets(params)

  if (library.inherits) {
    const inheritParams = await getLibraryParams(library.inherits)

    if (!isEmpty(inheritParams)) {
      const inheritAssets = await getLibraryAssets(inheritParams)

      assets = mergeInheritedAssets(assets, inheritAssets)
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
    assets: filteredAssets.map((asset) => {
      return { ...asset, statusKey: getAssetStatus(asset) }
    })
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
 * Retrieves all indexed design kits and filters them out through the allowlist
 * branch is used.
 * @returns {import('../typedefs').DesignKit[]}
 */
export const getAllDesignKits = async () => {
  const baseDesignKits = Object.entries(resources.designKits)
    .filter(([key]) => !!designKitAllowList[key])
    .map(([key, value]) => {
      return {
        ...value,
        ...designKitAllowList[key],
        id: key
      }
    })

  const promises = []
  designKitSources.forEach((source) => {
    const params = {
      ref: 'latest',
      ...source
    }
    promises.push(getDesignKitsData(params))
  })

  const designKits = await Promise.all(promises)

  return [...designKits.filter((n) => n.length).flat(), ...baseDesignKits]
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

  const packageJsonPathFromRoot = path.join(libraryParams.path, packageJsonPath)
  const fullContentsPath = path.join(
    'https://',
    libraryParams.host,
    '/repos',
    libraryParams.org,
    libraryParams.repo,
    '/contents'
  )

  if (!urlsMatch(fullContentsPath, path.join(fullContentsPath, packageJsonPathFromRoot), 5)) {
    // packageJsonPath doesn't belong to this repo and doesn't pass security check
    logging.info(
      `Skipping packageJson content from ${libraryParams.host}/${libraryParams.org}/${libraryParams.repo} ` +
        ` due to invalid path ${packageJsonPath}`
    )
    return {}
  }

  try {
    response = await getResponse(libraryParams.host, 'GET /repos/{owner}/{repo}/contents/{path}', {
      owner: libraryParams.org,
      repo: libraryParams.repo,
      path: removeLeadingSlash(packageJsonPathFromRoot),
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
    version: packageJsonContent.version,
    private: !!packageJsonContent.private
  }
}
