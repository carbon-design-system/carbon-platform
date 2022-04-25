/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { preview } from './preview.module.scss'

const Preview = ({ title, ...props }) => (
  <iframe loading="lazy" title={title} {...props} className={preview} />
)

export default Preview
