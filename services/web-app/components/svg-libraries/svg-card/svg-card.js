/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable camelcase */
import { pascalCase } from 'change-case'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import ActionBar from '../action-bar'
import styles from '../svg-library.module.scss'

const SvgCard = ({ icon, containerIsVisible, isLastCard, ...rest }) => {
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
      className={styles.svgCard}
    >
      <div className={styles.svgCardInside}>
        <span className={styles.triggerText}>{friendlyName}</span>
        {containerIsVisible && (
          <>
            <div className={styles.flexContainer}>
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
    Component: PropTypes.func,
    friendlyName: PropTypes.string,
    assets: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.number,
        source: PropTypes.string
      })
    )
  }),
  isLastCard: PropTypes.bool
}

export default SvgCard
