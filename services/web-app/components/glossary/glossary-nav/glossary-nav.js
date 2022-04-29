/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import useEventListener from '@/utils/use-event-listener'

import styles from './glossary-nav.module.scss'

const getPath = typeof window !== 'undefined' && window.location.hash.substring(1, 2).toUpperCase()

const GlossaryNav = () => {
  const [activeLetter, setActiveLetter] = useState(getPath)
  const [isReverseScroll, setIsReverseScroll] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [letters, setLetters] = useState([])

  const getActiveItem = (windowScroll) => {
    let scrollLetter = activeLetter

    letters.forEach((letter) => {
      if (windowScroll <= letter.bottom && windowScroll >= letter.top) {
        scrollLetter = letter.id
      }
    })

    return scrollLetter
  }

  const getEntryPositions = () => {
    const documentLetters = []
    document.querySelectorAll('.glossary-entry').forEach((entry) => {
      documentLetters.push({
        id: entry.id,
        top: entry.offsetTop,
        bottom: entry.offsetTop + entry.offsetHeight
      })
    })

    setLetters(documentLetters)
  }

  const updateActive = (evt) => {
    setActiveLetter(evt.target.textContent)
    setIsReverseScroll(true)
  }

  const handleScroll = () => {
    const windowScroll = isReverseScroll ? window.scrollY : window.scrollY + window.innerHeight
    const scrolledItem = getActiveItem(windowScroll)
    const navHeight = document.querySelector('.glossary-nav').clientHeight - 160

    const navTopPosition = document.querySelector('.glossary-nav').getBoundingClientRect().top

    if (scrolledItem !== activeLetter) {
      setActiveLetter(scrolledItem)
    }
    if (letters.length > 0 && navHeight < window.innerHeight) {
      if (navTopPosition <= 0) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }
  }

  const renderGlossaryNavItems = () => {
    const glossaryNavItems = []
    letters.forEach((letter) => {
      const isActiveItem = letter.id === activeLetter
      glossaryNavItems.push(
        <li
          key={letter.id}
          className={clsx({
            'glossary-nav__item': true,
            [styles['cds--list__item']]: true,
            [styles['glossary-nav__item--active']]: isActiveItem
          })}
        >
          <a href={`#${letter.id}`} onClick={updateActive}>
            {letter.id}
          </a>
        </li>
      )
    })
    return glossaryNavItems
  }

  useEventListener('scroll', handleScroll)

  useEffect(() => {
    setTimeout(() => {
      getEntryPositions()
    }, 100)
    handleScroll()

    if (activeLetter) {
      const currActiveLetter = document.querySelector(`#${activeLetter}`)
      window.scrollTo(0, currActiveLetter.offsetTop)
    }
    // we do NOT want this to run everytime activeLetter or handleScroll changes,
    // really just after the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see comment above
  }, [])

  const letterItems = renderGlossaryNavItems()
  const classNames = clsx({
    [styles['glossary-nav']]: true,
    [styles['glossary-nav--fixed']]: isFixed,
    'glossary-nav': true
  })

  return <ul className={classNames}>{letterItems}</ul>
}

export default GlossaryNav
