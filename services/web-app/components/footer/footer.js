/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { IbmCloud } from '@carbon/react/icons'
import clsx from 'clsx'
import Link from 'next/link'
import PropTypes from 'prop-types'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.container}>
      <Grid className={styles.grid}>
        <Column className={styles.column} sm={4} md={2} lg={2}>
          <Link href="https://www.google.com">
            <a className={styles.link}>{'Contribute'}</a>
          </Link>
          <Link href="https://www.google.com">
            <a className={styles.link}>{'Privacy'}</a>
          </Link>
          <Link href="https://www.google.com">
            <a className={styles.link}>{'Terms of use'}</a>
          </Link>
          <Link href="https://www.google.com">
            <a className={styles.link}>{'Ibm.com'}</a>
          </Link>
        </Column>
        <Column className={clsx(styles.column, styles.columnBorderTop)} sm={4} md={2} lg={4}>
          <Link href="https://www.google.com">
            <a className={styles.link}>{'Medium'}</a>
          </Link>
          <Link href="https://www.google.com">
            <a className={styles.link}>{'Twitter'}</a>
          </Link>
        </Column>
        <Column
          className={clsx(styles.column, styles.columnBorderTop)}
          sm={4}
          md={3}
          lg={4}
          xlg={3}
        >
          <p className={styles.text}>
            {'Have questions? '}
            <Link href="https://www.google.com">
              <a className={clsx(styles.link, styles.linkUnderline)}>{'Email'}</a>
            </Link>
            {' us for site feedback or open an issue in '}
            <Link href="https://www.google.com">
              <a className={clsx(styles.link, styles.linkUnderline)}>{'Github.'}</a>
            </Link>
          </p>
        </Column>
      </Grid>
      <Grid>
        <Column sm={4} md={6} lg={6} xlg={6}>
          <IbmCloud className={styles.icon} size={64} />
        </Column>
      </Grid>
    </div>
  )
}

Footer.propTypes = {
  pictogram: PropTypes.object,
  title: PropTypes.string.isRequired
}

export default Footer
