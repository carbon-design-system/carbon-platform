/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react'

export default function useOnKey(key, action) {
  useEffect(() => {
    function onKeyup(event) {
      if (event.key === key) action()
    }
    addEventListener('keyup', onKeyup)
    return () => removeEventListener('keyup', onKeyup)
  }, [key, action])
}
