/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect } from 'react'

const useOutsideClick = (ref, callback) => {
  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(e)
      }
    },
    [callback, ref]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}

export default useOutsideClick
