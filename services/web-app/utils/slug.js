/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import slugify from 'slugify'

/**
 * Generates a slug from a resource metadata object. For now, defaults to using an id if that
 * exists. If not, uses name.
 */
export const getSlug = (data = {}) => {
  const slug = data.id || data.name

  return slugify(slug, {
    lower: true
  })
}
