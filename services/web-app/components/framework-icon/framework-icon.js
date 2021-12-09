/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from 'clsx'

import { framework as frameworkMap } from '@/data/framework'

import styles from './framework-icon.module.scss'

const FrameworkIcon = ({ className, framework }) => {
  const item = frameworkMap[framework]

  if (!item) return null

  const { icon: Icon, name } = item

  if (!Icon) return null

  return (
    <div className={clsx(styles.container, className)} title={name}>
      <Icon className={styles.icon} />
    </div>
  )
}

export default FrameworkIcon
