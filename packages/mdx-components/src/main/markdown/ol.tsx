/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid, OrderedList } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import { LiConsumer } from './li.js'

interface OlProps {
  children: string | string[]
  className?: string | null
  [otherProp: string]: unknown
}

const Ol: MdxComponent<OlProps> = ({ children, className, ...rest }) => {
  return (
    <LiConsumer>
      {(value) => {
        if (value.hasListItemParent) {
          return (
            <OrderedList
              isExpressive
              className={clsx(className, withPrefix('list'), withPrefix('ol'))}
              nested
              {...rest}
            >
              {children}
            </OrderedList>
          )
        } else {
          return (
            <Grid className={withPrefix('list-container')}>
              <Column sm={4} md={8} lg={8}>
                <OrderedList
                  isExpressive
                  className={clsx(className, withPrefix('list'), withPrefix('ol'))}
                  {...rest}
                >
                  {children}
                </OrderedList>
              </Column>
            </Grid>
          )
        }
      }}
    </LiConsumer>
  )
}

Ol.propTypes = {
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

export { OlProps }
export default Ol
