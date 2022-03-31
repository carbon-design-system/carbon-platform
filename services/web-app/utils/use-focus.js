/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react'

const useFocus = () => {
  const [focusTarget, setFocusTarget] = useState(null)

  useEffect(() => {
    if (focusTarget) {
      focusTarget.current.focus()
      setFocusTarget(null)
    }
  }, [focusTarget])

  return setFocusTarget
}

export default useFocus
