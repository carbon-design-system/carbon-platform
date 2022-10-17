/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, UnorderedList } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import { LiConsumer } from './li.js'

interface UlProps {
  children: string | string[]
  className?: string | null
  [otherProp: string]: unknown
}

const UL: MdxComponent<UlProps> = ({ children, className, ...rest }) => {
  return (
    <LiConsumer>
      {(value) => {
        if (value.hasListItemParent) {
          return (
            <UnorderedList
              isExpressive
              className={clsx(className, withPrefix('list'), withPrefix('ul'))}
              nested
              {...rest}
            >
              {children}
            </UnorderedList>
          )
        } else {
          return (
            <Grid className={withPrefix('list-container')}>
              <Column sm={4} md={8} lg={8}>
                <UnorderedList
                  isExpressive
                  className={clsx(className, withPrefix('list'), withPrefix('ul'))}
                  {...rest}
                >
                  {children}
                </UnorderedList>
              </Column>
            </Grid>
          )
        }
      }}
    </LiConsumer>
  )
}

UL.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  /**
   * Specify optional className for container element
   */
  className: PropTypes.string
}

export { UlProps }
export default UL
