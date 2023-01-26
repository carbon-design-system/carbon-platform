/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UpToTop } from '@carbon/react/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'

import useEventListener from '@/utils/use-event-listener'

import styles from './back-to-top.module.scss'

/**
 * The `<BackToTop />` component displays in the lower right corner
 * when the user scrolls past 300px
 */
const BackToTop = ({ alwaysVisible }) => {
  const [hidden, setHidden] = useState(true)

  const scrollHandler = useCallback(() => {
    setHidden(window.scrollY < 300)
  }, [])

  useEventListener('scroll', scrollHandler)
  useEffect(() => {
    scrollHandler()
  }, [scrollHandler])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className={clsx(
        styles.button,
        { [styles.hidden]: hidden },
        { [styles.visible]: alwaysVisible }
      )}
      type="button"
      aria-label="Back to Top"
    >
      <UpToTop size={20} />
    </button>
  )
}

BackToTop.propTypes = {
  /**
   * Optional prop to always display, default will display
   * when scrolling past 300px
   */
  alwaysVisible: PropTypes.bool
}

export default BackToTop
