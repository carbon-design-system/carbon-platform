/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'

import { MdxComponent } from '../interfaces.js'

interface VariantProps {
  label: string
  variant: string
}

const Variant: MdxComponent<VariantProps> = () => {
  return null
}

Variant.propTypes = {
  /**
   * Display label for variant
   */
  label: PropTypes.string.isRequired,
  /**
   * Storybook variant story id
   */
  variant: PropTypes.string.isRequired
}

export { VariantProps }
export default Variant
