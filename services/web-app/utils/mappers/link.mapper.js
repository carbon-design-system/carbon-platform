import { Link } from '@carbon-platform/mdx-components'

/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const LinkMapper = ({ children, href, inline, disabled, visited, size }) => (
  <Link href={href} inline={inline} disabled={disabled} visited={visited} size={size}>
    {children}
  </Link>
)
