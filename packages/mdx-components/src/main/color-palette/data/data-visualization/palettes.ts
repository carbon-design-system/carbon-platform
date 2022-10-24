/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import colors from '../colors.js'

export const categoricalLight = [
  colors.Purple70,
  colors.Cyan50,
  colors.Teal70,
  colors.Magenta70,
  colors.Red50,
  colors.Red90,
  colors.Green60,
  colors.Blue80,
  colors.Magenta50,
  colors.Yellow50,
  colors.Teal50,
  colors.Cyan90,
  colors.Orange70,
  colors.Purple50
]

export const oneColorLight = [[colors.Purple70], [colors.Blue80], [colors.Cyan50], [colors.Teal70]]

export const twoColorLight = [
  [colors.Purple70, colors.Teal50],
  [colors.Purple60, colors.Red90],
  [colors.Magenta70, colors.Red90],
  [colors.Cyan50, colors.Teal70],
  [colors.Teal50, colors.Blue80]
]

export const threeColorLight = [
  [colors.Purple50, colors.Teal70, colors.Magenta70],
  [colors.Magenta70, colors.Red50, colors.Red90],
  [colors.Purple50, colors.Teal70, colors.Blue80],
  [colors.Magenta50, colors.Cyan50, colors.Purple70],
  [colors.Cyan90, colors.Purple70, colors.Teal50]
]

export const fourColorLight = [
  [colors.Magenta70, colors.Red50, colors.Red90, colors.Purple50],
  [colors.Purple70, colors.Cyan90, colors.Teal50, colors.Magenta50],
  [colors.Teal50, colors.Blue80, colors.Purple50, colors.Magenta70]
]

export const fiveColorLight = [
  [colors.Purple70, colors.Cyan50, colors.Teal70, colors.Magenta70, colors.Red90],
  [colors.Blue80, colors.Teal50, colors.Magenta70, colors.Red90, colors.Purple50]
]

export const categoricalDark = [
  colors.Purple60,
  colors.Cyan40,
  colors.Teal60,
  colors.Magenta40,
  colors.Red50,
  colors.Red10,
  colors.Green30,
  colors.Blue50,
  colors.Magenta60,
  colors.Yellow40,
  colors.Teal40,
  colors.Cyan20,
  colors.Orange60,
  colors.Purple30
]

export const oneColorDark = [[colors.Purple30], [colors.Blue50], [colors.Cyan40], [colors.Teal40]]

export const twoColorDark = [
  [colors.Purple60, colors.Teal40],
  [colors.Purple60, colors.Magenta40],
  [colors.Magenta40, colors.Red10],
  [colors.Blue50, colors.Cyan20],
  [colors.Teal60, colors.Green30]
]

export const threeColorDark = [
  [colors.Purple60, colors.Teal40, colors.Cyan20],
  [colors.Purple60, colors.Magenta40, colors.Red10],
  [colors.Blue50, colors.Teal40, colors.Purple30],
  [colors.Blue50, colors.Green30, colors.Red10],
  [colors.Teal60, colors.Green30, colors.Cyan20]
]

export const fourColorDark = [
  [colors.Purple60, colors.Teal40, colors.Cyan20, colors.Blue50],
  [colors.Blue50, colors.Teal40, colors.Purple30, colors.Red10],
  [colors.Teal60, colors.Red10, colors.Cyan40, colors.Green30]
]

export const fiveColorDark = [
  [colors.Purple60, colors.Teal40, colors.Cyan20, colors.Blue50, colors.Magenta40],
  [colors.Blue50, colors.Teal40, colors.Purple30, colors.Red10, colors.Green30]
]

const monoSequentialOne = [
  colors.Blue10,
  colors.Blue20,
  colors.Blue30,
  colors.Blue40,
  colors.Blue50,
  colors.Blue60,
  colors.Blue70,
  colors.Blue80,
  colors.Blue90,
  colors.Blue100
]

const monoSequentialTwo = [
  colors.Purple10,
  colors.Purple20,
  colors.Purple30,
  colors.Purple40,
  colors.Purple50,
  colors.Purple60,
  colors.Purple70,
  colors.Purple80,
  colors.Purple90,
  colors.Purple100
]

const monoSequentialThree = [
  colors.Cyan10,
  colors.Cyan20,
  colors.Cyan30,
  colors.Cyan40,
  colors.Cyan50,
  colors.Cyan60,
  colors.Cyan70,
  colors.Cyan80,
  colors.Cyan90,
  colors.Cyan100
]

const monoSequentialFour = [
  colors.Teal10,
  colors.Teal20,
  colors.Teal30,
  colors.Teal40,
  colors.Teal50,
  colors.Teal60,
  colors.Teal70,
  colors.Teal80,
  colors.Teal90,
  colors.Teal100
]

const divergingSequentialOne = [
  colors.Red80,
  colors.Red70,
  colors.Red60,
  colors.Red50,
  colors.Red40,
  colors.Red30,
  colors.Red20,
  colors.Red10,
  colors.Cyan10,
  colors.Cyan20,
  colors.Cyan30,
  colors.Cyan40,
  colors.Cyan50,
  colors.Cyan60,
  colors.Cyan70,
  colors.Cyan80
]

const divergingSequentialTwo = [
  colors.Purple80,
  colors.Purple70,
  colors.Purple60,
  colors.Purple50,
  colors.Purple40,
  colors.Purple30,
  colors.Purple20,
  colors.Purple10,
  colors.Teal10,
  colors.Teal20,
  colors.Teal30,
  colors.Teal40,
  colors.Teal50,
  colors.Teal60,
  colors.Teal70,
  colors.Teal80
]

export const monoColors = [
  {
    color: 'blue',
    data: monoSequentialOne
  },
  {
    color: 'purple',
    data: monoSequentialTwo
  },
  {
    color: 'cyan',
    data: monoSequentialThree
  },
  {
    color: 'teal-only',
    data: monoSequentialFour
  }
]

export const divergingColors = [
  {
    color: 'red',
    data: divergingSequentialOne
  },
  {
    color: 'teal',
    data: divergingSequentialTwo
  }
]

export const alertLight = [colors.Red60, colors.Orange40, colors.Yellow30, colors.Green60]

export const alertDark = [colors.Red50, colors.Orange40, colors.Yellow30, colors.Green50]
