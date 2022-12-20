/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { H3 as MdxH3 } from '@carbon-platform/mdx-components'
import PropTypes from 'prop-types'

const H3 = ({ children }) => <MdxH3 fullText={String(children)}>{children}</MdxH3>

H3.propTypes = {
  children: PropTypes.node
}

export default H3
