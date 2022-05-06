/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column } from '@carbon/react'
import PropTypes from 'prop-types'

import styles from './profile.module.scss'

/**
 * The `<Profile>` component is used to display a name, title and photo. Should be
 * placed inside of `<Grid condensed>` wrapper component.
 */
const Profile = ({ name, title, children }) => (
  <Column sm={4} md={4} lg={4} className={styles.profile}>
    <AspectRatio ratio="2x1">
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.name}>{name}</div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.image}>{children}</div>
      </div>
    </AspectRatio>
  </Column>
)

Profile.propTypes = {
  /**
   * Provide an image for the Profile component.
   */
  children: PropTypes.node,
  /**
   * Name
   */
  name: PropTypes.string,
  /**
   * Title
   */
  title: PropTypes.string
}

export default Profile
