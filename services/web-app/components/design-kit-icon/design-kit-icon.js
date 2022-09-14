/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import PropTypes from 'prop-types'

import { designTools } from '@/data/design-tools'

import styles from './design-kit-icon.module.scss'

/**
 * Renders design tool icon.
 */
const DesignKitIcon = ({ className, designTool }) => {
  const item = designTools[designTool]

  if (!item) return null

  const { icon: Icon, name } = item

  if (!Icon && !name) return null

  return (
    <div className={clsx(styles.container, className)} title={name}>
      {Icon ? <Icon className={styles.icon} /> : <span className={styles.text}>{name}</span>}
    </div>
  )
}

DesignKitIcon.propTypes = {
  /**
   * Optional container class name.
   */
  className: PropTypes.string,
  /**
   * Design kits key from the schema. See:
   * https://bit.ly/3QzN7dr
   */
  designTool: PropTypes.oneOf(Object.keys(designTools))
}

export default DesignKitIcon
