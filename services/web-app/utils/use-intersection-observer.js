/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const useIntersectionObserver = () => {
  const [node, setNode] = useState(null)
  const [visible, setVisible] = useState(false)
  const observerRef = useRef()

  const disconnect = useCallback(() => {
    const { current } = observerRef
    if (current) {
      current.disconnect()
    }
  }, [])

  const observe = useCallback(() => {
    observerRef.current = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '75%'
    })
    if (node) {
      observerRef.current.observe(node)
    }
  }, [node])

  useLayoutEffect(() => {
    observe()
    return () => {
      disconnect()
    }
  }, [observe, disconnect])

  return [setNode, visible]
}

export default useIntersectionObserver
