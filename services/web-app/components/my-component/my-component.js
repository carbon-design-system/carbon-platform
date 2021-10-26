/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Button } from '@carbon/react'
import styles from './my-component.module.scss'

const MyComponent = () => {
  return (
    <div className={styles.fooBar}>
      <div>My component</div>
      <Button>My button</Button>
    </div>
  )
}

export default MyComponent
