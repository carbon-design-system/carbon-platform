/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import cx from 'classnames'

import styles from './markdown.module.scss'

const Blockquote = ({ className, ...rest }) => (
  <blockquote className={cx(className, styles.blockquote)} {...rest} />
)

export default Blockquote
