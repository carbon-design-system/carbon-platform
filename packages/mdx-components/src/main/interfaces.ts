/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Validator } from 'prop-types'
import { ReactElement, ReactPortal } from 'react'

interface MdxComponent<P> {
  (props: P): JSX.Element | null
  propTypes: { [prop in keyof P]: Validator<P[prop]> }
  defaultProps?: { [prop in keyof P]?: P[prop] }
  displayName?: string
}

type NonScalarNode = ReactElement | ReactPortal | Array<ReactElement | ReactPortal>

export { MdxComponent, NonScalarNode }
