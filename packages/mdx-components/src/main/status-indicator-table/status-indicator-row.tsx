/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { StructuredListCell, StructuredListRow } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent, NonScalarNode } from '../interfaces.js'

type Attention = 'high' | 'medium' | 'low' | 'glyph'

interface StatusIconProps {
  attention: Attention
  theme?: string | null
  fileName: string | null
  isGlyph?: boolean | null
  key?: string | null
}

export const StatusIcon: MdxComponent<StatusIconProps> = ({
  attention,
  theme,
  fileName,
  isGlyph
}) => {
  const path = `/status-icons/${attention}/${theme}/${fileName}.svg`
  const size = isGlyph ? '16' : '20'
  return (
    <object
      height={size}
      width={size}
      className={clsx('icon', isGlyph && 'glyph')}
      aria-label={`${fileName} status icon`}
      type="image/svg+xml"
      data={path}
    />
  )
}

StatusIcon.propTypes = {
  attention: PropTypes.oneOf<Attention>(['high', 'medium', 'low', 'glyph']).isRequired,
  fileName: PropTypes.string.isRequired,
  isGlyph: PropTypes.bool,
  key: PropTypes.string,
  theme: PropTypes.string
}

export const StatusIconWrapper = ({ children }: { children: ReactNode }) => (
  <div className={'icon-wrapper'}>{children}</div>
)

StatusIconWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
}

interface StatusIconGroupProps {
  theme?: string | null
  children: NonScalarNode
  attention: Attention
}

export const StatusIconGroup: MdxComponent<StatusIconGroupProps> = ({
  theme = 'light',
  children,
  attention
}) => {
  const className = clsx('icon-group', {
    'is-dark': theme === 'dark'
  })
  return (
    <div className={className}>
      {React.Children.map(children, (child) => React.cloneElement(child, { theme, attention }))}
    </div>
  )
}

StatusIconGroup.propTypes = {
  attention: PropTypes.oneOf<Attention>(['high', 'medium', 'low', 'glyph']).isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  theme: PropTypes.string
}

interface StatusIndicatorRowProps {
  attention: Attention
  fileNames: string[]
  name: string
  token: string
  description: string
  usage?: string | null
}

const StatusIndicatorRow: MdxComponent<StatusIndicatorRowProps> = ({
  attention,
  fileNames,
  name,
  token,
  description,
  usage
}) => {
  const isGlyph = attention === 'glyph'
  return (
    <StructuredListRow className={'status-indicator-row'}>
      <StructuredListCell className={'cell'}>
        <StatusIconWrapper>
          <StatusIconGroup attention={attention}>
            {fileNames.map((fileName) => (
              <StatusIcon
                isGlyph={isGlyph}
                key={`${fileName}`}
                fileName={fileName}
                attention={attention}
              />
            ))}
          </StatusIconGroup>
          <StatusIconGroup attention={attention} theme="dark">
            {fileNames.map((fileName) => (
              <StatusIcon
                isGlyph={isGlyph}
                key={`${fileName}-dark`}
                fileName={fileName}
                attention={attention}
              />
            ))}
          </StatusIconGroup>
        </StatusIconWrapper>
      </StructuredListCell>
      <StructuredListCell className={'cell'}>{name}</StructuredListCell>
      <StructuredListCell className={'cell'}>{token}</StructuredListCell>
      <StructuredListCell className={clsx('cell', 'description-cell')}>
        {description}
        <br />
        {usage ? <em>Used for: {usage}</em> : null}
      </StructuredListCell>
    </StructuredListRow>
  )
}

StatusIndicatorRow.propTypes = {
  attention: PropTypes.oneOf<Attention>(['high', 'medium', 'low', 'glyph']).isRequired,
  description: PropTypes.string.isRequired,
  fileNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  usage: PropTypes.string
}

export default StatusIndicatorRow
