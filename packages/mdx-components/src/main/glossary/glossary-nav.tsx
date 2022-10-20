/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clsx } from 'clsx'
import React, { useEffect, useState } from 'react'

import { useEventListener, withPrefix } from '../utils.js'

const getPath = typeof window !== 'undefined' && window.location.hash.substring(1, 2).toUpperCase()

const GlossaryNav = () => {
  const [activeLetter, setActiveLetter] = useState(getPath)
  const [isReverseScroll, setIsReverseScroll] = useState(false)
  const [isFixed, setIsFixed] = useState(false)
  const [letters, setLetters] = useState<any[]>([])

  const getActiveItem = (windowScroll: number) => {
    let scrollLetter = activeLetter

    letters.forEach((letter) => {
      if (windowScroll <= letter.bottom && windowScroll >= letter.top) {
        scrollLetter = letter.id
      }
    })

    return scrollLetter
  }

  const getEntryPositions = () => {
    const documentLetters:
      | ((prevState: never[]) => never[])
      | { id: string; top: any; bottom: any }[] = []
    // added Array.from below
    const glossaryEntries = Array.from(
      document.querySelectorAll('.carbon-platform-mdx-components--glossary-entry')
    )

    glossaryEntries?.forEach((entry: any) => {
      documentLetters.push({
        id: entry.id,
        top: entry.offsetTop,
        bottom: entry.offsetTop + entry.offsetHeight
      })
    })

    setLetters(documentLetters)
  }

  const updateActive = (evt: {
    target: { textContent: string | boolean | ((prevState: string | false) => string | false) }
  }) => {
    setActiveLetter(evt.target.textContent)
    setIsReverseScroll(true)
  }

  const handleScroll = () => {
    const windowScroll = isReverseScroll ? window.scrollY : window.scrollY + window.innerHeight
    const scrolledItem = getActiveItem(windowScroll)
    const glossaryNavItem = document.querySelector(
      '.carbon-platform-mdx-components--glossary-entry'
    )!
    const navHeight = glossaryNavItem.clientHeight - 160

    const navTopPosition = glossaryNavItem.getBoundingClientRect().top

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
    const glossaryNavItems: JSX.Element[] = []
    letters.forEach((letter) => {
      const isActiveItem = letter.id === activeLetter
      glossaryNavItems.push(
        <li
          key={letter.id}
          className={clsx({
            'glossary-nav__item': true,
            [withPrefix('cds--list__item')]: true,
            [withPrefix('glossary-nav__item--active')]: isActiveItem
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
      const currActiveLetter = document.querySelector(`#${activeLetter}`) as HTMLElement
      window.scrollTo(0, currActiveLetter?.offsetTop)
    }
    // we do NOT want this to run everytime activeLetter or handleScroll changes,
    // really just after the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see comment above
  }, [])

  const letterItems = renderGlossaryNavItems()
  const classNames = clsx({
    [withPrefix('glossary-nav')]: true,
    [withPrefix('glossary-nav--fixed')]: isFixed,
    [withPrefix('glossary-nav')]: true
  })

  return <ul className={classNames}>{letterItems}</ul>
}

export default GlossaryNav
