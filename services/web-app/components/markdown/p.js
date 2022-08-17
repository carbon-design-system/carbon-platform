/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './markdown.module.scss'

const P = ({ children, className, large, ...rest }) => {
  const classNames = clsx(styles.paragraph, {
    [styles['paragraph--large']]: large
  })

  return (
    <Grid className={clsx(className, styles['paragraph-container'])} {...rest}>
      <Column sm={4} md={6} lg={8}>
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

export default P
