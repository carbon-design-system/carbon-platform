/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

/**
 * The `<Preview>` component is a simple wrapper for an `<iframe />` with
 * styling added to allow it to display responsively within the Platform.
 */
interface PreviewProps {
  title?: string | null
  height?: string | null
  src?: string | null
}

const Preview: MdxComponent<PreviewProps> = ({ title, height, src }) => (
  <iframe
    src={src!}
    loading="lazy"
    title={title!}
    height={height!}
    frameBorder="no"
    className={clsx(withPrefix('preview'))}
    sandbox="allow-forms allow-scripts allow-same-origin"
  />
)

Preview.propTypes = {
  /**
   * Provide the height for the iframe
   */
  height: PropTypes.string,
  /**
   * Provide the url for the iframe
   */
  src: PropTypes.string,
  /**
   * Provide the title for the iframe
   */
  title: PropTypes.string
}

export { PreviewProps }
export default Preview
