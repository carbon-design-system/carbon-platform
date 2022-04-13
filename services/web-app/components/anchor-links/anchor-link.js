/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import slugify from 'slugify'

import styles from './anchor-links.module.scss'

const AnchorLink = ({ to, children, className }) => {
  const href = to || `#${slugify(children, { lower: true })}`
  return (
    <a className={clsx(styles.link, className)} href={href}>
      {children}
    </a>
  )
}

export default AnchorLink
