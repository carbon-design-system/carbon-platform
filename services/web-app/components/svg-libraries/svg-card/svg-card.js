/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { pascalCase } from 'change-case'
import PropTypes from 'prop-types'
import { useState } from 'react'

import ActionBar from '../action-bar'
import styles from '../svg-library.module.scss'

const SvgCard = ({ icon, containerIsVisible, isLastCard, isPictogram, ...rest }) => {
  const { name, Component, friendlyName, assets } = icon
  const [isActionBarVisible, setIsActionBarVisible] = useState(false)

  let { source } = assets[0]
  const glyphOnly = assets[0].size === 'glyph' && assets.length <= 1

  if (assets.length > 1) {
    source = assets.find(({ size }) => size === 32).source
  }

  return (
    <li
      onMouseEnter={() => {
        setIsActionBarVisible(true)
      }}
      onMouseLeave={() => {
        setIsActionBarVisible(false)
      }}
      className={styles['svg-card']}
    >
      <div className={styles['svg-card-inside']}>
        <span className={styles['trigger-text']}>{friendlyName}</span>
        {containerIsVisible && (
          <>
            <div className={styles['flex-container']}>
              {Component && (
                <Component size={32} {...rest}>
                  <title>{friendlyName}</title>
                </Component>
              )}
              {!Component && <p>Error: no component found for {pascalCase(friendlyName)}</p>}
            </div>
            <ActionBar
              isLastCard={isLastCard}
              name={name}
              source={source}
              friendlyName={friendlyName}
              isActionBarVisible={isActionBarVisible}
              isPictogram={isPictogram}
              setIsActionBarVisible={setIsActionBarVisible}
              glyphOnly={glyphOnly}
            />
          </>
        )}
      </div>
    </li>
  )
}

SvgCard.propTypes = {
  containerIsVisible: PropTypes.bool,
  icon: PropTypes.shape({
    name: PropTypes.string,
    Component: PropTypes.object,
    friendlyName: PropTypes.string,
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        source: PropTypes.string
      })
    )
  }),
  isLastCard: PropTypes.bool,
  isPictogram: PropTypes.bool
}

export default SvgCard
