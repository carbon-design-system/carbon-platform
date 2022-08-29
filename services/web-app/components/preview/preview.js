/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Proptypes from 'prop-types'

import styles from './preview.module.scss'

/**
 * The `<Preview>` component is a simple wrapper for an `<iframe />` with
 * styling added to allow it to display responsively within the Platform.
 */
const Preview = ({ title, height, src, style }) => (
  <iframe
    src={src}
    loading="lazy"
    title={title}
    height={height}
    allowtransparency="true"
    allowFullScreen="true"
    frameBorder="no"
    className={styles.preview}
    style={style}
    sandbox="allow-forms allow-scripts allow-same-origin"
  />
)

Preview.propTypes = {
  /** Provide the height for the iframe */
  height: Proptypes.string,
  /** Provide the url for the iframe */
  src: Proptypes.string,
  /** Provide custom inline styles for the iframe */
  style: Proptypes.object,
  /** Provide the title for the iframe */
  title: Proptypes.string
}

export default Preview
