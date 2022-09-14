/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @typedef {object} Params
 * @property {string} asset - Asset slug
 * @property {"github.com" | "github.ibm.com"} host - GitHub API base URL
 * @property {string} library - Library slug
 * @property {string} org - GitHub organization
 * @property {string} path - Relative path to library in repository
 * @property {string} ref - Git branch, tag, or commit hash
 * @property {string} repo - GitHub repository
 * @property {string} maintainer - Team slug
 */

/**
 * @typedef {object} Library
 * @property {Asset[]} assets - Library assets
 * @property {LibraryContent} content - Library content
 * @property {Params} params - Params used to fetch library content
 * @property {object} response - GitHub API response from fetching carbon.yml file
 */

/**
 * @typedef {object} Libraries
 * @property {Library[]} libraries - Libraries array
 */

/**
 * @typedef {object} Asset
 * @property {AssetContent} content - Asset content
 * @property {Params} params - Params used to fetch asset content
 * @property {object} response - GitHub API response from fetching carbon.yml file
 */

/**
 * @typedef {object} DesignKit
 * @property {string} name - Design Kit name
 * @property {string} description - Design kit description
 * @property {('adobe-ase'|'adobe-xd'|'axure'|'figma'|'invision-freehand'| 'sketch')} tool
 *  - Design kit’s compatible tool
 * @property {('elements'|'guidelines'|'ui'|'wireframes')} type - Design kit primary categorization
 * @property {('draft'| 'experimental' | 'status'|'deprecated'| object)} status
 *  - Design kit consumption exptectations
 * @property {string} url - Design kit URL
 * @property {('download'| 'link')} action - Determines the action icon
 * @property {('apache-2.0'|'ibm-internal'|'mit')} license - Design kit license
 * @property {boolean} noIndex - If set to true, the global catalogs will exclude the kit
 */

/**
 * @typedef {object} LibraryContent
 * @property {string} description - One-two sentence description
 * @property {string} externalDocsUrl - Absolute URL to externally-hosted documentation
 * @property {string} id - Unique identifier within the platform
 * @property {string} inherits - Library id and optional version delineated by `@`
 * @property {"" | "Apache-2.0" | "MIT"} license - Open-source license
 * @property {string} name - Display name
 * @property {string} package - Code package name
 * @property {boolean} noIndex - Exclude library from catalogs
 * @property {string} version - Package version
 */

/**
 * @typedef {object} AssetContent
 * @property {string} description - One-two sentence description
 * @property {string} externalDocsUrl - Absolute URL to externally-hosted documentation
 * @property {"angular" | "react" | "react-native" | "svelte" | "vue" | "web-component" |
 * "design-only"} framework - Asset framework
 * @property {string} id - Unique identifier within the asset's library
 * @property {string} name - Display name
 * @property {"cross-platform" | "web"} platform - Asset environment
 * @property {boolean} noIndex - Exclude asset from catalogs
 * @property {"draft" | "experimental" | "stable" | "deprecated"} status - Consumption expectation
 * @property {string} thumbnailPath - Asset's thumbnail image path relative to its GitHub source
 * @property {string} thumbnailSvg - Asset's thumbnail image as an optimized string
 * @property {"element" | "component" | "pattern" | "function" | "layout"} type - Asset categoration
 */

/**
 * @typedef {object} PlaceholderImage
 * @property {string} base64 - Base 64 encoded placeholder image
 * @property {object} img - Img object
 * @property {number} img.height - Unitless height in pixels
 * @property {string} img.src - Path to image relative to the `/public` directory
 * @property {string} img.type - Image file extension
 * @property {number} img.width - Unitless width in pixels
 */

/**
 * @typedef {object} GitHubContentResponse
 * @property {string} content
 * @property {string} encoding
 */

/**
 * @typedef {object} GitHubTreeResponse
 * @property {object[]} tree
 */

/**
 * @typedef {object} GitHubSearchResponse
 * @property {number} total_count
 * @property {boolean} incomplete_results
 */

/**
 * @typedef {object} RemoteMdxResponse
 * @property {object} frontmatter
 * @property {string} compiledSource
 */

/**
 * @typedef {object} CompiledSourceData
 * @property {object} matter
 */

/**
 * @typedef {object} CompiledSource
 * @property {string} value
 * @property {CompiledSourceData} data
 */

/**
 * @typedef {object} CompiledSource
 * @property {string} value
 * @property {object} data
 */

/**
 * @typedef {object} mdxError
 * @property {string} name
 * @property {string} message
 * @property {string} stack
 * @property {string} position
 */

/**
 * @typedef {object} RemoteMdxSource
 * @property {CompiledSource} compiledSource
 * @property {mdxError} mdxError
 * @property {string[]} warnings
 */

/**
 * @typedef {Array} Redirect
 * @property {string} 0 - Next.js redirect source
 * @property {string} 1 - Next.js redirect destination
 */

/**
 * /**
 * @typedef {object} Element
 * @property {('draft' | 'experimental' | 'status' | 'deprecated' | object)} status
 * - Consumption expectations
 * @property {string} statusKey - Status key
 */

exports.unused = {}
