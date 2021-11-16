/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable max-len */

/**
 * @typedef {Object} PlaceholderImage
 * @property {string} base64 - Base 64 encoded placeholder image
 * @property {Object} img
 * @property {number} img.height - Unitless height in pixels
 * @property {string} img.src - Path to image relative to the `/public` directory
 * @property {string} img.type - Image file extension
 * @property {number} img.width - Unitless width in pixels
 */

/**
 * @typedef {Object} LibraryContent
 * @property {string} description - One-two sentence description
 * @property {string} externalDocsUrl - Absolute URL to externally-hosted documentation
 * @property {string} id - Unique identifier within the platform
 * @property {"Apache-2.0" | ""} license - Open-source license
 * @property {string} name - Display name
 * @property {string} package - Code package name
 * @property {boolean} private - Exclude library from catalogs
 * @property {string} version - Package version
 */

/**
 * @typedef {Object} AssetContent
 * @property {string} description - One-two sentence description
 * @property {string} externalDocsUrl - Absolute URL to externally-hosted documentation
 * @property {"angular" | "react" | "react-native" | "svelte" | "vue" | "web-component" | "design-only"} framework - Asset framework
 * @property {string} id - Unique identifier within the asset's library
 * @property {string} name - Display name
 * @property {"cross-platform" | "web"} platform - Asset environment
 * @property {boolean} private - Exclude asset from catalogs
 * @property {"draft" | "experimental" | "stable" | "deprecated" | "sunset"} status - Consumption expectation
 * @property {PlaceholderImage} thumbnailData - Thumbnail image source, dimensions, and placeholder
 * @property {string} thumbnailPath - Asset's thumbnail image relative to its GitHub source
 * @property {"element" | "component" | "pattern" | "function" | "layout"} type - Asset categoration
 */

exports.unused = {}
