/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column } from '@carbon/react'

import { pictogram as pictogramMap } from '@/data/pictogram'

import styles from './page-header-pictogram.module.scss'

const PageHeaderPictogram = ({ pictogram }) => {
  const { icon: Icon } = pictogramMap[pictogram]

  if (!Icon) return null

  return (
    <Column className={styles.container} sm={0} md={5} lg={8}>
      <Icon />
    </Column>
  )
}

export default PageHeaderPictogram
