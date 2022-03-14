/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link as CarbonLink } from '@carbon/react'
import cx from 'classnames'

import { link } from './link.module.scss'

const Link = ({ className, ...rest }) => (
  <CarbonLink inline {...rest} className={cx(className, link)} />
)

export default Link
