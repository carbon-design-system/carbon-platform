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

/**
 * The `<Aside>` component is a wrapper component that adds styling to make the text display
 *  smaller than the default body text with a one column offset. It is designed to be used on
 * the side of the page within grid components. Add an aria-label for a11y.
 */
const Aside = ({ children, className, hideRule, ...rest }) => {
  const asideClasses = clsx(styles.aside, className, {
    [styles['aside--no-rule']]: !!hideRule
  })

  return (
    <Grid>
      <Column sm={4} md={{ span: 2, offset: 1 }} lg={{ span: 4, offset: 1 }}>
        <aside className={asideClasses} {...rest}>
          {children}
        </aside>
      </Column>
    </Grid>
  )
}

export default Aside

Aside.propTypes = {
  /**
   * Child of the Aside.
   */
  children: PropTypes.node,

  /**
   * Optional class name.
   */
  className: PropTypes.string,

  /**
   * Hide the rule above the text.
   */
  hideRule: PropTypes.bool
}
