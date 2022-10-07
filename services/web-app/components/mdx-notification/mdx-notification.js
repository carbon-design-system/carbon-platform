/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ActionableNotification, Button, Column, Grid, Link } from '@carbon/react'
import { ChevronDown, ChevronUp } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useState } from 'react'

import styles from './mdx-notification.module.scss'

export const MdxNotification = ({
  content,
  title,
  description,
  href,
  link,
  id,
  kind = 'error',
  collapsible = false
}) => {
  const wrapperClassName = clsx({
    'cds--inline-notification': true
  })

  const [collapsed, setIsCollapsed] = useState(false)

  return (
    <Grid narrow className={styles['error-container']}>
      <Column sm={4} md={6} lg={16}>
        <ActionableNotification
          href={href}
          className={clsx(wrapperClassName)}
          id={id}
          inline
          lowContrast
          hideCloseButton
          kind={kind}
        >
          {collapsible && (
            <Button
              className={styles['collapse-icon']}
              kind="ghost"
              size="lg"
              onClick={() => {
                setIsCollapsed(!collapsed)
              }}
              hasIconOnly
              renderIcon={collapsed ? ChevronUp : ChevronDown}
              iconDescription={collapsed ? 'Expand' : 'Collapse'}
              tooltipAlignment="center"
              tooltipPosition="bottom"
            />
          )}
          <Grid className={styles.grid}>
            <Column sm={4} md={6} lg={12}>
              <span className={styles.container}>
                <strong className={styles.title}>{title}</strong>
              </span>
              <p className={styles.description}>{description}</p>
              {!collapsed && <p className={styles.content}>{content}</p>}
            </Column>
            <Column sm={4} md={6} lg={4}>
              <Link className={styles.link} href={href}>
                {link}
              </Link>
            </Column>
          </Grid>
        </ActionableNotification>
      </Column>
    </Grid>
  )
}

MdxNotification.propTypes = {
  /**
   * Whether the notification's content is collapsible
   */
  collapsible: PropTypes.bool,
  /**
   * Provide error details
   */
  content: PropTypes.node,
  /**
   * Provide a description for the MdxNotification
   */
  description: PropTypes.string,
  /**
   * Provide optional href for the MdxNotification
   */
  href: PropTypes.string,
  /**
   * Id
   */
  id: PropTypes.string,
  /**
   * Notification kind: info | error
   */
  kind: PropTypes.string,
  /**
   * Provide optional link label for the MdxNotification
   */
  link: PropTypes.string,
  /**
   * Provide a title for the MdxNotification
   */
  title: PropTypes.string
}

export default MdxNotification
