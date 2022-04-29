/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ContentSwitcher, Dropdown, Switch } from '@carbon/react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'

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
} from '@/data/data-visualization/palettes'
import { statusDark, statusExtendedColors, statusLight } from '@/data/status-indicators/palettes.js'

import styles from './color-palette.module.scss'
import ColorPaletteColor from './color-palette-color'
import PalettesContainer from './palettes-container'

const getColors = (type, isMono, isDiverging, colorOptions) => {
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

const getColorOptions = (dark) => {
  return {
    categorical: dark ? categoricalDark : categoricalLight,
    oneColor: dark ? oneColorDark : oneColorLight,
    twoColor: dark ? twoColorDark : twoColorLight,
    threeColor: dark ? threeColorDark : threeColorLight,
    fourColor: dark ? fourColorDark : fourColorLight,
    fiveColor: dark ? fiveColorDark : fiveColorLight,
    alertColor: dark ? alertDark : alertLight,
    statusColor: dark ? statusDark : statusLight
  }
}

const ColorPalette = ({ type, isMono, isDiverging, twoColumn, shouldShowControls = true }) => {
  // STATES
  const [continuous, setContinuous] = useState(false)
  const [dark, setDark] = useState(false)
  const [groupNumber, setGroupNumber] = useState(1) // used for selected dropdown item

  // DETERMINE LIGHT/DARK
  const colorOptions = getColorOptions(dark)

  const colors = getColors(type, isMono, isDiverging, colorOptions)

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

  const handleKeyboard = (e) => {
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
    <div className={styles['color-palette-wrapper']}>
      {shouldShowControls && (
        <div
          className={clsx(styles['palette-controls'], {
            [styles['group-controls']]: type === 'grouped',
            [styles['sequential-controls']]: type === 'sequential',
            [styles['dark-controls']]: dark
          })}
        >
          <ContentSwitcher
            onChange={handleKeyboard}
            className={styles['palette-switcher']}
            selectionMode="automatic"
            selectedIndex={0}
          >
            <Switch text={switcherOne} onClick={activateFirstSwitcher} />
            <Switch text={switcherTwo} onClick={activateSecondSwitcher} />
          </ContentSwitcher>
          {type === 'grouped' && (
            <Dropdown
              label="Color group selection"
              id="color-group-dropdown"
              size="lg"
              items={dropdownItems}
              onChange={onDropdownChange}
              selectedItem={dropdownItems[groupNumber - 1]}
              initialSelectedItem={dropdownItems[0]}
            />
          )}
        </div>
      )}

      {type === 'grouped' && (
        <PalettesContainer dark={dark}>
          {colorGroup.map((i, index) => (
            <div className={styles['group-container']} key={index}>
              <div className={styles['group-option']}>Option {index + 1}</div>
              {i.map((j, jIndex) => (
                <ColorPaletteColor
                  key={`${type}-${j.name}-${index}-${j.index}`}
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
        <PalettesContainer dark={dark} type={type} twoColumn={twoColumn}>
          {colors.map((i, index) => (
            <ColorPaletteColor
              key={`${type}-${i.name}-${i.index}`}
              isNumbered
              index={index}
              lightText={i.light}
              hex={i.hex}
              name={i.name}
            />
          ))}
        </PalettesContainer>
      )}

      {type === 'sequential' && (
        <div className={styles['sequential-container']}>
          {colors.map((i, index) => (
            <PalettesContainer
              key={`${i.name}-${index}`}
              color={i.color}
              index={index}
              continuous={continuous}
            >
              <div className={styles['group-option']}>Option {index + 1}</div>
              {i.data.map((j, jIndex) => (
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
          ))}
        </div>
      )}

      {type === 'status-extended' && (
        <div className={styles['sequential-container']}>
          {colors.map((i, index) => (
            <PalettesContainer key={`${i.color}-${index}`} color={i.color} index={index}>
              {i.data.map((j, jIndex) => (
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
          ))}
        </div>
      )}
    </div>
  )
}

ColorPalette.propTypes = {
  isDiverging: PropTypes.bool,
  isMono: PropTypes.bool,
  shouldShowControls: PropTypes.bool,
  twoColumn: PropTypes.bool,
  type: PropTypes.string
}

export default ColorPalette
