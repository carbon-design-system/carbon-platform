/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Grid } from '@carbon/react'
import PropTypes from 'prop-types'

const Row = ({ children, className }) => <Grid className={className}>{children}</Grid>

Row.propTypes = {
  className: PropTypes.string
}
export default Row
