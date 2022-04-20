/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './aside.module.scss'

const Aside = ({ children, className, hideRule, ...rest }) => {
  const captionClasses = clsx(styles.aside, className, {
    [styles.asideNoRule]: !!hideRule
  })

  return (
    <Grid>
      <Column md={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 1 }}>
        <aside className={captionClasses} {...rest}>
          {children}
        </aside>
      </Column>
    </Grid>
  )
}

export default Aside

Aside.propTypes = {
  children: PropTypes.node,

  /**
   * Specify a custom class
   */
  className: PropTypes.string,

  /**
   * Hide the hanging rule
   */
  hideRule: PropTypes.bool
}
