/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface BlockquoteProps {
  className?: string | null
  [otherProp: string]: unknown
}

const Blockquote: MdxComponent<BlockquoteProps> = ({ className, ...rest }) => (
  <blockquote className={clsx(className, withPrefix('blockquote'))} {...rest} />
)

Blockquote.propTypes = {
  /**
   * Specify optional className for container element
   */
  className: PropTypes.string
}

export { BlockquoteProps }
export default Blockquote
