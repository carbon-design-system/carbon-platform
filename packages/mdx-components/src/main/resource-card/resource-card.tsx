/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Theme } from '@carbon/react'
import { ArrowRight, Calendar, Download, Email, Error, Launch } from '@carbon/react/icons/index.js'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { mediaQueries, useMatchMedia, withPrefix } from '../utils.js'

type Color = 'light' | 'dark'
type ActionIcon = 'launch' | 'arrowRight' | 'download' | 'email' | 'calendar'
type AspectRatio = '2:1' | '1:1' | '16:9' | '4:3'

interface ResourceCardProps {
  children: ReactNode
  href?: string | null
  subTitle?: string | null
  title?: string | null
  color?: Color | null
  disabled?: boolean | null
  actionIcon?: ActionIcon | null
  aspectRatio?: AspectRatio | null
}

/**
 * The `<ResourceCard>` component should be wrapped within the `<CardGroup>` component,
 * this grid wrapper component will add correct spacing and borders between cards.
 *
 *```
 * <CardGroup>
 * <Column lg={4}>
 * <ResourceCard props>
 *
 * ![](img.png)
 *
 * </ResourceCard>
 * </Column>
 * </CardGroup>
 * ```
 */
const ResourceCard: MdxComponent<ResourceCardProps> = (props) => {
  const {
    children,
    href,
    subTitle,
    title,
    color,
    disabled,
    aspectRatio: aspectRatioProp,
    actionIcon
  } = props

  const isLg = useMatchMedia(mediaQueries.lg)
  const isXlg = useMatchMedia(mediaQueries.xlg)

  const ResourceCardClassNames = clsx(withPrefix('resource-card'), {
    [withPrefix('disabled')]: disabled
  })

  // if aspectRatio is not specified and it's a card with title displaying at Lg breakpoint,
  // default aspectRatio to 16:9, all other cases default to 2:1
  const aspectRatio = aspectRatioProp || (!!title && isLg && !isXlg ? '16:9' : '2:1')

  const carbonTileclassNames = clsx(['cds--tile'], {
    'cds--tile--clickable': href !== undefined,
    [withPrefix('card-with-title')]: !!title
  })

  const cardContent = (
    <>
      {subTitle && <h5 className={withPrefix('subtitle')}>{subTitle}</h5>}
      {title && <h4 className={withPrefix('title')}>{title}</h4>}
      <div className={withPrefix('icon-img')}>{children}</div>
      <div className={withPrefix('icon-action')}>
        {!disabled &&
          actionIcon &&
          {
            launch: <Launch size={20} aria-label="Open resource" />,
            arrowRight: <ArrowRight size={20} aria-label="Open resource" />,
            download: <Download size={20} aria-label="Download" />,
            email: <Email size={20} aria-label="Email" />,
            calendar: <Calendar size={20} aria-label="Calendar" />,
            disabled: <Error size={20} aria-label="disabled" />
          }[actionIcon]}
        {disabled === true && <Error size={20} aria-label="disabled" />}
      </div>
    </>
  )

  let cardContainer
  if (disabled === true || href === undefined) {
    cardContainer = <div className={carbonTileclassNames}>{cardContent}</div>
  } else {
    cardContainer = (
      <a href={href!} className={carbonTileclassNames}>
        {cardContent}
      </a>
    )
  }

  return (
    <Theme theme={color === 'dark' ? 'g100' : 'g10'}>
      <div className={ResourceCardClassNames}>
        <AspectRatio ratio={`${aspectRatio.replace(':', 'x')}`}>
          <div className="cds--aspect-ratio--object">{cardContainer}</div>
        </AspectRatio>
      </div>
    </Theme>
  )
}

ResourceCard.propTypes = {
  /**
   * Action icon
   */
  actionIcon: PropTypes.oneOf<ActionIcon>(['launch', 'arrowRight', 'download', 'email', 'calendar'])
    .isRequired,
  /**
   * Set card aspect ratio
   */
  aspectRatio: PropTypes.oneOf<AspectRatio>(['2:1', '1:1', '16:9', '4:3']),
  /**
   * Add an image to display in lower left
   */
  children: PropTypes.node,
  /**
   * set to "dark" for dark background card
   */
  color: PropTypes.oneOf<Color>(['light', 'dark']),

  /**
   * Use for disabled card
   */
  disabled: PropTypes.bool,
  /**
   * Set url for card
   */
  href: PropTypes.string,
  /**
   * Smaller heading
   */
  subTitle: PropTypes.string,
  /**
   * Large heading
   */
  title: PropTypes.string
}

ResourceCard.defaultProps = {
  color: 'light',
  disabled: false,
  actionIcon: 'launch'
}

export { ResourceCardProps }
export default ResourceCard
