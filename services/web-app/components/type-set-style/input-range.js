/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React from 'react'

import styles from './typeset-style.module.scss'

const InputRange = ({ step, min, max, value, onChange, id }) => (
  <input
    id={id}
    type="range"
    step={step || 1}
    min={min}
    max={max}
    value={value}
    onChange={onChange}
    style={{ '--track-width': `${((value - min) / (max - min)) * 100}%` }}
    className={styles['cds--input-range']}
  />
)

InputRange.propTypes = {
  // input id
  id: PropTypes.string,
  // input max
  max: PropTypes.number.isRequired,
  // input min
  min: PropTypes.number.isRequired,
  // onChange function
  onChange: PropTypes.func.isRequired,
  // input step
  step: PropTypes.number,
  // input value
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default InputRange
