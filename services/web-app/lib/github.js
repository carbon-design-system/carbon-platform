/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import $RefParser from '@apidevtools/json-schema-ref-parser'
import { Logging, withTrace } from '@carbon-platform/api/logging'
import resources from '@carbon-platform/resources'
import yaml from 'js-yaml'
import isEmpty from 'lodash/isEmpty'
import set from 'lodash/set'
import path from 'path'
import slugify from 'slugify'

import { designKitAllowList, designKitSources } from '@/data/design-kits'
import { libraryAllowList } from '@/data/libraries.mjs'
import { ContentNotFoundException } from '@/exceptions/content-not-found-exception'
import {
  getDereferencedObjectResponse,
  getResponse,
  getSvgResponse,
  slugifyRequest
} from '@/lib/file-cache'
import { getAssetErrors, getDesignKitErrors, getLibraryErrors } from '@/utils/resources'
import { getAssetId, getAssetStatus, getLibraryVersionAsset } from '@/utils/schema'
import { getSlug } from '@/utils/slug'
import { addTrailingSlash, createUrl, removeLeadingSlash } from '@/utils/string'
import { dfs } from '@/utils/tree'
import { urlsMatch } from '@/utils/url'

const logging = new Logging({ component: 'github.js' })

/**
 * Generate and return the nav data for a library.
 * @param {import('@/typedefs').Params} params
 * @param {import('@/typedefs').Library} libraryData
 * @returns {import('@/typedefs').LibraryNavData}
 */
export const getLibraryNavData = (params, libraryData) => {
  logging.info(`Getting library nav data MDX for ${JSON.stringify(params)}`)
  if (isEmpty(libraryData)) return {}

  const getVersion = () => {
    if (params.ref === 'main' || params.ref === 'master' || params.ref === 'latest') {
      return 'Latest version'
    }

    return `v${libraryData.content.version}`
  }

  const libraryNavData = libraryData.content?.navData || []

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
      ...libraryNavData.filter((item) => !item.hidden)
    ],
    path: `/libraries/${params.library}/${params.ref}`
  }
}

/**
 * Retrieves Mdx file from github repo and serializes it for rendering
 * @param {import('@/typedefs').Params} repoParams Partially-complete parameters
 * @param {string} mdxPath Path to Mdx from repo source
 * @returns {Promise<string>} Mdx Source Content
 */
export const getRemoteMdxSource = withTrace(
  logging,
  async function getRemoteMdxSource(repoParams, mdxPath) {
    logging.info(`Getting remote MDX for ${JSON.stringify(repoParams)} ${mdxPath}`)
    /**
     * @type {import('@/typedefs').GitHubContentResponse}
     */
    let response = {}

    if (!repoParams.ref || repoParams.ref === 'latest') {
      logging.info(
        `No Reference set in params, attempting to getRepoDefaultBranch for ${JSON.stringify(
          repoParams
        )}`
      )
      repoParams.ref = await getRepoDefaultBranch(repoParams)
    }

    let src = mdxPath
    let { host, org, repo, ref } = repoParams

    const mdxUrl = createUrl(mdxPath)
    if (!mdxUrl) {
      const fullContentsPath = path.join(
        'https://',
        repoParams.host,
        '/repos',
        repoParams.org,
        repoParams.repo,
        '/contents'
      )

      if (!urlsMatch(fullContentsPath, path.join(fullContentsPath, mdxPath), 5)) {
        logging.warn(
          `Skipping remote mdx content from ${repoParams.host}/${repoParams.org}/${repoParams.repo} due to invalid path ${mdxPath}`
        )

        throw new ContentNotFoundException(mdxPath)
      }
    } else {
      // https://github.com/[org]/[repo]/blob/[ref]/[...path]
      host = mdxUrl.host
      const pathNameChunks = mdxUrl.pathname.split('/')
      org = pathNameChunks[1]
      repo = pathNameChunks[2]
      ref = pathNameChunks[4]
      src = pathNameChunks.slice(5).join('/')
    }

    try {
      response = await getResponse(host, 'GET /repos/{owner}/{repo}/contents/{path}', {
        owner: org,
        repo,
        path: removeLeadingSlash(src),
        ref
      })
    } catch (err) {
      logging.warn(err)

      if (err.name === 'HttpError' && err.message === 'Not Found') {
        throw new ContentNotFoundException(mdxPath)
      }

      throw err
    }

    return {
      mdxSource: Buffer.from(response.content, response.encoding).toString(),
      url: response.html_url
    }
  }
)

