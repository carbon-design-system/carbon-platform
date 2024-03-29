/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column, Grid } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './feature-card.module.scss'

export const FeatureCard = ({ href, children, description, title }) => {
  const isMd = useMatchMedia(mediaQueries.md)
  const isLg = useMatchMedia(mediaQueries.lg)

  const imageAspectRatio = () => {
    if (isLg) return null
    if (isMd) return null
    return '1x1'
  }

  const tileAspectRatio = () => {
    if (isMd) return '16x9'
    return '2x1'
  }
  return (
    <Grid className={styles.container}>
      <Column sm={4} md={8} lg={12}>
        <a className={styles['feature-card']} href={href}>
          <AspectRatio ratio={imageAspectRatio()} className={styles.image}>
            {children}
          </AspectRatio>
          <Grid className={styles['grid-tile']} condensed={isMd}>
            <Column sm={4} md={{ offset: 4, span: 4 }} lg={{ offset: 8, span: 4 }}>
              <AspectRatio ratio={tileAspectRatio()} className={styles.tile}>
                <h5 className={styles.title}>{title}</h5>
                <p className={styles.description}>{description}</p>
                <ArrowRight className={styles['arrow-right']} size={20} />
              </AspectRatio>
            </Column>
          </Grid>
        </a>
      </Column>
    </Grid>
  )
}

FeatureCard.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string
}
