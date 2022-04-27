/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid, Theme } from '@carbon/react'
import { IbmLogo } from '@carbon-platform/icons'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

import { currentMonth, currentYear } from '@/utils/date'

import styles from './footer.module.scss'

const Footer = ({ hasSideNav }) => {
  const colOne = [
    {
      text: 'Privacy',
      link: 'https://www.ibm.com/privacy'
    },
    {
      text: 'Terms of use',
      link: 'https://www.ibm.com/legal'
    },
    {
      text: 'Accessibility',
      link: 'https://www.ibm.com/able/'
    }
  ]

  const colTwo = [
    {
      text: 'Medium',
      link: 'https://medium.com/design-ibm'
    },
    {
      text: 'Twitter',
      link: 'https://twitter.com/ibmdesign'
    }
  ]

  const getColList = (col) =>
    col.map((item, i) => (
      <li key={item.text}>
        <Link href={item.link} key={i}>
          <a className={clsx(styles.text, styles.link, styles['list-link'])}>{item.text}</a>
        </Link>
      </li>
    ))

  return (
    <Theme theme="g100" className={styles.container}>
      <footer>
        <Grid className={styles.footer}>
          <Column sm={4} md={2} lg={{ span: 2, start: 5 }} className={styles.column}>
            <ul>{getColList(colOne)}</ul>
          </Column>
          <Column sm={4} md={2} lg={4} className={styles.column}>
            <ul>{getColList(colTwo)}</ul>
          </Column>
          <Column sm={4} md={3} lg={5} className={styles.column}>
            <p className={styles.text}>
              Last updated {currentMonth} {currentYear}
              <br />©{currentYear} IBM Design Program Office
            </p>
          </Column>
          <Column md={{ start: 1 }} lg={{ start: hasSideNav ? 5 : 1 }} className={styles.logo}>
            <IbmLogo />
          </Column>
        </Grid>
      </footer>
    </Theme>
  )
}

Footer.propTypes = {
  hasSideNav: PropTypes.bool
}

export default Footer
