/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Theme } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import styles from './hero.module.scss'

const Hero = ({ title, section, theme }) => {
  return (
    <Theme className={clsx(styles[section], styles.container)} theme={theme}>
      <Grid>
        <Column className={styles.column} sm={4} md={4} lg={8}>
          {title && <h1 className={styles.title}>{title}</h1>}
        </Column>
      </Grid>
    </Theme>
  )
}

Hero.defaultProps = {
  theme: 'g100'
}

Hero.propTypes = {
  section: PropTypes.string,
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),
  title: PropTypes.string.isRequired
}

export default Hero
