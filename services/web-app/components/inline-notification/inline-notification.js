/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import {
  CheckmarkFilled,
  Close,
  ErrorFilled,
  InformationFilled,
  WarningFilled
} from '@carbon/react/icons'
import clsx from 'classnames'
import PropTypes from 'prop-types'
import { useState } from 'react'

import styles from './inline-notification.module.scss'

const iconTypes = {
  error: ErrorFilled,
  success: CheckmarkFilled,
  warning: WarningFilled,
  info: InformationFilled
}

/**
 * The `<InlineNotification>` component is used to communicate important information to a user.
 */
const InlineNotification = ({ children, className, kind = 'info', hideCloseButton }) => {
  const [showNotification, setShowNotification] = useState(true)
  const containerClassName = clsx(className, {
    'cds--inline-notification': true,
    'cds--inline-notification--low-contrast': true,
    [`cds--inline-notification--${kind}`]: kind
  })
  const IconForKind = iconTypes[kind]

  const closeNotifcation = () => {
    console.log('hey hey')
    setShowNotification(!showNotification)
  }

  return (
    showNotification && (
      <Grid>
        <Column sm={4} md={6} lg={8} className={clsx(styles.notification, className)}>
          <div className={containerClassName}>
            <div className="cds--inline-notification__details">
              <IconForKind className="cds--inline-notification__icon" size={20}>
                <title>{`${kind} icon`}</title>
              </IconForKind>
              <div className="cds--inline-notification__text-wrapper">
                <div className={styles.content}>{children}</div>
                {!hideCloseButton && (
                  <button
                    className="cds--inline-notification__close-button"
                    type="button"
                    onClick={closeNotifcation}
                  >
                    <Close size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </Column>
      </Grid>
    )
  )
}

InlineNotification.propTypes = {
  /**
   * Provide the contents of the InlineNotification
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
  /**
   * Option to hide or hide close button
   */
  hideCloseButton: PropTypes.bool,
  /**
   * Notification kind
   */
  kind: PropTypes.oneOf(['error', 'info', 'success', 'warning'])
}

export default InlineNotification
