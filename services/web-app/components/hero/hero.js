/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Theme } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import H1 from '../markdown/h1'
import styles from './hero.module.scss'

const Hero = ({ title, section }) => {
  return (
    <Theme className={clsx(styles[section], styles.container)} theme="g100">
      <Grid>
        <Column className={styles.column} sm={4} md={4} lg={8}>
          {title && (
            <H1 headingClassName={styles.title} className={styles['h1-container']}>
              {title}
            </H1>
          )}
        </Column>
      </Grid>
    </Theme>
  )
}

Hero.propTypes = {
  section: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default Hero
