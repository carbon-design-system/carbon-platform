/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react'
import { ArrowRight } from '@carbon/react/icons'

import styles from './banner.module.scss'

const Banner = () => {
  return (
    <div aria-label="banner" className={styles.banner}>
      <p className={styles['banner--text']}>
        <strong className={styles['banner-heading']}>Done exploring?</strong>
        <span className={styles['banner--details']}>
          Return to the classic Carbon web experience.
        </span>
      </p>
      <Button
        href="https://www.carbondesignsystem.com"
        className={styles['button--banner']}
        kind="ghost"
        renderIcon={ArrowRight}
      >
        Go to classic website
      </Button>
    </div>
  )
}

export default Banner
