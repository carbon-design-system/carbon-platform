/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AspectRatio, Column } from '@carbon/react'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface ProfileProps {
  name?: string | null
  title?: string | null
  children: ReactNode
}

/**
 * The `<Profile>` component is used to display a name, title and photo. Should be
 * placed inside of `<Grid condensed>` wrapper component.
 */
const Profile: MdxComponent<ProfileProps> = ({ name, title, children }) => (
  <Column sm={4} md={4} lg={4} className={withPrefix('profile')}>
    <AspectRatio ratio="2x1">
      <div className={withPrefix('card')}>
        <div className={withPrefix('content')}>
          <div className={withPrefix('name')}>{name}</div>
          <div className={withPrefix('title')}>{title}</div>
        </div>
        <div className={withPrefix('image')}>{children}</div>
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

export { ProfileProps }
export default Profile
