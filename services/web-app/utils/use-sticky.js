/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useRef, useState } from 'react'

const eventsToBind =
  typeof window !== 'undefined'
    ? [
        [document, 'scroll'],
        [window, 'resize'],
        [window, 'orientationchange']
      ]
    : []

const useSticky = () => {
  const stickyRef = useRef(null)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    // Observe when ref enters or leaves sticky state
    // eslint-disable-next-line max-len -- do not split this url
    // rAF https://stackoverflow.com/questions/41740082/scroll-events-requestanimationframe-vs-requestidlecallback-vs-passive-event-lis
    function observe() {
      const refPageOffset = stickyRef.current.getBoundingClientRect().top
      const stickyOffset = parseInt(getComputedStyle(stickyRef.current).top, 10)
      const stickyActive = refPageOffset <= stickyOffset

      if (stickyActive && !sticky) {
        setSticky(true)
      } else if (!stickyActive && sticky) {
        setSticky(false)
      }
    }
    observe()

    // Bind events
    eventsToBind.forEach((eventPair) => {
      eventPair[0].addEventListener(eventPair[1], observe)
    })

    return () => {
      eventsToBind.forEach((eventPair) => {
        eventPair[0].removeEventListener(eventPair[1], observe)
      })
    }
  }, [stickyRef, sticky])

  return [stickyRef, sticky]
}

export default useSticky
