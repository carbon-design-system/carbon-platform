/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Theme } from '@carbon/react'
import { CheckmarkFilled, Misuse } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './do-dont.module.scss'

export default class DoDont extends React.Component {
  renderCaption = (caption, captionTitle) => {
    if (caption || captionTitle) {
      return (
        <div className={styles.caption}>
          {captionTitle && <p className={styles.title}>{captionTitle}</p>}
          {caption && <p className={styles.description}>{caption}</p>}
        </div>
      )
    }
  }

  render() {
    const {
      children,
      caption,
      captionTitle,
      text,
      aspectRatio,
      color,
      type,
      className,
      colLg,
      colMd
    } = this.props

    const iconClassNames = clsx(styles.icon, {
      [styles['icon-correct']]: type === 'do',
      [styles['icon-incorrect']]: type === 'dont'
    })

    const wrapperClassNames = clsx(className, styles.example, {
      [styles.correct]: type === 'do',
      [styles.incorrect]: type === 'dont',
      [styles.ratio]:
        aspectRatio === '1:1' ||
        aspectRatio === '2:1' ||
        aspectRatio === '1:2' ||
        aspectRatio === '4:3' ||
        aspectRatio === '3:4' ||
        aspectRatio === '9:16' ||
        aspectRatio === '16:9',
      [styles.ratio1x1]: aspectRatio === '1:1',
      [styles.ratio2x1]: aspectRatio === '2:1',
      [styles.ratio1x2]: aspectRatio === '1:2',
      [styles.ratio4x3]: aspectRatio === '4:3',
      [styles.ratio3x4]: aspectRatio === '3:4',
      [styles.ratio9x16]: aspectRatio === '9:16',
      [styles.ratio16x9]: aspectRatio === '16:9'
    })

    let colLarge = 4
    if (colLg) colLarge = Number(colLg)

    let colMedium = 4
    if (colMd) colMedium = Number(colMd)

    return (
      <Column sm={4} md={colMedium} lg={colLarge}>
        <Theme theme={color === 'dark' && 'g100'}>
          <div className={wrapperClassNames}>
            <div className={styles.card}>
              <div className={styles['card-content']}>
                {type === 'do' && <CheckmarkFilled size={24} className={iconClassNames} />}
                {type !== 'do' && <Misuse size={24} className={iconClassNames} />}
                <div className={styles.content}>
                  {children}
                  {text ? <p className={styles.text}>{text}</p> : null}
                </div>
              </div>
            </div>
            {this.renderCaption(caption, captionTitle)}
          </div>
        </Theme>
      </Column>
    )
  }
}

DoDont.defaultProps = {
  type: 'do'
}

DoDont.propTypes = {
  /** 1:1 to force square example */
  aspectRatio: PropTypes.string,
  /** title for the caption (optional) */
  caption: PropTypes.string,
  /** description for the card caption (optional) */
  captionTitle: PropTypes.string,
  children: PropTypes.node,
  /** set how many columns wide at large breakpoint  */
  colLg: PropTypes.string,
  /** set how many columns wide at medium breakpoint  */
  colMd: PropTypes.string,
  /** set to "dark" for dark background card */
  color: PropTypes.string,
  /** text displayed in the example card */
  text: PropTypes.string,
  /** set to "do" for do, and "dont" for dont */
  type: PropTypes.string
}