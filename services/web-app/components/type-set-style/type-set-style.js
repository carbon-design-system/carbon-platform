/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { baseFontSize, breakpoints as carbonBreakpoints } from '@carbon/elements'
import { findLastIndex, values } from 'lodash'
import { Grid, Column } from '@carbon/react'

import InputRange from './input-range'
import StickyContainer from './sticky-container'
import TypesetExample from './typeset-example'

import { typeScale } from '@/data/type-scale'
import { typeSets } from '@/data/type-sets'

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

class TypesetStyle extends React.Component {
  state = {
    simulatedScreenWidth: 1056,
    tab: 0,
    sticky: false,
    mobile: false
  }

  componentDidMount() {
    if (window.innerWidth < 500) {
      this.setState({
        mobile: true
      })
    }
    this.addResizeListener()
    this.addScrollListener()
  }

  addScrollListener() {
    document.addEventListener('scroll', () => {
      if (this.refs.stickyBar) {
        if (this.refs.stickyBar.getBoundingClientRect().top <= 112) {
          this.setState({
            sticky: true
          })
        } else if (this.refs.stickyBar.getBoundingClientRect().top > 112) {
          this.setState({
            sticky: false
          })
        }
      }
    })
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 500) {
        this.setState({
          mobile: true
        })
      } else if (window.innerWidth > 500) {
        this.setState({
          mobile: false
        })
      }
    })
  }

  toggleBreakpoint = (e) => {
    this.setState({ simulatedScreenWidth: Number(e.target.value) })
  }

  toggleSet = (value) => {
    this.setState({ tab: value })
  }

  getButtons = () =>
    Object.keys(breakpoints).map((breakpointName) => (
      <button
        className={clsx(
          styles['button'],
          styles[
            `${
              isWithinBreakpoint(this.state.simulatedScreenWidth, breakpoints[breakpointName])
                ? 'selected'
                : ''
            }`
          ]
        )}
        value={breakpoints[breakpointName]}
        selected={isWithinBreakpoint(this.state.simulatedScreenWidth, breakpoints[breakpointName])}
        onClick={this.toggleBreakpoint}
        key={`breakpoint-tab${breakpointName}`}
      >
        {breakpointName}
      </button>
    ))

  render() {
    const {
      navBar,
      banner,
      secondary,
      top,
      breakpointControls = false,
      header = false,
      typesets
    } = this.props

    const typesetStyleStickyClassnames = clsx([styles['controls-sticky']], {
      [styles['controls-sticky-stuck']]: this.state.sticky
    })

    return (
      <div className={styles['container']}>
        <StickyContainer
          navBar={navBar || true}
          banner={banner || true}
          secondary={secondary || false}
          top={top || null}
        >
          {breakpointControls && (
            <>
              <Grid />
              <Grid ref="stickyBar" className={typesetStyleStickyClassnames}>
                <Column sm={4} md={4} lg={6} className={styles['breakpoint-controls']}>
                  <span>Breakpoints</span>
                  <div className={styles['button-controls-container']}>{this.getButtons()}</div>
                </Column>
                <Column sm={4} md={4} lg={6} className={styles['screen-controls']}>
                  <span className={styles['screen-width-label']}>Screen width</span>
                  <InputRange
                    id="screenWidthInput"
                    min={breakpoints.sm}
                    max={breakpoints.max}
                    value={this.state.simulatedScreenWidth}
                    onChange={this.toggleBreakpoint}
                  />
                  <label className={styles['screen-label']} htmlFor="screenWidthInput">
                    {this.state.simulatedScreenWidth}
                  </label>
                </Column>
              </Grid>
            </>
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
                  simulatedScreenWidth={this.state.simulatedScreenWidth}
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
}

export default TypesetStyle

// these props are passed onto the sticky container
TypesetStyle.propTypes = {
  // if site has banner at top ( ex. go to v1)
  banner: PropTypes.bool,

  // if page navBar is showing / hiding, toggle this on/off
  navBar: PropTypes.bool,

  // for items that are on pages that already have a sticky item
  secondary: PropTypes.bool,

  // if custom top is necessary, must include units - (rem, px, etc)
  top: PropTypes.string,

  // show / hide breakpoint controls
  breakpointControls: PropTypes.bool,

  // show / hide the header
  header: PropTypes.bool,

  // comma separated list of typesets to display
  typesets: PropTypes.string
}
