/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column, Grid } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

import dashboardStyles from '@/components/dashboard/dashboard.module.scss'
import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './feature-card.module.scss'

export const FeatureCard = ({ href, children, description, title }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  const imageAspectRatio = () => {
    if (isMd) return ''
    // ask design what is aspect ratio for tablet?
    return '1x1'
  }

  const tileAspectRatio = () => {
    if (isMd) return '16x9'
    return '2x1'
  }
  const renderElement = () => (
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <Link href={href}>
          <a className={styles.featureCard}>
            <AspectRatio ratio={imageAspectRatio()} className={styles.image}>
              {children}
            </AspectRatio>
            <Grid className={styles.gridTile}>
              <Column sm={4} md={{ offset: 4, span: 4 }} lg={{ offset: 8, span: 4 }}>
                <AspectRatio ratio={tileAspectRatio()} className={styles.tile}>
                  <h5 className={styles.title}>{title}</h5>
                  <p className={styles.description}>{description}</p>
                  <ArrowRight
                    className={clsx(dashboardStyles.positionBottomRight, styles.arrowRight)}
                    size={20}
                  />
                </AspectRatio>
              </Column>
            </Grid>
          </a>
        </Link>
      </Column>
    </Grid>
  )

  return renderElement()
}

FeatureCard.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string
}
