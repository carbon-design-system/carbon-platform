/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'
import PropTypes from 'prop-types'

import { framework as frameworkMap } from '@/data/framework'

import styles from './framework-icon.module.scss'

const FrameworkIcon = ({ className, framework, otherCount = 0 }) => {
  const item = frameworkMap[framework]

  if (!item) return null

  const { icon: Icon, name } = item

  if (!Icon && !name) return null

  const title = otherCount > 0 ? `${name} and ${otherCount} others` : name

  return (
    <div className={clsx(styles.container, className)} title={title}>
      {Icon ? <Icon className={styles.icon} /> : <span className={styles.text}>{name}</span>}
      {otherCount > 0 && <span className={styles.text}>+{otherCount}</span>}
    </div>
  )
}

FrameworkIcon.propTypes = {
  className: PropTypes.string,
  otherCount: PropTypes.number,
  status: PropTypes.oneOf(Object.keys(frameworkMap))
}

export default FrameworkIcon
