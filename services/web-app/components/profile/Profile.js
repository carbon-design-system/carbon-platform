/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import React from 'react'

import {
  cardContainer,
  contentContainer,
  imageContainer,
  nameStyle,
  profileContainer,
  titleStyle
} from './profile.module.scss'

const Profile = ({ name, title, children }) => (
  <div className={`${profileContainer} cds--col-md-4 cds--col-lg-4 cds--no-gutter-sm`}>
    <div className={'cds--aspect-ratio cds--aspect-ratio--2x1'}>
      <div className={'cds--aspect-ratio--object'}>
        <div className={cardContainer}>
          <div className={contentContainer}>
            <div className={nameStyle}>{name}</div>
            <div className={titleStyle}>{title}</div>
          </div>
          <div className={imageContainer}>{children}</div>
        </div>
      </div>
    </div>
  </div>
)

Profile.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string
}

export default Profile
