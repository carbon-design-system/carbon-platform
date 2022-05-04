/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { baseFontSize, breakpoints as carbonBreakpoints } from '@carbon/elements'
import { Column, Grid } from '@carbon/react'
import clsx from 'clsx'
import { findLastIndex, values } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'

import { typeScale } from '@/data/type-scale'
import { typeSets } from '@/data/type-sets'
import useEventListener from '@/utils/use-event-listener'

import InputRange from './input-range'
import StickyContainer from './sticky-container'
import TypesetExample from './typeset-example'
import styles from './typeset-style.module.scss'

const breakpoints = {
  sm: Number(carbonBreakpoints.sm.width.replace('rem', '')) * baseFontSize,
  md: Number(carbonBreakpoints.md.width.replace('rem', '')) * baseFontSize,
  lg: Number(carbonBreakpoints.lg.width.replace('rem', '')) * baseFontSize,
  xlg: Number(carbonBreakpoints.xlg.width.replace('rem', '')) * baseFontSize,
  max: Number(carbonBreakpoints.max.width.replace('rem', '')) * baseFontSize
}

const nextLargerBreakpointPx = (viewportWidth) =>
  values(breakpoints)[indexOfCurrentBreakpoint(viewportWidth) + 1]

const indexOfCurrentBreakpoint = (viewportWidth) =>
  findLastIndex(values(breakpoints), (width) => viewportWidth >= width)

const isWithinBreakpoint = (viewportWidth, currentBreakpoint) => {
  if (viewportWidth === currentBreakpoint) return true
  return (
    viewportWidth >= currentBreakpoint && viewportWidth < nextLargerBreakpointPx(currentBreakpoint)
  )
}

/**
 * The `<TypeSetStyle>` component displays all of the type styles provided by Carbon.
 */
const TypesetStyle = ({
  navBar,
  banner,
  secondary,
  top,
  breakpointControls = false,
  header = false,
  typesets
}) => {
  const containerRef = useRef(null)
  const [simulatedScreenWidth, setSimulatedScreenWidth] = useState(1056)
  const [sticky, setSticky] = useState(false)

  const typesetStyleStickyClassnames = clsx([styles['controls-sticky']], {
    [styles['controls-sticky-stuck']]: sticky
  })

  // Conditionally add a drop shadow through JavaScript because `position:sticky` doesn't support a
  // `::stuck` pseudo-class to trigger the drop shadow. Header (48) + spacer (16)  = 64.
  const scrollHandler = useCallback(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      setSticky(containerRef.current.getBoundingClientRect().top === 64)
    }
  }, [])

  useEventListener('scroll', scrollHandler)
  useEffect(() => {
    scrollHandler()
  }, [scrollHandler])

  const toggleBreakpoint = (e) => {
    setSimulatedScreenWidth(Number(e.target.value))
  }

  const getButtons = () =>
    Object.keys(breakpoints).map((breakpointName) => (
      <button
        type="button"
        className={clsx(
          styles.button,
          styles[
            `${
              isWithinBreakpoint(simulatedScreenWidth, breakpoints[breakpointName])
                ? 'selected'
                : ''
            }`
          ]
        )}
        value={breakpoints[breakpointName]}
        selected={isWithinBreakpoint(simulatedScreenWidth, breakpoints[breakpointName])}
        onClick={toggleBreakpoint}
        key={`breakpoint-tab${breakpointName}`}
      >
        {breakpointName}
      </button>
    ))

  return (
    <div className={styles.container}>
      <StickyContainer
        navBar={navBar || true}
        banner={banner || true}
        secondary={secondary || false}
        top={top || null}
      >
        {breakpointControls && (
          <div ref={containerRef}>
            <Grid className={typesetStyleStickyClassnames}>
              <Column sm={4} md={4} lg={6} className={styles['breakpoint-controls']}>
                <span>Breakpoints</span>
                <div className={styles['button-controls-container']}>{getButtons()}</div>
              </Column>
              <Column sm={4} md={4} lg={6} className={styles['screen-controls']}>
                <span className={styles['screen-width-label']}>Screen width</span>
                <InputRange
                  id="screenWidthInput"
                  min={breakpoints.sm}
                  max={breakpoints.max}
                  value={simulatedScreenWidth}
                  onChange={toggleBreakpoint}
                />
                <label className={styles['screen-label']} htmlFor="screenWidthInput">
                  {simulatedScreenWidth}
                </label>
              </Column>
            </Grid>
          </div>
        )}
      </StickyContainer>
      <div>
        {typesets
          .replace(', ', ',')
          .split(',')
          .map((typeset, i) => (
            <>
              {header && (
                <h4>
                  {typeset
                    .replace(/fixed/g, '')
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .toLowerCase()}
                </h4>
              )}
              <TypesetExample
                key={i}
                simulatedScreenWidth={simulatedScreenWidth}
                name={typeset}
                typeSet={typeSets[typeset]}
                typeScale={typeScale}
              />
            </>
          ))}
      </div>
    </div>
  )
}

// these props are passed onto the sticky container
TypesetStyle.propTypes = {
  /**
   * if site has banner at top ( ex. go to v1)
   */
  banner: PropTypes.bool,

  /**
   * show / hide breakpoint controls
   */
  breakpointControls: PropTypes.bool,

  /**
   * show / hide the header
   */
  header: PropTypes.bool,

  /**
   * if page navBar is showing / hiding, toggle this on/off
   */
  navBar: PropTypes.bool,

  /**
   * for items that are on pages that already have a sticky item
   */
  secondary: PropTypes.bool,

  /**
   * if custom top is necessary, must include units - (rem, px, etc)
   */
  top: PropTypes.string,

  /**
   *  comma separated list of typesets to display
   */
  typesets: PropTypes.string
}

export default TypesetStyle
