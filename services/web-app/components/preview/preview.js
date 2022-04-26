/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './preview.module.scss'

/**
 * The `<Preview>` component is a simple wrapper for an `<iframe />` with
 * styling added to allow it to display responsively within the Platform.
 */
const Preview = ({ title, ...props }) => (
  <iframe loading="lazy" title={title} {...props} className={styles.preview} />
)

export default Preview
