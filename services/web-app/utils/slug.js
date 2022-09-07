/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import slugify from 'slugify'

/**
 * Generates a slug from an asset metadata object. This first attempts to use an `id` if it
 * exists and if not, it slugifies the asset's `name`.
 * @param {import('@/typedefs').AssetContent} content
 * @returns {string} A slug
 */
export const getSlug = (content = {}) => {
  const slug = content.id || content.name || ''

  return slugify(slug, {
    lower: true
  })
}
