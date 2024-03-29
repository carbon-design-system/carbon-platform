/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { baseFontSize, breakpoints as carbonBreakpoints } from '@carbon/elements'
import { CodeSnippet, Column, Grid, Theme } from '@carbon/react'
import clsx from 'clsx'

import styles from './typeset-example.module.scss'

const breakpoints = {
  sm: Number(carbonBreakpoints.sm.width.replace('rem', '')) * baseFontSize,
  md: Number(carbonBreakpoints.md.width.replace('rem', '')) * baseFontSize,
  lg: Number(carbonBreakpoints.lg.width.replace('rem', '')) * baseFontSize,
  xlg: Number(carbonBreakpoints.xlg.width.replace('rem', '')) * baseFontSize,
  max: Number(carbonBreakpoints.max.width.replace('rem', '')) * baseFontSize
}

const defaultTypeValues = {
  'letter-spacing': 0
}

const TypesetExample = (props) => (
  <div className={styles['example-container']}>
    {(props.typeSet || []).map((type) => {
      const indexOfClosestLargerBreakpoint = Math.max(
        0,
        Object.values(breakpoints).findIndex((width) => props.simulatedScreenWidth <= width)
      )

      const currentBreakpointPx = Object.values(breakpoints)[indexOfClosestLargerBreakpoint]

      const currentBreakpointName = Object.entries(breakpoints).find(
        ([_, val]) => val === currentBreakpointPx
      )[0]

      const getCurrentCompoundStylesForBreakpoint = (breakpointName) => {
        const typeKeys = Object.keys(breakpoints)
        const typeStylesUntilCurrentBreakpoint = []
        for (const item of typeKeys) {
          typeStylesUntilCurrentBreakpoint.push(props.typeScale[type.key][item])
          if (item === breakpointName) {
            break
          }
        }
        return Object.assign({}, defaultTypeValues, ...typeStylesUntilCurrentBreakpoint)
      }

      const currentBreakpointSpecs = getCurrentCompoundStylesForBreakpoint(currentBreakpointName)

      const calculateFluidTypeSize = (attribute) => currentBreakpointSpecs[attribute] * baseFontSize

      const calculateFluidLineHeight = (attribute) =>
        currentBreakpointSpecs[attribute] * baseFontSize

      const displayWeight = (weight, style) => {
        if (style === 'italic') {
          return `${weight} / Italic`
        }
        switch (weight) {
          case '300':
            return '300 / Light'
          case '400':
            return '400 / Regular'
          case '600':
            return '600 / Semi-Bold'
          default:
            return weight
        }
      }

      const specs = {
        fontWeight: currentBreakpointSpecs['font-weight'],
        fontSize: `${calculateFluidTypeSize('font-size')}px`,
        fontStyle: currentBreakpointSpecs['font-style'],
        lineHeight: `${calculateFluidLineHeight('line-height')}px`,
        letterSpacing: currentBreakpointSpecs['letter-spacing']
      }
      const displaySpecs = {
        step: currentBreakpointSpecs.step,
        font: currentBreakpointSpecs.font,
        style: currentBreakpointSpecs['font-style'],
        typeSet: currentBreakpointSpecs['type-set'],
        fontWeight: displayWeight(
          currentBreakpointSpecs['font-weight'],
          currentBreakpointSpecs['font-style']
        ),
        fontSize: `${`${calculateFluidTypeSize('font-size')}px / `}${currentBreakpointSpecs[
          'font-size'
        ]
          .toString()
          .replace('0.', '.')}rem`,
        lineHeight: `${`${calculateFluidLineHeight('line-height')}px / `}${
          currentBreakpointSpecs['line-height']
        }rem`,
        letterSpacing: currentBreakpointSpecs['letter-spacing'].toString().replace('0.', '.'),
        warning: currentBreakpointSpecs.warning
      }

      const versionClassName = type.version ? `cds--type-${type.version}` : ''

      const versionClassNames = clsx(`cds--type-${type.key}`, versionClassName)

      return (
        <div key={`${props.name}${type.key}${type.version}`} className={styles['typeset-example']}>
          <Grid className={styles['example-row']}>
            <Column sm={4} md={5} lg={8} className={styles['example-description']}>
              <p className={versionClassNames} style={specs}>
                {type.description}
              </p>
            </Column>
            <Column sm={4} md={3} lg={4} className={styles['example-specs']}>
              <strong>{type.name} </strong>
              <br />
              Type: {displaySpecs.font}
              <br />
              Size: {displaySpecs.fontSize}
              <br />
              Line height: {displaySpecs.lineHeight}
              <br />
              Weight: <span style={{ textTransform: 'capitalize' }}>{displaySpecs.fontWeight}</span>
              <br />
              Letter spacing: {displaySpecs.letterSpacing}px
              <br />
              Type set: {displaySpecs.typeSet}
              {displaySpecs.warning != null && (
                <span>
                  <br />
                  <strong>warning: </strong>
                  {displaySpecs.warning}
                  <br />
                </span>
              )}
              {displaySpecs.warning == null && <br />}
              <div className={styles['example-code-style']}>
                <Theme theme="white">
                  <CodeSnippet type="inline" feedback="Copied!">
                    ${type.name.split(' ')[0]}
                  </CodeSnippet>
                </Theme>
              </div>
            </Column>
          </Grid>
        </div>
      )
    })}
  </div>
)

export default TypesetExample
