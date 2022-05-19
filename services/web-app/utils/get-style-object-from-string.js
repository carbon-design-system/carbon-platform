/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { camelCase } from 'change-case'
const getStyleObjectFromString = (str) => {
  // remove starting style=" and ending "
  const stringStyle = str.slice(7, -1)
  const style = {}
  stringStyle.split(';').forEach((property) => {
    const [key, value] = property.split(':')
    if (!key || !value) return

    const formattedProperty = camelCase(key.trim())
    style[formattedProperty] = value.trim()
  })

  return style
}

export default getStyleObjectFromString
