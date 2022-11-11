/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { H4 } from '../index.js'
import { MdxComponent } from '../interfaces.js'

interface TitleProps {
  children: ReactNode
  className?: string | null
}

/**
 * The `<Title>` component is used to provide a title to a subsequent component
 * (table, image, video, code block). The Title should be used in favor of other
 * techniques for bolded text (h4s) to preserve page structure and heading hierarchy.
 */
const Title: MdxComponent<TitleProps> = ({ children, className }) => (
  <H4 autolink={false} className={className}>
    {children}
  </H4>
)

Title.propTypes = {
  /**
   * Provide the contents of Title
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name on the title.
   */
  className: PropTypes.string
}

export { TitleProps }
export default Title
