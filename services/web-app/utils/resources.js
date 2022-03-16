/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// /*
//  * Copyright IBM Corp. 2022, 2022
//  *
//  * This source code is licensed under the Apache-2.0 license found in the
//  * LICENSE file in the root directory of this source tree.
//  */

import assetValidationSchema from '@carbon-platform/schemas/internal/validation/asset-validation.schema.json'
import libraryValidationSchema from '@carbon-platform/schemas/internal/validation/library-validation.schema.json'

const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true, verbose: true })

/**
 * Given a javascript object and a JSON schema, obtains list of errors
 * regarding the object structure and content
 *
 * @param {object} content Javascript object to be evaluated against schema
 * @param {object} schema JSON schema to validate against
 * @returns {object[]} Array of AJV error objects, empty array if valid content
 */
const getValidationErrors = (content, schema) => {
  const validatorFunction = ajv.compile(schema)
  const valid = validatorFunction(content)

  return valid ? [] : validatorFunction.errors
}

/**
 * Given a library asset object, obtains list of errors regarding it's structure and content
 *
 * @param {import('../typedefs').Asset} assetContent a library asset object to be validated
 * @returns {object[]} Array of AJV error objects, empty array if valid asset
 */
const getAssetErrors = (assetContent) => getValidationErrors(assetContent, assetValidationSchema)

/**
 * Given a library object, obtains list of errors regarding it's structure and content
 *
 * @param {import('../typedefs').Library} libraryContent a library object to be validated
 * @returns {object[]} Array of AJV error objects, empty array if valid library
 */
const getLibraryErrors = (libraryContent) =>
  getValidationErrors(libraryContent, libraryValidationSchema)

export { getAssetErrors, getLibraryErrors }
