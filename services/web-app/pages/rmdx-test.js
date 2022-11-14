/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { process, RmdxNode } from '@carbon-platform/rmdx'
import React from 'react'

const components = {}

const mdx = `
# first level heading
`

const RmdxTest = () => {
  const ast = process(mdx)

  console.log(JSON.stringify(ast, undefined, 2))

  return <RmdxNode components={components} astNode={ast} />
}

export default RmdxTest
