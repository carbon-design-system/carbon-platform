/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, ContentSwitcher, Dropdown, Grid, Switch } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'
import ColorPaletteColor from './color-palette-color.js'
import {
  alertDark,
  alertLight,
  categoricalDark,
  categoricalLight,
  divergingColors,
  fiveColorDark,
  fiveColorLight,
  fourColorDark,
  fourColorLight,
  monoColors,
  oneColorDark,
  oneColorLight,
  threeColorDark,
  threeColorLight,
  twoColorDark,
  twoColorLight
} from './data/data-visualization/palettes.js'
import { statusDark, statusExtendedColors, statusLight } from './data/status-indicators/palettes.js'
import PalettesContainer from './palettes-container.js'

const getColors = (
  type: string,
  isMono: boolean,
  isDiverging: boolean,
  colorOptions: ReturnType<typeof getColorOptions>
) => {
  let colors
  if (type === 'sequential' && isMono) {
    colors = monoColors
  } else if (type === 'sequential' && isDiverging) {
    colors = divergingColors
  } else if (type === 'categorical') {
    colors = colorOptions.categorical
  } else if (type === 'alert') {
    colors = colorOptions.alertColor
  } else if (type === 'status') {
    colors = colorOptions.statusColor
  } else if (type === 'status-extended') {
    colors = statusExtendedColors
  }

  return colors
}

const getColorOptions = (isDark: boolean) => {
  return {
    categorical: isDark ? categoricalDark : categoricalLight,
    oneColor: isDark ? oneColorDark : oneColorLight,
    twoColor: isDark ? twoColorDark : twoColorLight,
    threeColor: isDark ? threeColorDark : threeColorLight,
    fourColor: isDark ? fourColorDark : fourColorLight,
    fiveColor: isDark ? fiveColorDark : fiveColorLight,
    alertColor: isDark ? alertDark : alertLight,
    statusColor: isDark ? statusDark : statusLight
  }
}

interface ColorPaletteProps {
  type: string
  isMono?: boolean | null
  isDiverging?: boolean | null
  twoColumn?: boolean | null
  shouldShowControls?: boolean | null
}

