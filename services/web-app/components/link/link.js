/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link as CarbonLink } from '@carbon/react'
import clsx from 'clsx'

import styles from './link.module.scss'

const Link = ({ className, ...rest }) => (
  <CarbonLink inline {...rest} className={clsx(className, styles.link)} />
)

export default Link
