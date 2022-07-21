/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import PropTypes from 'prop-types'

import * as styles from './divider.module.scss'

/**
 * The `<Divider>` component is a wrapper that adds a top border
 * and spacing to divide sections of content.
 */
const Divider = ({ children, className }) => {
  return <div className={clsx(className, styles.divider)}>{children}</div>
}

Divider.propTypes = {
  /**
   * Pass in the children that will be rendered within the divider
   */
  children: PropTypes.node,
  /**
   * Optional class name on the divider.
   */
  className: PropTypes.string
}

export default Divider