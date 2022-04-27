/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  blue,
  colors as carbonColors,
  cyan,
  gray,
  green,
  magenta,
  purple,
  red,
  teal
} from '@carbon/colors'

const { orange, yellow } = carbonColors

const colors = {
  Blue10: {
    name: 'Blue 10',
    hex: blue[10],
    light: false
  },
  Blue20: {
    name: 'Blue 20',
    hex: blue[20],
    light: false
  },
  Blue30: {
    name: 'Blue 30',
    hex: blue[30],
    light: false
  },
  Blue40: {
    name: 'Blue 40',
    hex: blue[40],
    light: false
  },
  Blue50: {
    name: 'Blue 50',
    hex: blue[50],
    light: false
  },
  Blue60: {
    name: 'Blue 60',
    hex: blue[60],
    light: true
  },
  Blue70: {
    name: 'Blue 70',
    hex: blue[70],
    light: true
  },
  Blue80: {
    name: 'Blue 80',
    hex: blue[80],
    light: true
  },
  Blue90: {
    name: 'Blue 90',
    hex: blue[90],
    light: true
  },
  Blue100: {
    name: 'Blue 100',
    hex: blue[100],
    light: true
  },
  Cyan10: {
    name: 'Cyan 10',
    hex: cyan[10],
    light: false
  },
  Cyan20: {
    name: 'Cyan 20',
    hex: cyan[20],
    light: false
  },
  Cyan30: {
    name: 'Cyan 30',
    hex: cyan[30],
    light: false
  },
  Cyan40: {
    name: 'Cyan 40',
    hex: cyan[40],
    light: false
  },
  Cyan50: {
    name: 'Cyan 50',
    hex: cyan[50],
    light: false
  },
  Cyan60: {
    name: 'Cyan 60',
    hex: cyan[60],
    light: true
  },
  Cyan70: {
    name: 'Cyan 70',
    hex: cyan[70],
    light: true
  },
  Cyan80: {
    name: 'Cyan 80',
    hex: cyan[80],
    light: true
  },
  Cyan90: {
    name: 'Cyan 90',
    hex: cyan[90],
    light: true
  },
  Cyan100: {
    name: 'Cyan 100',
    hex: cyan[100],
    light: true
  },
  Gray50: {
    name: 'Gray 50',
    hex: gray[50],
    light: false
  },
  Gray60: {
    name: 'Gray 60',
    hex: gray[60],
    light: true
  },
  Green30: {
    name: 'Green 30',
    hex: green[30],
    light: false
  },
  Green50: {
    name: 'Green 50',
    hex: green[50],
    light: false
  },
  Green60: {
    name: 'Green 60',
    hex: green[60],
    light: true
  },
  Magenta40: {
    name: 'Magenta 40',
    hex: magenta[40],
    light: false
  },
  Magenta50: {
    name: 'Magenta 50',
    hex: magenta[50],
    light: false
  },
  Magenta60: {
    name: 'Magenta 60',
    hex: magenta[60],
    light: true
  },
  Magenta70: {
    name: 'Magenta 70',
    hex: magenta[70],
    light: true
  },
  Orange10: {
    name: 'Orange 10',
    hex: orange[10],
    light: false
  },
  Orange20: {
    name: 'Orange 20',
    hex: orange[20],
    light: false
  },
  Orange30: {
    name: 'Orange 30',
    hex: orange[30],
    light: false
  },
  Orange40: {
    name: 'Orange 40',
    hex: orange[40],
    light: false
  },
  Orange50: {
    name: 'Orange 50',
    hex: orange[50],
    light: false
  },
  Orange60: {
    name: 'Orange 60',
    hex: orange[60],
    light: true
  },
  Orange70: {
    name: 'Orange 70',
    hex: orange[70],
    light: true
  },
  Orange80: {
    name: 'Orange 80',
    hex: orange[80],
    light: true
  },
  Orange90: {
    name: 'Orange 90',
    hex: orange[90],
    light: true
  },
  Orange100: {
    name: 'Orange 100',
    hex: orange[100],
    light: true
  },
  Purple10: {
    name: 'Purple 10',
    hex: purple[10],
    light: false
  },
  Purple20: {
    name: 'Purple 20',
    hex: purple[20],
    light: false
  },
  Purple30: {
    name: 'Purple 30',
    hex: purple[30],
    light: false
  },
  Purple40: {
    name: 'Purple 40',
    hex: purple[40],
    light: false
  },
  Purple50: {
    name: 'Purple 50',
    hex: purple[50],
    light: false
  },
  Purple60: {
    name: 'Purple 60',
    hex: purple[60],
    light: true
  },
  Purple70: {
    name: 'Purple 70',
    hex: purple[70],
    light: true
  },
  Purple80: {
    name: 'Purple 80',
    hex: purple[80],
    light: true
  },
  Purple90: {
    name: 'Purple 90',
    hex: purple[90],
    light: true
  },
  Purple100: {
    name: 'Purple 100',
    hex: purple[100],
    light: true
  },
  Red10: {
    name: 'Red 10',
    hex: red[10],
    light: false
  },
  Red20: {
    name: 'Red 20',
    hex: red[20],
    light: false
  },
  Red30: {
    name: 'Red 30',
    hex: red[30],
    light: false
  },
  Red40: {
    name: 'Red 40',
    hex: red[40],
    light: false
  },
  Red50: {
    name: 'Red 50',
    hex: red[50],
    light: false
  },
  Red60: {
    name: 'Red 60',
    hex: red[60],
    light: true
  },
  Red70: {
    name: 'Red 70',
    hex: red[70],
    light: true
  },
  Red80: {
    name: 'Red 80',
    hex: red[80],
    light: true
  },
  Red90: {
    name: 'Red 90',
    hex: red[90],
    light: true
  },
  Teal10: {
    name: 'Teal 10',
    hex: teal[10],
    light: false
  },
  Teal20: {
    name: 'Teal 20',
    hex: teal[20],
    light: false
  },
  Teal30: {
    name: 'Teal 30',
    hex: teal[30],
    light: false
  },
  Teal40: {
    name: 'Teal 40',
    hex: teal[40],
    light: false
  },
  Teal50: {
    name: 'Teal 50',
    hex: teal[50],
    light: false
  },
  Teal60: {
    name: 'Teal 60',
    hex: teal[60],
    light: true
  },
  Teal70: {
    name: 'Teal 70',
    hex: teal[70],
    light: true
  },
  Teal80: {
    name: 'Teal 80',
    hex: teal[80],
    light: true
  },
  Teal90: {
    name: 'Teal 90',
    hex: teal[90],
    light: true
  },
  Teal100: {
    name: 'Teal 100',
    hex: teal[100],
    light: true
  },
  Yellow10: {
    name: 'Yellow 10',
    hex: yellow[10],
    light: false
  },
  Yellow20: {
    name: 'Yellow 20',
    hex: yellow[20],
    light: false
  },
  Yellow30: {
    name: 'Yellow 30',
    hex: yellow[30],
    light: false
  },
  Yellow40: {
    name: 'Yellow 40',
    hex: yellow[40],
    light: false
  },
  Yellow50: {
    name: 'Yellow 50',
    hex: yellow[50],
    light: false
  },
  Yellow60: {
    name: 'Yellow 60',
    hex: yellow[60],
    light: true
  },
  Yellow70: {
    name: 'Yellow 70',
    hex: yellow[70],
    light: true
  },
  Yellow80: {
    name: 'Yellow 48',
    hex: yellow[80],
    light: true
  },
  Yellow90: {
    name: 'Yellow 90',
    hex: yellow[90],
    light: true
  },
  Yellow100: {
    name: 'Yellow 100',
    hex: yellow[100],
    light: true
  }
}

export default colors
