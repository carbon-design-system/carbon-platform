/*
 * Copyright IBM Corp. 2022, 2022
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

interface AsideProps {
  children: ReactNode
  hideRule?: boolean | null
}

/**
 * The `<Aside>` component is a wrapper component that adds styling to make the text display
 *  smaller than the default body text with a one column offset. It is designed to be used on
 * the side of the page within grid components. Add an aria-label for a11y.
 */
const Aside: MdxComponent<AsideProps> = ({ children, hideRule, ...rest }) => {
  const asideClasses = clsx(withPrefix('aside'), {
    [withPrefix('aside--no-rule')]: !!hideRule
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

Aside.propTypes = {
  /**
   * Child of the Aside.
   */
  children: PropTypes.node,
  /**
   * Hide the rule above the text.
   */
  hideRule: PropTypes.bool
}

export { AsideProps }
export default Aside
