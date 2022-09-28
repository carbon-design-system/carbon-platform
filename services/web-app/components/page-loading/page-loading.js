/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, SkeletonText } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './page-loading.module.scss'

const PageLoading = ({ className }) => (
  <Grid className={className}>
    <Column sm={4} md={8} lg={8}>
      <div className={styles['skeleton-text']}>
        <SkeletonText heading paragraph />
      </div>
    </Column>
  </Grid>
)

PageLoading.propTypes = {
  /**
   * Optional class name.
   */
  className: PropTypes.string
}

export default PageLoading
