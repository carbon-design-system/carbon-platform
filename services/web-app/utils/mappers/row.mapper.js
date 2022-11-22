/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Row } from '@carbon-platform/mdx-components'
import { RmdxNode } from '@carbon-platform/rmdx'
import React from 'react'

/** @type {import('@carbon-platform/rmdx').NodeMapper} */
export const RowMapper = ({ children }) => {
  // TODOASKJOE: dis good?
  return (
    <Row>
      {React.Children.map(children, (child) => (
        <Column {...child.props.astNode.props}>
          {child.props.astNode.children.map((childAstNode, index) => {
            return (
              <RmdxNode key={index} components={child.props.components} astNode={childAstNode} />
            )
          })}
        </Column>
      ))}
    </Row>
  )
}
