/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from 'react'

let globalIndex = 0
const genId = () => ++globalIndex

export const useId = (label) => {
  // TODO: delete this hook and use react 18 useId instead.
  const [id] = useState(genId())

  return `cp__${label}__${id}`
}
