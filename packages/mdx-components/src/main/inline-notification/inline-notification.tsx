/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import { CheckmarkFilled, ErrorFilled, InformationFilled, WarningFilled } from '@carbon/react/icons'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

const iconTypes = {
  error: ErrorFilled,
  success: CheckmarkFilled,
  warning: WarningFilled,
  info: InformationFilled
}

type Kind = 'error' | 'info' | 'success' | 'warning'

interface InlineNotificationProps {
  children?: ReactNode
  kind: Kind
}
/**
 * The `<InlineNotification>` component is used to communicate important information to a user.
 */
const InlineNotification: MdxComponent<InlineNotificationProps> = ({ children, kind = 'info' }) => {
  const containerClassName = clsx({
    'cds--inline-notification': true,
    'cds--inline-notification--low-contrast': true,
    [`cds--inline-notification--${kind}`]: kind,
    'cds--inline-notification--hide-close-button': true
  })
  const IconForKind = iconTypes[kind]

  return (
    <Grid>
      <Column sm={4} md={8} lg={8} className={clsx(withPrefix('notification'))}>
        <div className={containerClassName}>
          <div className="cds--inline-notification__details">
            <IconForKind className="cds--inline-notification__icon" size={20}>
              <title>{`${kind} icon`}</title>
            </IconForKind>
            <div className="cds--inline-notification__text-wrapper">
              <div className={withPrefix('content')}>{children}</div>
            </div>
          </div>
        </div>
      </Column>
    </Grid>
  )
}

InlineNotification.propTypes = {
  /**
   * Provide the contents of the InlineNotification
   */
  children: PropTypes.node,
  /**
   * Notification kind
   */
  kind: PropTypes.oneOf<Kind>(['error', 'info', 'success', 'warning']).isRequired
}

export { InlineNotificationProps }
export default InlineNotification