/**
 * Given a repo's params, retrieve and return the repo's default branch.
 * @param {import('@/typedefs').Params} params - Partially-complete parameters
 * @returns {Promise<string>} Repo's default branch, undefined if not found
 */
const getRepoDefaultBranch = withTrace(logging, async function getRepoDefaultBranch(params = {}) {
  logging.info(`Getting repo default branch for ${JSON.stringify(params)}`)
  try {
    const repo = await getResponse(params.host, 'GET /repos/{owner}/{repo}', {
      owner: params.org,
      repo: params.repo
    })

    return repo?.default_branch
  } catch (err) {
    logging.warn(`Error obtaining repo default branch for ${params.org}/${params.repo}: ${err}`)
    // TODO: throw error instead
    return null
  }
})

/**
 * Validates the route's parameters and returns an object that also includes the
 *  path to the directory that contains the carbon.yml. Returns an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 * @param {import('@/typedefs').Params} params - Partially-complete parameters
 * @returns {Promise<import('@/typedefs').Params>} Complete parameters
 */
const validateDesignKitsParams = async (params = {}) => {
  logging.info(`Validating design kits params for ${JSON.stringify(params)}`)
  /**
   * @type {import('@/typedefs').Params}
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
      logging.info(`Getting repository info for ${JSON.stringify(params)}`)
      const repo = await getResponse(returnParams.host, 'GET /repos/{owner}/{repo}', {
        owner: returnParams.org,
        repo: returnParams.repo
      })

      if (repo) {
        returnParams.ref = repo.default_branch
      }
    } catch (err) {
      logging.wanr(`Error retrieving repository info for ${JSON.stringify(params)}`)
    }
  }

  return returnParams
}

/**
 * Validates the route's parameters and returns an object that also includes the library's slug as
 * well as path to the directory that contains the carbon.yml. Returns an empty object if
 * not found. Does not validate ref, so people can set their own branch / tag / commit.
 * @param {import('@/typedefs').Params} params - Partially-complete parameters
 * @returns {Promise<import('@/typedefs').Params>} Complete parameters
 */
const validateLibraryParams = async (params = {}) => {
  logging.info(`Validating library params for ${JSON.stringify(params)}`)
  /**
   * @type {import('@/typedefs').Params}
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
    logging.info(
      `No Reference set in params, attempting to getRepoDefaultBranch for ${JSON.stringify(
        returnParams
      )}`
    )
    returnParams.ref = await getRepoDefaultBranch(returnParams)
  }

  return returnParams
}

/**
 * Merges inheritable properties from one asset to another if that property isn't set
 * @param {import('@/typedefs').Asset[]} assets
 * @param {import('@/typedefs').Asset[]} inheritAssets
 * @returns {import('@/typedefs').Asset[]}
 */
const mergeInheritedAssets = (assets = [], inheritAssets = []) => {
  const inheritableProperties = [
    'name',
    'description',
    'docs',
    'type',
    'tags',
    'platform',
    'thumbnailSvg'
  ]

  return assets.map((asset) => {
    const assetId = getAssetId(asset)

    if (!assetId) return asset

    const inheritAsset = inheritAssets.find((inherit) => getAssetId(inherit) === assetId)

    if (inheritAsset) {
      inheritableProperties.forEach((property) => {
        const inheritProperty = inheritAsset.content?.[property]

        // check for undefined properties, as well as empty arrays for tags
        if (isEmpty(asset.content?.[property]) && inheritProperty) {
          set(asset, `content.${property}`, inheritProperty)
        }
      })
    }

    return asset
  })
}

/**
 * Ensures an asset has default properties if not set
 * @param {import('@/typedefs').AssetContent} assetContent
 * @returns {import('@/typedefs').AssetContent}
 */
const mergeAssetContentDefaults = (assetContent = {}) => {
  return {
    ...assetContent,
    noIndex: !!assetContent.noIndex && process.env.INDEX_ALL !== '1', // default to false if not specified
    framework: assetContent?.framework ?? 'design-only',
    tags: assetContent?.tags ?? []
  }
}

/**
 * Validates a design kit's structure and content and logs any validation errors as warnings
 * @param {import('@/typedefs').DesignKit} designKit
 * @returns {boolean} whether the design kit is valid or not
 */
const validateDesignKit = (designKit, source) => {
  logging.info(`Validating design kit ${JSON.stringify(designKit)} from ${source}`)
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
 * @param {import('@/typedefs').library} library
 * @returns {boolean} whether the library is valid or not
 */
const validateLibrary = (library) => {
  logging.info(`Validating library ${getSlug(library)}`)
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
 * @param {import('@/typedefs').asset} asset
 * @returns {boolean} whether the asset is valid or not
 */
const validateAsset = (asset, library) => {
  logging.info(`Validating Asset ${getSlug(asset)} from library ${getSlug(library.content)}`)
  const assetErrors = getAssetErrors(asset)
  if (assetErrors.length) {
    const errors = assetErrors.map((err) => {
      const { instancePath, message } = err
      return { instancePath, message }
    })
    logging.warn(
      `Skipping asset: ${getSlug(asset)} for library: ${getSlug(
        library.content
      )} due to the following errors: ${JSON.stringify(errors)}`
    )
    return false
  }
  return true
}

/**
 * Finds library object in libraryAllowList from slug and returns a valid set of params
 * (if library is valid)
 * @param {string} libraryVersionSlug e.g. 'carbon-charts@0.1.121'
 * @returns {Promise<import('@/typedefs').Params>}
 */
export const getLibraryParams = withTrace(
  logging,
  async function getLibraryParams(libraryVersionSlug) {
    logging.info(`Getting library params for ${libraryVersionSlug}`)
    const inheritParams = getLibraryVersionAsset(libraryVersionSlug)

    if (inheritParams.library && libraryAllowList[inheritParams.library]) {
      return validateLibraryParams({
        ...libraryAllowList[inheritParams.library],
        ...inheritParams
      })
    } else {
      logging.warn(`Could not find entry in allowlist for ${libraryVersionSlug}`)
      return {}
    }
  }
)

/**
 * Creates an absolute github URL from a give library params and a ref path.
 * @param {import('@/typedefs').Params} params
 * @param {string} ref
 * @returns {string} an absolute URL or an empty string if the resulting url is invalid
 */
const getAbsoluteSchemaRef = (params, ref = '') => {
  logging.info(`Constructing absolute schema ref for ${JSON.stringify(params)}, ref: ${ref}`)
  try {
    const basePath = `https://raw.${params.host}/${params.org}/${params.repo}/${params.ref}`
    const absoluteUrl = path.join(basePath, params.path, ref)
    return urlsMatch(absoluteUrl, basePath, 3) ? absoluteUrl : ''
  } catch (err) {
    logging.warn(
      `Could not construct absolute schema from ${JSON.stringify(
        params
      )} and ref: ${ref}, error: ${err}`
    )
    return ''
  }
}

const resolveDesignKitUrl = (params, key, value) => {
  logging.info(
    `Resolving design kit url for ${JSON.stringify(params)}, key: ${key}, value: ${value}`
  )
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
 * @param {import('@/typedefs').Params} params
 * @param {*} data
 * @returns
 */
const resolveSchemaReferences = withTrace(
  logging,
  async function resolveSchemaReferences(params, data) {
    logging.info(`Resolving schema references for library ${data.library.name}`)
    if (data.library.designKits) {
      for await (const [key, value] of Object.entries(data.library.designKits)) {
        if (value.$ref) {
          if (
            !createUrl(value.$ref) &&
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

    logging.info(`Dereferencing library ${data.library.name}`)
    const dereferencedLibrary = await $RefParser.dereference(data)

    return Buffer.from(JSON.stringify(dereferencedLibrary), 'utf8').toString('base64')
  }
)

/**
 * Find related libraries by group to a particular library
 * @param {import('@/typedefs').Library} libData
 * @returns {Promise<import('@/typedefs').Library[]>}
 */
export const getLibraryRelatedLibs = withTrace(
  logging,
  async function getLibraryRelatedLibs(libData) {
    logging.info(`Getting Related libraries for ${getSlug(libData.content)}`)
    const relatedLibs = []
    if (libData.params.group) {
      for (const [slug, libraryParams] of Object.entries(libraryAllowList)) {
        if (libraryParams.group === libData.params.group) {
          const relatedLibData = await getLibraryData({
            library: slug,
            ref: 'latest',
            ...libraryParams
          })
          if (
            relatedLibData?.content.id !== libData.content.id &&
            !relatedLibData?.content?.noIndex
          ) {
            relatedLibs.push(relatedLibData)
          }
        }
      }
    }
    return relatedLibs
  }
)

/**
 * Finds and returns array of related frameworks for a given asset
 * @param {import('@/typedefs').Params} params
 * @param {import('@/typedefs').Library} library
 * @returns {Promise<{framework: string, params: import('@/typedefs).Params}[]>}
 * Array of related frameworks
 */
export const getAssetRelatedFrameworks = withTrace(
  logging,
  async function getAssetRelatedFrameworks(params, library) {
    logging.info(`Getting related frameworks for asset for ${JSON.stringify(params)}`)
    const otherAssetFrameworks = []
    if (library.params.group) {
      for (const [slug, libraryParams] of Object.entries(libraryAllowList)) {
        if (libraryParams.group === library.params.group) {
          const libParams = {
            library: slug,
            ref: 'latest',
            ...libraryParams,
            asset: params.asset
          }
          const relatedLibData = await getLibraryData(libParams)
          if (
            relatedLibData?.content.id !== library.content.id &&
            !relatedLibData?.content?.noIndex &&
            relatedLibData.assets?.length &&
            !relatedLibData.assets[0].content?.noIndex &&
            relatedLibData.assets[0].content?.framework
          ) {
            otherAssetFrameworks.push({
              framework: relatedLibData.assets[0]?.content.framework,
              params: {
                library: slug,
                ...libraryParams,
                ref: params.ref,
                asset: params.asset
              }
            })
          }
        }
      }
    }
    return otherAssetFrameworks
  }
)

/**
 * If the params map to a valid design kit in the allowlist, fetch the contents of the design kit's
 * metadata file. If the params are not valid, early return.
 * @param {import('@/typedefs').Params} params
 * @returns {import('@/typedefs').DesignKit[]}
 */
export const getDesignKitsData = withTrace(logging, async function getDesignKitsData(params = {}) {
  logging.info(`Getting design kits data for ${JSON.stringify(params)}`)
  const designKitsParams = await validateDesignKitsParams(params)

  if (isEmpty(designKitsParams)) {
    logging.warn(
      `Skipping design kit with params ${JSON.stringify(
        params
      )} because params could not be validated`
    )
    // TODO: throw error instead
    return null
  }

  /**
   * @type {import('@/typedefs').GitHubContentResponse}
   */
  let response = {}

  const options = {
    owner: designKitsParams.org,
    repo: designKitsParams.repo,
    path: removeLeadingSlash(`${designKitsParams.path}/carbon.yml`),
    ref: designKitsParams.ref
  }
  try {
    logging.info(
      `Attempting to obtain repository's carbon.yml file contents with options: ${JSON.stringify(
        options
      )}`
    )
    response = await getResponse(
      designKitsParams.host,
      'GET /repos/{owner}/{repo}/contents/{path}',
      options
    )
  } catch (err) {
    logging.warn(
      `Error getting repository's carbon.yml with options: ${JSON.stringify(
        options
      )}, error: ${err}`
    )
    // TODO: throw error instead
    return null
  }

  let content
  try {
    content = yaml.load(Buffer.from(response.content, response.encoding).toString())
  } catch (err) {
    logging.warn(
      `Error parsing yaml content for design kits from repo ${params.host}/${params.org}/${params.repo}: ${err}`
    )
    // TODO: throw error instead
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
})

/**
 * Adds default attributes to each asset in a library as per necessary (e.g.: docs)
 * @param {import('@/typedefs').Library} library
 * @returns {Promise<void>} A promise that resolves to void.
 */
const addAssetDefaults = withTrace(logging, async function addAssetDefaults(library) {
  logging.info(`Adding defaults for assets in library ${getSlug(library.content)}`)
  const { params } = library
  const libraryTree = await getGithubTree(params)

  const docsKeys = ['overviewPath', 'accessibilityPath', 'codePath', 'usagePath', 'stylePath']

  if (!libraryTree?.tree?.length) return

  // add docs defaults
  library.assets.forEach((asset) => {
    const assetDocsKeys = Object.keys(asset.content.docs ?? {})

    // if asset docs has all path keys, skip this iteration
    if (docsKeys.every((key) => assetDocsKeys.includes(key))) {
      return
    }

    const carbonYmlDirPath = asset.response.path.split('/').slice(0, -1).join('/')

    const defaultOverviewPath = path.join('./' + carbonYmlDirPath, './overview.mdx')
    const defaultAccessibilityPath = path.join('./' + carbonYmlDirPath, './accessibility.mdx')
    const defaultCodePath = path.join('./' + carbonYmlDirPath, './code.mdx')
    const defaultStylePath = path.join('./' + carbonYmlDirPath, './style.mdx')
    const defaultUsagePath = path.join('./' + carbonYmlDirPath, './usage.mdx')

    const docsDefaults = {
      overviewPath: {
        path: defaultOverviewPath,
        default: './overview.mdx'
      },
      accessibilityPath: {
        path: defaultAccessibilityPath,
        default: './accessibility.mdx'
      },
      codePath: {
        path: defaultCodePath,
        default: './code.mdx'
      },
      stylePath: {
        path: defaultStylePath,
        default: './style.mdx'
      },
      usagePath: {
        path: defaultUsagePath,
        default: './usage.mdx'
      }
    }

    libraryTree.tree.forEach((file) => {
      docsKeys.forEach((key) => {
        // if assets docs doesn't have path and the file matches the default path, add it
        if (!asset.content.docs?.[key] && file.path === docsDefaults[key].path) {
          if (!asset.content.docs) {
            asset.content.docs = {}
          }
          asset.content.docs[key] = docsDefaults[key].default
        }
      })
    })
  })
})

/**
 * If the params map to a valid library in the allowlist, fetch the contents of the library's
 * metadata file. If the params are not valid, early return so the page redirects to 404.
 * @param {import('@/typedefs').Params} params
 * @returns {Promise<import('@/typedefs').Library>}
 */
export const getLibraryData = withTrace(logging, async function getLibraryData(params = {}) {
  logging.info(`Getting library data for ${JSON.stringify(params)}`)
  const libraryParams = await validateLibraryParams(params)

  if (isEmpty(libraryParams)) {
    logging.warn(
      `Skipping library with params ${JSON.stringify(params)} because they could not be validated`
    )
    return null
  }

  /**
   * @type {import('@/typedefs').GitHubContentResponse}
   */
  let response = {}

  const { host, org, repo, path: libPath, ref } = libraryParams

  const options = {
    owner: org,
    repo,
    path: removeLeadingSlash(`${libPath}/carbon.yml`),
    ref
  }
  try {
    logging.info(
      `Attempting to obtain repository's carbon.yml file contents with options: ${JSON.stringify(
        options
      )}`
    )
    response = await getResponse(host, 'GET /repos/{owner}/{repo}/contents/{path}', options)
  } catch (err) {
    logging.warn(
      `Error getting repository's carbon.yml with options: ${JSON.stringify(
        options
      )}, error: ${err}`
    )
    // TODO: throw error instead
    return null
  }

  let content
  const dereferenceKey = slugifyRequest(
    host,
    'GET DEREFERENCED /repos/{owner}/{repo}/contents/{path}',
    options
  )
  try {
    logging.info('Dereferencing library object')
    const base64EncodedLib = await getDereferencedObjectResponse(
      dereferenceKey,
      yaml.load(Buffer.from(response.content, response.encoding).toString()),
      resolveSchemaReferences.bind(null, libraryParams)
    )
    content = JSON.parse(Buffer.from(base64EncodedLib, 'base64').toString('utf-8'))
  } catch (err) {
    logging.warn(`Error parsing yaml content for library ${params.library}: ${err}`)
    // TODO: throw error
    return null
  }

  /**
   * @type {import('@/typedefs').LibraryContent}
   */
  const { library } = content

  if (!library) {
    logging.warn(`Could not retrieve ${libraryParams.library} library's content at this time`)
    return null
  }

  if (!validateLibrary(library)) {
    logging.warn(`Invalid library object, skipping: ${JSON.stringify(library)}`)
    return null
  }

  // validate library design kits
  Object.entries(library.designKits ?? []).forEach(([key, value]) => {
    if (!validateDesignKit(value, `library ${getSlug(library)}`)) {
      delete library.designKits[key]
    }
  })

  const assets = await getLibraryAssets(libraryParams)

  const packageJsonContent = await getPackageJsonContent(params, library.packageJsonPath)

  const libraryResponse = {
    params: libraryParams,
    response,
    content: {
      ...packageJsonContent,
      ...library, // spread last to use schema description if set
      noIndex: !!library.noIndex && process.env.INDEX_ALL !== '1' // default to false if not specified
    },
    assets: assets.map((asset) => {
      return { ...asset, statusKey: getAssetStatus(asset) }
    })
  }

  await addLibraryInheritedData(libraryResponse)

  await addAssetDefaults(libraryResponse)

  validateLibraryAssets(libraryResponse)

  return libraryResponse
})

/**
 * Validates and returns an asset thumbnail path with the leading slash removed.
 * @param {import('@/typedefs').Params} libraryParams
 * @param {import('@/typedefs').Asset} asset
 * @returns {string}
 */
const getThumbnailPath = (libraryParams = {}, asset = {}) => {
  logging.info(
    `Getting thumbnailPath for asset ${getSlug(asset)}, params: ${JSON.stringify(libraryParams)}`
  )
  if (isEmpty(libraryParams)) {
    logging.warn(
      `Could not retrieve thumbnailPath for asset ${getSlug(asset)} due to invalid library params`
    )
    return ''
  }
  if (!asset.thumbnailPath) {
    logging.warn(`Could not retrieve thumbnailPath for asset ${getSlug(asset)},
    params: ${JSON.stringify(libraryParams)} due to invalid thumbnailPath`)
    return ''
  }

  const thumbnailPathFromRoot = path.join(libraryParams.path, asset.thumbnailPath)

  const fullContentsPath = path.join(
    'https://',
    libraryParams.host,
    '/repos',
    libraryParams.org,
    libraryParams.repo,
    '/contents'
  )

  if (!urlsMatch(fullContentsPath, path.join(fullContentsPath, thumbnailPathFromRoot), 5)) {
    // thumbnailPath doesn't belong to this repo and doesn't pass security check
    logging.warn(
      `Skipping thumbnailPath content from ${libraryParams.host}/${libraryParams.org}/${libraryParams.repo} ` +
        ` due to invalid path ${asset.thumbnailPath}`
    )

    return ''
  }

  return removeLeadingSlash(thumbnailPathFromRoot)
}

/**
 * Recursively get all github metadata files for a given library
 * @param {import('@/typedefs').Params} params
 * @returns {Promise<import('@/typedefs').GitHubTreeResponse>}
 */
const getGithubTree = withTrace(logging, async function getGithubTree(params = {}) {
  logging.info(`Getting repo github tree, params: ${JSON.stringify(params)}`)

  const libraryParams = await validateLibraryParams(params)

  if (isEmpty(libraryParams)) {
    logging.warn(
      `Could not retrieve repository's github tree due to invalid params, params: ${JSON.stringify(
        params
      )}`
    )
    return []
  }

  // get all asset metadata files in subdirectories

  /**
   * @type {import('@/typedefs').GitHubTreeResponse}
   */
  let treeResponse = {}

  const options = {
    owner: libraryParams.org,
    repo: libraryParams.repo,
    ref: libraryParams.ref
  }
  try {
    logging.info(
      `Attempting to obtain repository's github tree contents with options: ${JSON.stringify(
        options
      )}`
    )
    treeResponse = await getResponse(
      libraryParams.host,
      'GET /repos/{owner}/{repo}/git/trees/{ref}?recursive=1',
      options
    )
  } catch (err) {
    logging.warn(
      `Error getting repository's github tree with options: ${JSON.stringify(
        options
      )}, error: ${err}`
    )
    // TODO: throw error
    return []
  }

  return treeResponse
})

/**
 * If the params map to a valid library in the allowlist, get the default branch if there isn't a
 * specified ref, then recursively get all asset metadata files. Find the files that are in the
 * library's subdirectory and then fetch the contents for each asset metadata file.
 * @param {import('@/typedefs').Params} params
 * @returns {Promise<import('@/typedefs').Asset[]>}
 */
const getLibraryAssets = withTrace(logging, async function getLibraryAssets(params = {}) {
  logging.info(`Getting assets for library, params: ${JSON.stringify(params)}`)

  const libraryParams = await validateLibraryParams(params)

  if (isEmpty(libraryParams)) {
    logging.warn(
      `Could not retrieve repository's github tree due to invalid params, params: ${JSON.stringify(
        params
      )}`
    )
    return []
  }

  // get all asset metadata files in subdirectories

  /**
   * @type {import('@/typedefs').GitHubTreeResponse}
   */
  const treeResponse = await getGithubTree(params)

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

  logging.info('Waiting for all asset content promises to finish')
  const assetContentData = await Promise.all(assetContentPromises)

  // asset thumbnails to fetch contents and optimize
  const thumbnailPathPromises = []

  // return array
  let assets = []

  assetContentData.forEach((response) => {
    logging.info('Using yaml to load github response content')
    const content = yaml.load(Buffer.from(response.content, response.encoding).toString())
    /**
     * @type {import('@/typedefs').AssetContent[]}
     */
    const { assets: libAssets } = content

    if (!libAssets || isEmpty(libAssets)) {
      logging.warn('Found no assets in github response')
      return []
    }

    Object.keys(libAssets).forEach((assetKey) => {
      /**
       * @type {import('@/typedefs').AssetContent}
       */
      const asset = libAssets[assetKey]

      const thumbnailPathFromRoot = getThumbnailPath(libraryParams, asset)

      if (thumbnailPathFromRoot) {
        const options = {
          owner: libraryParams.org,
          repo: libraryParams.repo,
          path: thumbnailPathFromRoot,
          ref: libraryParams.ref
        }

        thumbnailPathPromises.push(
          getSvgResponse(
            libraryParams.host,
            'GET /repos/{owner}/{repo}/contents/{path}',
            options
          ).catch((err) => {
            logging.warn(
              `Error retrieving svgResponse with options ${JSON.stringify(options)}: ${err}`
            )
            // TODO: throw error
            return 'Error getting SVG response'
          })
        )
      }
    })

    assets.push(
      ...Object.keys(libAssets).map((assetKey) => {
        /**
         * @type {import('@/typedefs').AssetContent}
         */
        const asset = libAssets[assetKey]

        return {
          params: libraryParams,
          response,
          content: mergeAssetContentDefaults({
            id: assetKey,
            ...asset
          })
        }
      })
    )
  })

  assets = assets.filter((asset) => {
    // if fetching a specific asset, only return that
    return libraryParams.asset ? getSlug(asset.content) === libraryParams.asset : true
  })

  // merge in thumbnail content

  try {
    logging.info('Waiting for all thumbnailPathPromises to finish')
    const thumbnailContentData = await Promise.all(thumbnailPathPromises)

    assets = assets.map((asset) => {
      const thumbnailPath = getThumbnailPath(libraryParams, asset.content)

      const thumbnailContentResponse = thumbnailContentData.find(
        (response) => response.path === thumbnailPath
      )

      if (thumbnailContentResponse) {
        asset = {
          ...asset,
          content: {
            ...asset.content,
            thumbnailSvg: Buffer.from(
              thumbnailContentResponse.content,
              thumbnailContentResponse.encoding
            ).toString()
          }
        }
      }

      return asset
    })
  } catch (err) {
    logging.warn(`Error mapping asset content to thumbnailPaths: ${err}`)
  }

  return assets
})

/**
 * Validates and filters an array of assets,
 * returns a modified array containing only valid assets for a library.
 * @param {import('@/typedefs').Library} library
 */
const validateLibraryAssets = (library) => {
  logging.info(`Validating library assets for library ${getSlug(library.content)}`)
  library.assets = library.assets.filter((asset) => {
    const isValidAsset = validateAsset(asset.content, library)
    if (library.params.asset) {
      return isValidAsset && getSlug(asset.content) === library.params.asset
    }
    return isValidAsset
  })
}

/**
 * Adds inherited data to library.
 * @param {import('@/typedefs').Library} library
 * @returns {Promise<void>} A promise that resolves to void.
 */
const addLibraryInheritedData = withTrace(logging, async function addLibraryInheritedData(library) {
  logging.info(`Adding inherited data to library ${getSlug(library.content)}`)
  if (library.content.inherits) {
    const inheritParams = await getLibraryParams(library.content.inherits)

    if (!isEmpty(inheritParams)) {
      const inheritLibrary = await getLibraryData(inheritParams)

      library.assets = mergeInheritedAssets(library.assets, inheritLibrary.assets)

      if (!library.content.designKits && inheritLibrary.content.designKits) {
        library.content.designKits = inheritLibrary.content.designKits
      }
    }
  }
})

/**
 * Gets the GitHub open issue count for an asset using the asset's name searching only issue title
 * @param {import('@/typedefs').Asset} asset
 * @returns {number}
 */
export const getAssetIssueCount = withTrace(logging, async function getAssetIssueCount(asset) {
  logging.info(`Getting asset issue count ${getSlug(asset.content)}`)
  const { host, org, repo } = asset.params

  /**
   * @type {import('@/typedefs').GitHubSearchResponse}
   */
  let response = {}

  try {
    const query = `${asset.content.name}+repo:${org}/${repo}+is:issue+is:open+in:title`
    logging.info(`Attempting to get asset issue response for host ${host}, query:  ${query}`)
    response = await getResponse(host, 'GET /search/issues', {
      q: query
    })
  } catch (err) {
    logging.warn(
      `Could not retrieve asset issue count for asset ${getSlug(asset.content)}, error: ${err}`
    )
    // TODO: throw error
    return null
  }

  return response?.total_count ?? 0
})

/**
 * Retrieves all indexed design kits and filters them out through the allowlist
 * branch is used.
 * @returns {import('@/typedefs').DesignKit[]}
 */
export const getAllDesignKits = withTrace(logging, async function getAllDesignKits() {
  logging.info('Getting all design kits')
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
})

/**
 * Iterates over all libraries in the allowlist and fetches library data with no ref so the default
 * branch is used.
 * @returns {import('@/typedefs').Libraries}
 */
export const getAllLibraries = withTrace(logging, async function getAllLibraries() {
  logging.info('Getting all libraries')
  const promises = []

  for (const [slug, library] of Object.entries(libraryAllowList)) {
    const params = {
      library: slug,
      ref: 'latest',
      ...library
    }

    promises.push(getLibraryData(params))
  }

  logging.info('Waiting for all libraries promises to finish')
  const libraries = await Promise.all(promises)

  return {
    libraries: libraries.filter((n) => n)
  }
})

/**
 * Requests content of the package.json file and returns some of the properties.
 * @param {import('@/typedefs').Params} params
 * @param {string} packageJsonPath
 * @returns {Promise<import('@/typedefs').LibraryContent>}
 */
const getPackageJsonContent = withTrace(
  logging,
  async function getPackageJsonContent(params = {}, packageJsonPath = '/package.json') {
    logging.info(
      `Getting package.json content for params:  ${JSON.stringify(
        params
      )}, path: ${packageJsonPath}`
    )
    const libraryParams = await validateLibraryParams(params)

    if (isEmpty(libraryParams)) {
      logging.warn(
        `Could not retrieve package.json content at this time due to invalid params ${JSON.stringify(
          params
        )}`
      )
      return {}
    }

    /**
     * @type {import('@/typedefs').GitHubContentResponse}
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
      logging.warn(
        `Skipping packageJson content from ${libraryParams.host}/${libraryParams.org}/${libraryParams.repo} ` +
          ` due to invalid path ${packageJsonPath}`
      )
      return {}
    }

    const options = {
      owner: libraryParams.org,
      repo: libraryParams.repo,
      path: removeLeadingSlash(packageJsonPathFromRoot),
      ref: libraryParams.ref
    }
    try {
      response = await getResponse(
        libraryParams.host,
        'GET /repos/{owner}/{repo}/contents/{path}',
        options
      )
    } catch (err) {
      logging.warn(`Could not get repository file path with options: ${options}, error: ${err}`)
      // TODO: throw err
      return {}
    }

    logging.info('Loading packageJson content response content using yaml')
    /**
     * @type {import('@/typedefs').LibraryContent}
     */
    const packageJsonContent = yaml.load(
      Buffer.from(response.content, response.encoding).toString()
    )

    return {
      description: packageJsonContent.description,
      license: packageJsonContent.license,
      package: packageJsonContent.name,
      version: packageJsonContent.version,
      private: !!packageJsonContent.private
    }
  }
)
