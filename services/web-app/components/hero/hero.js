/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Theme } from '@carbon/react'
import Image from 'next/image'
import PropTypes from 'prop-types'

import { mediaQueries, useMatchMedia } from '@/utils/use-match-media'

import styles from './hero.module.scss'

const Hero = ({ title, description, image, imageAlt }) => {
  const isMd = useMatchMedia(mediaQueries.md)

  return (
    <Theme className={styles.container} theme="g100">
      <Grid className={styles.grid}>
        <Column className={styles.column} sm={4} md={6} lg={8}>
          {title && <h1 className={styles.title}>{title}</h1>}
          {description && <p className={styles.description}>{description}</p>}
        </Column>
      </Grid>
      {image && (
        <div className={styles.image}>
          <Image
            alt={imageAlt}
            src={image}
            layout="fill"
            objectFit="cover"
            objectPosition={isMd ? 'left center' : 'center top'}
          />
        </div>
      )}
    </Theme>
  )
}

Hero.propTypes = {
  pictogram: PropTypes.object,
  title: PropTypes.string.isRequired
}

export default Hero