const ColorPalette: MdxComponent<ColorPaletteProps> = ({
  type,
  isMono,
  isDiverging,
  twoColumn,
  shouldShowControls = true
}) => {
  // STATES
  const [continuous, setContinuous] = useState(false)
  const [dark, setDark] = useState(false)
  const [groupNumber, setGroupNumber] = useState(1) // used for selected dropdown item

  // DETERMINE LIGHT/DARK
  const colorOptions = getColorOptions(dark)

  const colors = getColors(type, isMono || false, isDiverging || false, colorOptions)

  // SET RENDERED COLORS
  const [colorGroup, setColorGroup] = useState(colorOptions.oneColor) // used to render type === "grouped" colors

  // DROPDOWN STUFF
  const dropdownItems = [
    {
      id: 1,
      label: '1-Color group'
    },
    {
      id: 2,
      label: '2-Color group'
    },
    {
      id: 3,
      label: '3-Color group'
    },
    {
      id: 4,
      label: '4-Color group'
    },
    {
      id: 5,
      label: '5-Color group'
    }
  ]

  const onDropdownChange = useCallback(
    (e) => {
      const id = e.selectedItem ? e.selectedItem.id : e

      // update selected option
      setGroupNumber(id)

      // update colors rendered
      switch (id) {
        case 1:
          setColorGroup(colorOptions.oneColor)
          break
        case 2:
          setColorGroup(colorOptions.twoColor)
          break
        case 3:
          setColorGroup(colorOptions.threeColor)
          break
        case 4:
          setColorGroup(colorOptions.fourColor)
          break
        case 5:
          setColorGroup(colorOptions.fiveColor)
          break
        default:
      }
    },
    [colorOptions]
  )

  // Rerender color group values when theme is toggled
  useEffect(() => {
    onDropdownChange(groupNumber)
  }, [groupNumber, onDropdownChange])

  // SWITCHER STUFF
  const activateFirstSwitcher = () => {
    if (type === 'sequential') {
      setContinuous(false) // for sequential palettes
    } else {
      setDark(false) // for all other palettes
    }
  }

  const activateSecondSwitcher = () => {
    if (type === 'sequential') {
      setContinuous(true) // for sequential palettes
    } else {
      setDark(true) // for all other palettes
    }
  }

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      activateSecondSwitcher()
    }

    if (e.key === 'ArrowLeft') {
      activateFirstSwitcher()
    }
  }

  const switcherOne = type === 'sequential' ? 'Discrete' : 'Light'
  const switcherTwo = type === 'sequential' ? 'Continuous' : 'Dark'

  return (
    <Grid condensed>
      <Column sm={4} md={8} lg={12}>
        <div className={withPrefix('color-palette-wrapper')}>
          {shouldShowControls && (
            <div
              className={clsx('palette-controls', {
                'group-controls': type === 'grouped',
                'sequential-controls': type === 'sequential',
                'dark-controls': dark
              })}
            >
              <Grid condensed>
                <Column sm={2} md={4} lg={4}>
                  <ContentSwitcher
                    onChange={handleKeyboard}
                    className={'palette-switcher'}
                    selectionMode="automatic"
                    selectedIndex={0}
                  >
                    <Switch text={switcherOne} onClick={activateFirstSwitcher} />
                    <Switch text={switcherTwo} onClick={activateSecondSwitcher} />
                  </ContentSwitcher>
                </Column>
                {type === 'grouped' && (
                  <Column sm={2} md={4} lg={4}>
                    <Dropdown
                      label="Color group selection"
                      id="color-group-dropdown"
                      size="lg"
                      items={dropdownItems}
                      onChange={onDropdownChange}
                      selectedItem={dropdownItems[groupNumber - 1]}
                      initialSelectedItem={dropdownItems[0]}
                    />
                  </Column>
                )}
              </Grid>
            </div>
          )}

          {type === 'grouped' && (
            <PalettesContainer dark={dark}>
              {colorGroup.map((i, index) => (
                <div className={'group-container'} key={index}>
                  <div className={'group-option'}>Option {index + 1}</div>
                  {i.map((j, jIndex) => (
                    <ColorPaletteColor
                      key={`${type}-${j.name}-${index}-${jIndex}`}
                      index={jIndex}
                      lightText={j.light}
                      hex={j.hex}
                      name={j.name}
                    />
                  ))}
                </div>
              ))}
            </PalettesContainer>
          )}

          {(type === 'categorical' || type === 'alert' || type === 'status') && (
            <PalettesContainer dark={dark} twoColumn={twoColumn}>
              {colors?.map((i, index) => {
                const name = 'name' in i ? i.name : ''
                const hex = 'hex' in i ? i.hex : ''
                const light = 'light' in i ? i.light : false
                return (
                  <ColorPaletteColor
                    key={`${type}-${name}-${index}`}
                    isNumbered
                    index={index}
                    lightText={light}
                    hex={hex}
                    name={name}
                  />
                )
              })}
            </PalettesContainer>
          )}

          {type === 'sequential' && (
            <div className={'sequential-container'}>
              {colors?.map((i, index) => {
                const name = 'name' in i ? i.name : ''
                const color = 'color' in i ? i.color : ''
                return (
                  <PalettesContainer key={`${name}-${index}`} color={color} continuous={continuous}>
                    <div className={'group-option'}>Option {index + 1}</div>
                    {'data' in i &&
                      i.data.map((j, jIndex) => (
                        <ColorPaletteColor
                          key={`${type}-${i.color}-${index}-${jIndex}`}
                          index={jIndex}
                          lightText={j.light}
                          hex={j.hex}
                          name={j.name}
                          isSequential
                          continuous={continuous}
                        />
                      ))}
                  </PalettesContainer>
                )
              })}
            </div>
          )}

          {type === 'status-extended' && (
            <div className={'sequential-container'}>
              {colors?.map((i, index) => {
                const color = 'color' in i ? i.color : ''
                return (
                  <PalettesContainer key={`${color}-${index}`} color={color}>
                    {'data' in i &&
                      i.data.map((j, jIndex) => (
                        <ColorPaletteColor
                          key={`${j.name}-${jIndex}`}
                          index={jIndex}
                          lightText={j.light}
                          hex={j.hex}
                          name={j.name}
                          isSequential
                          continuous={continuous}
                        />
                      ))}
                  </PalettesContainer>
                )
              })}
            </div>
          )}
        </div>
      </Column>
    </Grid>
  )
}

ColorPalette.propTypes = {
  isDiverging: PropTypes.bool,
  isMono: PropTypes.bool,
  shouldShowControls: PropTypes.bool,
  twoColumn: PropTypes.bool,
  type: PropTypes.string.isRequired
}
export { ColorPaletteProps }
export default ColorPalette
