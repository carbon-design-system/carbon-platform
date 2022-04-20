/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import colors from '@/data/colors'

export const statusLight = [
  colors.Red60,
  colors.Green60,
  colors.Orange50,
  colors.Blue60,
  colors.Yellow30,
  colors.Purple60,
  colors.Gray60
]

export const statusDark = [
  colors.Red50,
  colors.Green50,
  colors.Orange40,
  colors.Blue50,
  colors.Yellow30,
  colors.Purple50,
  colors.Gray50
]

const statusExtendedOne = [
  colors.Yellow10,
  colors.Yellow20,
  colors.Yellow30,
  colors.Yellow40,
  colors.Yellow50,
  colors.Yellow60,
  colors.Yellow70,
  colors.Yellow80,
  colors.Yellow90,
  colors.Yellow100
]

const statusExtendedTwo = [
  colors.Orange10,
  colors.Orange20,
  colors.Orange30,
  colors.Orange40,
  colors.Orange50,
  colors.Orange60,
  colors.Orange70,
  colors.Orange80,
  colors.Orange90,
  colors.Orange100
]

export const statusExtendedColors = [
  {
    color: 'red',
    data: statusExtendedOne
  },
  {
    color: 'teal',
    data: statusExtendedTwo
  }
]
