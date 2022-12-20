/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { H2 as MdxH2 } from '@carbon-platform/mdx-components'
import PropTypes from 'prop-types'

const H2 = ({ children }) => <MdxH2 fullText={String(children)}>{children}</MdxH2>

H2.propTypes = {
  children: PropTypes.node
}

export default H2
