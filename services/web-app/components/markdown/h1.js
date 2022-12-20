/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { H1 as MdxH1 } from '@carbon-platform/mdx-components'
import PropTypes from 'prop-types'

const H1 = ({ children }) => <MdxH1 fullText={String(children)}>{children}</MdxH1>

H1.propTypes = {
  children: PropTypes.node
}

export default H1
