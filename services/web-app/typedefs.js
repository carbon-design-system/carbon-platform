/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */

/**
 * @typedef {object} Params
 * @property {string} asset - Asset slug
 * @property {"github.com" | "github.ibm.com"} host - GitHub API base URL
 * @property {string} library - Library slug
 * @property {string} org - GitHub organization
 * @property {string} path - Relative path to library in repository
 * @property {string} ref - Git branch, tag, or commit hash
 * @property {string} repo - GitHub repository
 * @property {string} sponsor - Team slug
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
 * @typedef {object} LibraryNavData
 * @property {object} back - Has `title` and `path` keys
 * @property {string[]} headings - Library name followed by version
 * @property {object[]} items - Nav item objects that have `title` and `path` or `items`
 */

/**
 * @typedef {object} AssetContent
 * @property {string} description - One-two sentence description
 * @property {string} externalDocsUrl - Absolute URL to externally-hosted documentation
 * @property {"angular" | "react" | "react-native" | "svelte" | "vue" | "web-component" | "design-only"} framework - Asset framework
 * @property {string} id - Unique identifier within the asset's library
 * @property {string} name - Display name
 * @property {"cross-platform" | "web"} platform - Asset environment
 * @property {boolean} noIndex - Exclude asset from catalogs
 * @property {"draft" | "experimental" | "stable" | "deprecated"} status - Consumption expectation
 * @property {PlaceholderImage} thumbnailData - Thumbnail image source, dimensions, and placeholder
 * @property {string} thumbnailPath - Asset's thumbnail image relative to its GitHub source
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

exports.unused = {}
