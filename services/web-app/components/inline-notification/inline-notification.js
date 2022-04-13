/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import { CheckmarkFilled, ErrorFilled, InformationFilled, WarningFilled } from '@carbon/react/icons'
import cx from 'classnames'
import PropTypes from 'prop-types'

import styles from './inline-notification.module.scss'

const iconTypes = {
  error: ErrorFilled,
  success: CheckmarkFilled,
  warning: WarningFilled,
  info: InformationFilled
}

const InlineNotification = ({ children, className, kind = 'info' }) => {
  const containerClassName = cx(className, {
    'cds--inline-notification': true,
    'cds--inline-notification--low-contrast': true,
    [`cds--inline-notification--${kind}`]: kind,
    'cds--inline-notification--hide-close-button': true
  })
  const IconForKind = iconTypes[kind]
  if (!IconForKind) {
    return null
  }

  return (
    <Grid>
      <Column sm={4} md={6} lg={8} className={cx(styles.notification, className)}>
        <div className={containerClassName}>
          <div className="cds--inline-notification__details">
            {IconForKind
              ? (
              <IconForKind className="cds--inline-notification__icon" size={20}>
                <title>{`${kind} icon`}</title>
              </IconForKind>
                )
              : null}
            <div className="cds--inline-notification__text-wrapper">
              <div className={styles.content}>{children}</div>
            </div>
          </div>
        </div>
      </Column>
    </Grid>
  )
}

InlineNotification.propTypes = {
  kind: PropTypes.oneOf(['error', 'info', 'success', 'warning'])
}

export default InlineNotification
