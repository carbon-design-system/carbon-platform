/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'

import { status as statusMap } from '@/data/status'

import styles from './status-icon.module.scss'

const StatusIcon = ({ className, status }) => {
  const { icon: Icon } = statusMap[status]

  if (!Icon) return null

  const stylesIcon = clsx(styles.icon, className, {
    [styles.iconDraft]: status === 'draft',
    [styles.iconExperimental]: status === 'experimental',
    [styles.iconStable]: status === 'stable',
    [styles.iconDeprecated]: status === 'deprecated'
  })

  return <Icon className={stylesIcon} size={16} />
}

export default StatusIcon
