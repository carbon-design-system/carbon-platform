/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AnchorLink } from '@carbon-platform/mdx-components'

/** @type {import('@carbon-platform/rmdx').NodeMapper} */
export const AnchorLinkMapper = ({ children }) => (
  <AnchorLink>{children?.props?.astNode?.value}</AnchorLink>
)
