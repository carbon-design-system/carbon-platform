/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link } from '@carbon/react/icons'
import cx from 'classnames'
// eslint-disable-next-line no-use-before-define
import React from 'react'
import slugify from 'slugify'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './autolink-header.module.scss'

const Anchor = ({ id, string, position }) => {
  const anchorClasses = cx(styles.anchor, {
    [styles.leftAnchor]: position === 'left',
    [styles.rightAnchor]: position === 'right'
  })

  return (
    <a className={anchorClasses} href={`#${id}`} aria-label={`${string} permalink`}>
      <Link size={20} />
    </a>
  )
}

const AutolinkHeader = ({ is: Component, className, ...props }) => {
  const isSm = useMatchMedia(mediaQueries.sm)

  const string = React.Children.map(
    props.children,
    (child) => (child.props ? child.props.children : child) // handle bold/italic words
  ).join('')

  const id = `${slugify(string, { lower: true })}`

  const anchorPosition = () => (isSm ? 'left' : 'right')

  return (
    <Component className={cx(styles.header, className)} {...props} id={id}>
      {props.children}
      <Anchor id={id} string={string} position={anchorPosition()} />
    </Component>
  )
}

AutolinkHeader.defaultProps = { is: 'h2' }

export default AutolinkHeader
