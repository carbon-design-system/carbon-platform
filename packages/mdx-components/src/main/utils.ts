/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const prefix = 'carbon-platform-mdx-components'

/**
 * Adds a prefix specific to the carbon platform mdx components to the provided string. This is
 * often used in conjunction with the scss utility `with-prefix` to assign unique class names to
 * styles for components.
 *
 * @param className The string to which to add a prefix.
 * @returns A prefixed string.
 */
function withPrefix(className: string) {
  return prefix + '--' + className
}

export { withPrefix }
