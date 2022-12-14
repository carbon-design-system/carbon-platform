/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '@carbon-platform/mdx-components'

/** @type {import('@carbon-platform/rmdx').Renderer} */
export const LinkRenderer = ({ children, href }) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  )
}
