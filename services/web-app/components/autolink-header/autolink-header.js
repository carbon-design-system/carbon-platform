/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '@carbon/react/icons'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import slugify from 'slugify'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './autolink-header.module.scss'

const Anchor = ({ id, ariaLabel, position }) => {
  const anchorClasses = clsx(styles.anchor, {
    [styles['left-anchor']]: position === 'left',
    [styles['right-anchor']]: position === 'right'
  })

  return (
    <a className={anchorClasses} href={`#${id}`} aria-label={`${ariaLabel} permalink`}>
      <Link size={20} />
    </a>
  )
}

const AutolinkHeader = ({ is: Component, className, children, ...props }) => {
  const isSm = useMatchMedia(mediaQueries.sm)

  const ariaLabel = React.Children.toArray(children).join('')

  const id = `${slugify(ariaLabel, { lower: true })}`

  const anchorPosition = () => (isSm ? 'left' : 'right')

  return (
    <Component className={clsx(styles.header, className)} {...props} id={id}>
      {children}
      <Anchor id={id} ariaLabel={ariaLabel} position={anchorPosition()} />
    </Component>
  )
}

AutolinkHeader.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.node.isRequired,
  /**
   * Specify optional className
   */
  className: PropTypes.string,
  /**
   * is: element to render as
   */
  is: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired
}

AutolinkHeader.defaultProps = { is: 'h2' }

export default AutolinkHeader
