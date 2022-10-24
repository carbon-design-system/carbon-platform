/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface PalettesContainerProps {
  children: ReactNode
  color?: string | null
  continuous?: boolean | null
  dark?: boolean | null
  twoColumn?: boolean | null
}

const PalettesContainer: MdxComponent<PalettesContainerProps> = ({
  children,
  color,
  continuous,
  dark,
  twoColumn = false
}) => {
  const paletteContainerClassNames = clsx(withPrefix('palettes-contaier'), {
    sequential: color,
    'dark-mode': dark,
    'gradient-blue': color === 'blue' && continuous,
    'gradient-purple': color === 'purple' && continuous,
    'gradient-red': color === 'red' && continuous,
    'gradient-teal': color === 'teal' && continuous,
    'gradient-cyan': color === 'cyan' && continuous,
    'gradient-teal-only': color === 'teal-only' && continuous,
    'alert-container': twoColumn
  })

  return <div className={paletteContainerClassNames}>{children}</div>
}

PalettesContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  color: PropTypes.string,
  continuous: PropTypes.bool,
  dark: PropTypes.bool,
  twoColumn: PropTypes.bool
}

export { PalettesContainerProps }
export default PalettesContainer
