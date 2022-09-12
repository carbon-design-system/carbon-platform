/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React from 'react'
import slugifyCjs from 'slugify'

import { withPrefix } from '../utils.js'

const slugify = slugifyCjs.default

interface AnchorLinkProps {
  to?: string
  children: string
}

const AnchorLink = ({ to, children }: AnchorLinkProps) => {
  const href = to || `#${slugify(children, { lower: true })}`

  return (
    <a className={withPrefix('link')} href={href} data-anchor-link>
      {children}
    </a>
  )
}

AnchorLink.propTypes = {
  /**
   * Provide the contents of your `AnchorLink`.
   */
  children: PropTypes.string.isRequired,
  /**
   * By default, the `AnchorLink` slugifys the children you pass in. Use the to prop to override
   * this target.
   */
  to: PropTypes.string
}

export default AnchorLink
