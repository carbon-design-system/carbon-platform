/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface ParagraphProps {
  children: ReactNode
  className?: string | null
  large?: boolean | null
}

const P: MdxComponent<ParagraphProps> = ({ children, className, large, ...rest }) => {
  const classNames = clsx(withPrefix('paragraph'), {
    [withPrefix('paragraph--large')]: large
  })

  return (
    <Grid className={clsx(className, withPrefix('paragraph-container'))} {...rest}>
      <Column sm={4} md={8} lg={8}>
        <p className={classNames}>{children}</p>
      </Column>
    </Grid>
  )
}

P.propTypes = {
  /**
   * `Paragraph text.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name on the wrapper grid.
   */
  className: PropTypes.string,
  /**
   * Display large font size.
   */
  large: PropTypes.bool
}

export { ParagraphProps }
export default P
