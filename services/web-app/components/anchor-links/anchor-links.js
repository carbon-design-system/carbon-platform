/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './anchor-links.module.scss'

export default class AnchorLinks extends React.Component {
  render() {
    const { children, small, className } = this.props
    const isColumn = React.Children.count(children) > 6
    const classNames = clsx(className, {
      [styles.listSmall]: small,
      [styles.multipleColumns]: isColumn
    })

    return (
      <Grid className={styles.list}>
        <Column sm={4} md={8} lg={8}>
          <ul className={classNames}>
            {React.Children.map(children, (link, i) => (
              <li key={i}>{link}</li>
            ))}
          </ul>
        </Column>
      </Grid>
    )
  }
}

AnchorLinks.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool
}
