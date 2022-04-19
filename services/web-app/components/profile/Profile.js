/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './profile.module.scss'

const Profile = ({ name, title, children }) => (
  <Column sm={4} md={4} lg={4} xlg={4} max={4} className={styles.profileContainer}>
    <AspectRatio ratio="2x1">
      <div className={styles.cardContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.nameStyle}>{name}</div>
          <div className={styles.titleStyle}>{title}</div>
        </div>
        <div className={styles.imageContainer}>{children}</div>
      </div>
    </AspectRatio>
  </Column>
)

Profile.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string
}

export default Profile
