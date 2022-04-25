/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable camelcase */
import { pascalCase } from 'change-case'
import React, { useState } from 'react'

import ActionBar from '../action-bar'
import { flexContainer, svgCard, svgCardInside, triggerText } from '../svg-library.module.scss'

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
      className={svgCard}
    >
      <div className={svgCardInside}>
        <span className={triggerText}>{friendlyName}</span>
        {containerIsVisible && (
          <>
            <div className={flexContainer}>
              {Component
                ? (
                <Component size={32} {...rest}>
                  <title>{friendlyName}</title>
                </Component>
                  )
                : (
                <p>Error: no component found for {pascalCase(friendlyName)}</p>
                  )}
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

export default SvgCard
