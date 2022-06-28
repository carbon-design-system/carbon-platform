/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import $RefParser from '@apidevtools/json-schema-ref-parser'
import { Logging } from '@carbon-platform/api/logging'
import yaml from 'js-yaml'
import { get, isEmpty } from 'lodash'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import rehypeUrls from 'rehype-urls'
import remarkGfm from 'remark-gfm'
import unwrapImages from 'remark-unwrap-images'

import { libraryAllowList } from '@/data/libraries.mjs'
import { getResponse } from '@/lib/file-cache'
import { mdxImgResolver } from '@/utils/mdx-image-resolver'
import { getAssetStatus } from '@/utils/schema'
import { removeLeadingSlash } from '@/utils/string'
import { dfs } from '@/utils/tree'
import { urlsMatch } from '@/utils/url'

const logging = new Logging({ component: 'github.js' })

/**
 * Creates an absolute URL if the reference is a relative path in a GitHub repository.
 * @param {import('../typedefs').Params} params
 * @param {string} ref
 * @returns {string} an absolute URL or empty string
 */
const getAbsoluteSchemaRef = (params, ref = '') => {
  if (!ref.startsWith('http') && !ref.startsWith('#/')) {
    return path.join(
      `https://raw.githubusercontent.com/${params.org}/${params.repo}/${params.ref}/${params.path}/`,
      ref
    )
  }

  return ref
}

/**
 * Resolves all `$ref` in an `assets` object to ensure there are no relative references and
 * preserves original refs
 * @param {import('../typedefs').Params} params
 * @param {*} data
 * @returns
 */
const resolveSchemaAssetReferences = (params, data) => {
  return Object.keys(data).reduce((assets, assetKey) => {
    assets[assetKey] = data[assetKey]

    if (data[assetKey].$ref) {
      assets[assetKey].ref = assets[assetKey].$ref
      assets[assetKey].$ref = getAbsoluteSchemaRef(params, assets[assetKey].$ref)
    }

    return assets
  }, {})
}

/**
 * Dereferences a JSON schema and preserves original refs
 * @param {import('../typedefs').Params} params
 * @param {*} data
 * @returns
 */
const resolveSchemaReferences = async (params, data) => {
  const resolvedData = Object.keys(data).reduce((schema, schemaKey) => {
    if (schemaKey === 'libraries') {
      schema[schemaKey] = Object.keys(data[schemaKey]).reduce((libraries, libraryKey) => {
        const library = {
          ...data[schemaKey][libraryKey],
          assets: resolveSchemaAssetReferences(params, data[schemaKey][libraryKey].assets)
        }

        if (library?.inherits?.$ref) {
          library.inherits.ref = library.inherits.$ref
          library.inherits.$ref = getAbsoluteSchemaRef(params, library.inherits.$ref)
        }

        libraries[libraryKey] = library

        return libraries
      }, {})
    } else if (schemaKey === 'assets') {
      schema[schemaKey] = resolveSchemaAssetReferences(params, data[schemaKey])
    } else {
      schema[schemaKey] = data[schemaKey]
    }

    return schema
  }, {})

  return $RefParser.dereference(resolvedData)
}

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
      return 'Latest'
    }

    return `v${libraryData.content.version}`
  }

  const libraryNavData = get(libraryData, ['content', 'navData'], [])

  // traverse items subtree and remove hidden nodes
  dfs(libraryNavData, (item) => {
    if (item.items) {
      item.items = item.items?.filter((childItem) => !childItem.hidden)
    }
  })

  return {
    back: {
      title: 'Back to all Libraries',
      path: '/assets/libraries'
    },
    headings: [libraryData?.content?.name ?? 'Library', getVersion()],
    items: [
      {
        title: 'Assets',
        path: `/assets/${params.library}/${params.ref}/library-assets`
      },
      {
        title: 'Design kits',
        path: `/assets/${params.library}/${params.ref}/design-kits`
      },
      ...libraryNavData.filter((item) => !item.hidden),
      {
        title: 'Versions',
        path: `/assets/${params.library}/${params.ref}/versions`
      }
    ],
    path: `/assets/${params.library}/${params.ref}`
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
      compiledSource: await (await serialize('<p>Component not found.</p>')).compiledSource,
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
  })
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

  const content = await resolveSchemaReferences(
    libraryParams,
    yaml.load(Buffer.from(response.content, response.encoding).toString())
  )

  /**
   * @type {import('../typedefs').LibraryContent}
   */
  const library = content?.libraries[`${libraryParams.library}`]

  if (!library) {
    logging.warn(`Could not retrieve ${libraryParams.library} library's content at this time`)
    return null
  }

  const packageJsonContent = await getPackageJsonContent(params, library.packageJsonPath)

  return {
    params: libraryParams,
    response,
    content: {
      ...packageJsonContent,
      ...library, // spread last to use schema description if set
      id: libraryParams.library,
      noIndex: !!library.noIndex && process.env.INDEX_ALL !== '1' // default to false if not specified
    },
    assets: Object.keys(library.assets).map((id) => {
      const asset = {
        params: libraryParams,
        content: {
          ...library.assets[id],
          name: library?.inherits?.assets[id]?.name ?? library.assets[id]?.name ?? '',
          description:
            library?.inherits?.assets[id]?.description ?? library.assets[id]?.description ?? '',
          type: library?.inherits?.assets[id]?.type ?? library.assets[id]?.type ?? '',
          tags: library?.inherits?.assets[id]?.tags ?? library.assets[id]?.tags ?? [],
          platform: library?.inherits?.assets[id]?.platform ?? library.assets[id]?.platform ?? '',
          thumbnailPath:
            library?.inherits?.assets[id]?.thumbnailPath ?? library.assets[id]?.thumbnailPath ?? '',
          id
        }
      }

      return {
        ...asset,
        statusKey: getAssetStatus(asset)
      }
    })
  }
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
