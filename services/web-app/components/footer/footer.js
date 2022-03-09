/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, Theme } from '@carbon/react'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

import styles from './footer.module.scss'

const Footer = ({ isExpanded }) => {
  const container = clsx(styles.default, {
    [styles.expanded]: isExpanded
  })

  const colOne = [
    {
      text: 'Contribute',
      link: ''
    },
    {
      text: 'Privacy',
      link: ''
    },
    {
      text: 'Terms of Use',
      link: ''
    },
    {
      text: 'IBM.com',
      link: ''
    }
  ]

  const colTwo = [
    {
      text: 'Medium',
      link: ''
    },
    {
      text: 'Twitter',
      link: ''
    }
  ]

  return (
    <Theme theme="g100" className={container} isExpanded={isExpanded}>
      <Grid className={styles.grid}>
        <Column sm={4} md={2} className={styles.column}>
          {colOne.map((item, i) => (
            <Link href={item.link} key={i}>
              <a className={clsx(styles.text, styles.textLink)}>{item.text}</a>
            </Link>
          ))}
        </Column>
        <Column sm={4} md={2} lg={4} className={clsx(styles.column, styles.columnBorder)}>
          {colTwo.map((item, i) => (
            <Link href={item.link} key={i}>
              <a className={clsx(styles.text, styles.textLink)}>{item.text}</a>
            </Link>
          ))}
        </Column>
        <Column sm={4} md={3} lg={4} xlg={3} className={clsx(styles.column, styles.columnBorder)}>
          <p className={styles.text}>
            Have questions?{' '}
            <Link href="https://www.google.com">
              <a className={clsx(styles.text, styles.textUnderline)}>Email</a>
            </Link>{' '}
            us for site feedback or open an issue in{' '}
            <Link href="https://www.google.com">
              <a className={clsx(styles.text, styles.textUnderline)}>Github.</a>
            </Link>
          </p>
        </Column>
      </Grid>
    </Theme>
  )
}

Footer.propTypes = {
  isExpanded: PropTypes.bool
}

export default Footer
