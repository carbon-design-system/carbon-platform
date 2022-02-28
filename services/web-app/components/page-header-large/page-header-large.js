/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Theme } from '@carbon/react'
import Image from 'next/image'
import PropTypes from 'prop-types'

import PageHeaderIllo from '../../public/page-header.png'
import styles from './page-header-large.module.scss'

const PageHeaderLarge = ({ title, description }) => {
  return (
    <Theme className={styles.container} theme="g100">
      <Grid className={styles.grid}>
        <Column className={styles.column} sm={4} md={6} lg={8}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </Column>
      </Grid>
      <div className={styles.image}>
        <Image
          alt="Asset illustration"
          src={PageHeaderIllo}
          layout="fill"
          objectFit="cover"
          objectPosition="left center"
        />
      </div>
    </Theme>
  )
}

PageHeaderLarge.propTypes = {
  pictogram: PropTypes.object,
  title: PropTypes.string.isRequired
}

export default PageHeaderLarge
