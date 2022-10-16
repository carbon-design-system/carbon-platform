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
import slugifyCjs from 'slugify'

import { MdxComponent } from '../interfaces.js'
import { mediaQueries, useMatchMedia, withPrefix } from '../utils.js'

const slugify = slugifyCjs.default

interface AutolinkHeaderProps {
  is: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string | null
  children: string | string[]
  [otherProp: string]: unknown
}

const Anchor = ({
  id,
  string,
  position
}: {
  id: string
  string: string
  position: 'left' | 'right'
}) => {
  const anchorClasses = clsx(withPrefix('anchor'), {
    [withPrefix('left-anchor')]: position === 'left',
    [withPrefix('right-anchor')]: position === 'right'
  })

  return (
    <a className={anchorClasses} href={`#${id}`} aria-label={`${string} permalink`}>
      <Link size={20} />
    </a>
  )
}

const AutolinkHeader: MdxComponent<AutolinkHeaderProps> = ({
  is: Component,
  className,
  children,
  ...props
}) => {
  const isSm = useMatchMedia(mediaQueries.sm)

  const string = typeof children === 'string' ? children : children.join('')

  const id = `${slugify(string, { lower: true })}`

  const anchorPosition = () => (isSm ? 'left' : 'right')

  return (
    <Component className={clsx(withPrefix('header'), className)} {...props} id={id}>
      {children}
      <Anchor id={id} string={string} position={anchorPosition()} />
    </Component>
  )
}

AutolinkHeader.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  /**
   * Specify optional className
   */
  className: PropTypes.string,
  /**
   * is: element to render as
   */
  is: PropTypes.oneOf<AutolinkHeaderProps['is']>(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired
}

AutolinkHeader.defaultProps = { is: 'h2' }

export { AutolinkHeaderProps }
export default AutolinkHeader
