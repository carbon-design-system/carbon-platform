/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const dateObj = new Date()
const monthNumber = dateObj.getMonth()
const monthName = monthNames[monthNumber]
const fullYear = dateObj.getFullYear()

export const currentMonth = monthName

export const currentYear = fullYear
