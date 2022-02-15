/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { status as statusMap } from '@/data/status'

import styles from './status-icon.module.scss'

const StatusIcon = ({ className, status }) => {
  const { icon: Icon, name } = statusMap[status]

  if (!Icon) return null

  const stylesIcon = clsx(styles.icon, className, {
    [styles.iconDraft]: status === 'draft',
    [styles.iconExperimental]: status === 'experimental',
    [styles.iconStable]: status === 'stable',
    [styles.iconDeprecated]: status === 'deprecated'
  })

  return (
    <span className={stylesIcon} title={name}>
      <Icon size={16} />
    </span>
  )
}

StatusIcon.propTypes = {
  className: PropTypes.string,
  status: PropTypes.oneOf(Object.keys(statusMap)).isRequired
}

export default StatusIcon
