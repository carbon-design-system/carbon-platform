/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import * as styles from './expressive-list.module.scss'

const ExpressiveList = ({ children, className, pictogram, title, titleType }) => {
  const ExpressiveListTitleClassNames = clsx(styles.title, {
    [styles.expressive_04]: titleType === 'expressive-04',
    [styles.expressive_02]: titleType === 'expressive-02'
  })

  if (!pictogram) {
    return (
      <Grid className={(clsx(className), styles['list-row'])}>
        <Column sm={4} md={2} lg={4} condensed>
          <h3 className={ExpressiveListTitleClassNames}>{title}</h3>
        </Column>
        <Column sm={4} md={6} lg={8}>
          <p className={styles.content}>{children}</p>
        </Column>
      </Grid>
    )
  }
  return (
    <Grid className={(clsx(className), styles['list-row'])}>
      <Column sm={4} md={2} lg={1} className={styles.pictogram}>
        {pictogram}
      </Column>
      <Column sm={4} md={6} lg={7} className={styles['pictogram-content']}>
        <h3 className={ExpressiveListTitleClassNames}>{title}</h3>
        <p className={styles.content}>{children}</p>
      </Column>
    </Grid>
  )
}

ExpressiveList.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  pictogram: PropTypes.node,
  title: PropTypes.string,
  titleType: PropTypes.string
}

export default ExpressiveList
