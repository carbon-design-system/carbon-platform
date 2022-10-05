/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './content-wrapper.module.scss'

const ContentWrapper = ({ children }) => <div className={styles['content-wrapper']}>{children}</div>

export default ContentWrapper
