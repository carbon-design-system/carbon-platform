/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StructuredListCell, StructuredListRow } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './status-indicator.module.scss'

export const StatusIcon = ({ attention, theme, fileName, isGlyph }) => {
  const path = `/status-icons/${attention}/${theme}/${fileName}.svg`
  const size = isGlyph ? '16' : '20'
  return (
    <object
      height={size}
      width={size}
      className={clsx(styles.icon, isGlyph && styles.glyph)}
      aria-label={`${fileName} status icon`}
      type="image/svg+xml"
      data={path}
    />
  )
}

StatusIcon.propTypes = {
  attention: PropTypes.string,
  fileName: PropTypes.string,
  isGlyph: PropTypes.bool,
  theme: PropTypes.string
}

export const StatusIconWrapper = ({ children }) => (
  <div className={styles.iconWrapper}>{children}</div>
)

StatusIconWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
}

export const StatusIconGroup = ({ theme = 'light', children, attention }) => {
  const className = clsx(styles.iconGroup, {
    [styles.isDark]: theme === 'dark'
  })
  return (
    <div className={className}>
      {React.Children.map(children, (child) => React.cloneElement(child, { theme, attention }))}
    </div>
  )
}

StatusIconGroup.propTypes = {
  attention: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  theme: PropTypes.string
}

const StatusIndicatorRow = ({ attention, fileNames, name, token, description, usage }) => {
  const isGlyph = attention === 'glyph'
  return (
    <StructuredListRow className={styles.statusIndicatorRow}>
      <StructuredListCell className={styles.cell}>
        <StatusIconWrapper>
          <StatusIconGroup attention={attention}>
            {fileNames.map((fileName) => (
              <StatusIcon isGlyph={isGlyph} key={`${fileName}`} fileName={fileName} />
            ))}
          </StatusIconGroup>
          <StatusIconGroup attention={attention} theme="dark">
            {fileNames.map((fileName) => (
              <StatusIcon isGlyph={isGlyph} key={`${fileName}-dark`} fileName={fileName} />
            ))}
          </StatusIconGroup>
        </StatusIconWrapper>
      </StructuredListCell>
      <StructuredListCell className={styles.cell}>{name}</StructuredListCell>
      <StructuredListCell className={styles.cell}>{token}</StructuredListCell>
      <StructuredListCell className={clsx(styles.cell, styles.descriptionCell)}>
        {description}
        <br />
        {usage ? <em>Used for: {usage}</em> : null}
      </StructuredListCell>
    </StructuredListRow>
  )
}

StatusIndicatorRow.propTypes = {
  attention: PropTypes.string,
  description: PropTypes.string,
  fileNames: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  token: PropTypes.string,
  usage: PropTypes.string
}

export default StatusIndicatorRow
