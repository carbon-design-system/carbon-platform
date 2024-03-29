/*
 * Copyright IBM Corp. 2022, 2023
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
import { LiConsumer, LiProps } from './li.js'

interface OlProps {
  children: ReturnType<MdxComponent<LiProps>> | ReturnType<MdxComponent<LiProps>>[]
  className?: string | null
  [otherProp: string]: unknown
}

/**
 * For MDX files, steer away from using JSX components
 * for lists in favor of standard markdown syntax.
 *
 *```
 * 1. First ordered list item
 * 1. In markdown, the actual numbers don’t matter, just that it’s a number
 * 2. In markdown, the actual numbers don’t matter, just that it’s a number
 * ```
 */
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
   * Child LI elements
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    PropTypes.element.isRequired
  ]).isRequired,
  /**
   * Specify optional className for container element
   */
  className: PropTypes.string
}

export { OlProps }
export default Ol
