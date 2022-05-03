/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  Column,
  ContentSwitcher,
  Grid,
  OverflowMenu,
  OverflowMenuItem,
  Switch
} from '@carbon/react'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import { H3 } from '@/components/markdown'
import tableStyles from '@/components/page-table/page-table.module.scss'
import StickyContainer from '@/components/typeset-style/sticky-container'
import colorTokens from '@/data/color-tokens'
import useEventListener from '@/utils/use-event-listener'

import styles from './color-token-table.module.scss'

const ColorTokenTable = () => {
  const containerRef = useRef(null)

  const [theme, setTheme] = useState('white')
  const [sticky, setIsSticky] = useState(false)
  const [mobile, setMobile] = useState(false)

  // Conditionally add a drop shadow through JavaScript because `position:sticky` doesn't support a
  // `::stuck` pseudo-class to trigger the drop shadow. Header (48) + spacer (16)  = 64.
  const scrollHandler = useCallback(() => {
    if (containerRef.current && typeof window !== 'undefined') {
      setIsSticky(containerRef.current.getBoundingClientRect().top === 64)
    }
  }, [])

  const resizeHandler = useCallback(() => {
    if (window.innerWidth < 500) {
      setMobile(true)
    } else if (window.innerWidth > 500) {
      setMobile(false)
    }
  }, [])

  useEventListener('scroll', scrollHandler)
  useEffect(() => {
    scrollHandler()
  }, [scrollHandler])

  useEventListener('resize', resizeHandler)
  useEffect(() => {
    resizeHandler()
  }, [resizeHandler])

  const switchTheme = (theme) => {
    setTheme(theme.name)
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  }

  const renderValue = (token, tokenInfo) => {
    const currentTheme = theme
    const { value } = tokenInfo
    let bgColor = value[currentTheme].hex
    if (bgColor.substring(bgColor.length - 3, bgColor.length) === '50%') {
      const hex = bgColor.substring(0, bgColor.length - 6)
      bgColor = `rgba(${hexToRgb(hex).r}, ${hexToRgb(hex).g}, ${hexToRgb(hex).b}, 0.5)`
    }

    const copyToken = () => {
      window.navigator.clipboard.writeText(token)
    }

    const copyHex = () => {
      window.navigator.clipboard.writeText(value[currentTheme].hex)
    }

    return (
      <div className={styles['color-token-value']}>
        <ul>
          <li>{value[currentTheme].name}</li>
          <li>—</li>
          <li>{value[currentTheme].hex}</li>
        </ul>
        <div>
          <div
            className={styles['color-token-value__block']}
            style={{
              backgroundColor: bgColor,
              border: value[currentTheme].hex === '#ffffff' && '1px solid #BEBEBE'
            }}
          />
          <OverflowMenu floatingMenu={false} flipped>
            <OverflowMenuItem primaryFocus itemText="Copy hex" onClick={copyHex} />
            <OverflowMenuItem itemText="Copy token" onClick={copyToken} />
          </OverflowMenu>
        </div>
      </div>
    )
  }

  const renderToken = (token, tokenInfo, key) => {
    const roles = tokenInfo.role.map((role, i) => (
      <li key={i}>
        {role}
        {i !== tokenInfo.role.length - 1 && ';'}
      </li>
    ))
    return (
      <tr key={key}>
        <td>
          <code>{token}</code>
        </td>
        <td>
          <ul>{roles}</ul>
        </td>
        <td>{renderValue(token, tokenInfo)}</td>
      </tr>
    )
  }

  const themeSwitcherClasses = clsx(styles['theme-switcher'], {
    [styles['theme-switcher--stuck']]: sticky
  })

  const ColorCategory = ({ name }) => {
    return (
      <>
        <H3>{name.charAt(0).toUpperCase() + name.slice(1).split('-').join(' ')}</H3>

        <Grid condensed>
          <Column sm={4} md={8} lg={16}>
            <table className={tableStyles['page-table']}>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Role</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(colorTokens[`${name}-tokens`]).map((token, i) =>
                  renderToken(token, colorTokens[`${name}-tokens`][token], i)
                )}
              </tbody>
            </table>
          </Column>
        </Grid>
      </>
    )
  }

  return (
    <Grid condensed className={clsx(styles['color-token-table'])}>
      <Column sm={4} md={8} lg={16}>
        <StickyContainer navBar banner secondary={false}>
          <div ref={containerRef}>
            <ContentSwitcher className={themeSwitcherClasses} onChange={switchTheme}>
              <Switch name="white" text={mobile ? 'Wte' : 'White'} />
              <Switch name="g10" text={mobile ? 'G10' : 'Gray 10'} />
              <Switch name="g90" text={mobile ? 'G90' : 'Gray 90'} />
              <Switch name="g100" text={mobile ? 'G100' : 'Gray 100'} />
            </ContentSwitcher>
          </div>
        </StickyContainer>

        <section>
          <ColorCategory name="background" />
          <ColorCategory name="layer" />
          <ColorCategory name="layer-accent" />
          <ColorCategory name="field" />
          <ColorCategory name="border" />
          <ColorCategory name="text" />
          <ColorCategory name="link" />
          <ColorCategory name="icon" />
          <ColorCategory name="button" />
          <ColorCategory name="support" />
          <ColorCategory name="focus" />
          <ColorCategory name="miscellaneous" />
        </section>
      </Column>
    </Grid>
  )
}

export default ColorTokenTable
