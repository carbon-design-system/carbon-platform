/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

type TypeType = 'types' | 'italic' | 'weight'

interface TypeWeightProps {
  type: TypeType
}

/**
 * The `<TypeWeight>` component is used to display the various type styles.
 */
const TypeWeight: MdxComponent<TypeWeightProps> = ({ type }) => {
  if (type === 'types') {
    return (
      <Grid condensed>
        <Column sm={4} md={8} lg={8} className={withPrefix('type-weight')}>
          <p className={withPrefix('type-weight_type')}>IBM Plex Sans</p>
          <p className={clsx(withPrefix('type-weight_type'), withPrefix('serif'))}>
            IBM Plex Serif
          </p>
          <p className={clsx(withPrefix('type-weight_type'), withPrefix('mono'))}>IBM Plex Mono</p>
        </Column>
      </Grid>
    )
  }
  if (type === 'italic') {
    return (
      <Grid condensed>
        <Column sm={4} md={8} lg={8} className={withPrefix('type-weight')}>
          <p
            className={clsx(
              withPrefix('type-weight_type'),
              withPrefix('semibold'),
              withPrefix('italic')
            )}
          >
            Semibold Italic (600)
          </p>
          <p
            className={clsx(
              withPrefix('type-weight_type'),
              withPrefix('regular'),
              withPrefix('italic')
            )}
          >
            Regular (400)
          </p>
          <p
            className={clsx(
              withPrefix('type-weight_type'),
              withPrefix('light'),
              withPrefix('italic')
            )}
          >
            Light (300)
          </p>
        </Column>
      </Grid>
    )
  }
  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={8} className={withPrefix('type-weight')}>
        <p className={clsx(withPrefix('type-weight_type'), withPrefix('semibold'))}>
          Semibold (600)
        </p>
        <p className={clsx(withPrefix('type-weight_type'), withPrefix('regular'))}>Regular (400)</p>
        <p className={clsx(withPrefix('type-weight_type'), withPrefix('light'))}>Light (300)</p>
      </Column>
    </Grid>
  )
}

TypeWeight.propTypes = {
  /**
   * TypeWeight table options
   */
  type: PropTypes.oneOf<TypeType>(['types', 'italic', 'weight']).isRequired
}

TypeWeight.defaultProps = {
  type: 'weight'
}

export { TypeWeightProps }
export default TypeWeight
