/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import * as styles from './card-group.module.scss'

const CardGroup = ({ children, className, ...rest }) => {
  const isSm = useMatchMedia(mediaQueries.sm)
  return (
    <Grid className={clsx(className, styles['card-group'])} condensed={isSm} {...rest}>
      <Column lg={8} md={8} sm={4}>
        <Grid condensed>{children}</Grid>
      </Column>
    </Grid>
  )
}

CardGroup.propTypes = {
  /**
   * Provide the contents of your `Card`.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional container class name.
   */
  className: PropTypes.string
}
export default CardGroup
