/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sanitizes a string mdx source previous to MDAST tree parsing by:
 * - Removing HTML comments
 *
 * @param source The stringified mdx source.
 * @returns Resulting mdx source string after cleanup
 */
const sanitizeStringMdxSource = (source: string) => {
  return source.replace(/<!--(.|\n)*?-->/g, '')
}

export { sanitizeStringMdxSource }
