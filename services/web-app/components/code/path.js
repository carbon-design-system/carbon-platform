/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Launch } from '@carbon/react/icons'
import PropTypes from 'prop-types'

import styles from './code.module.scss'

const Path = ({ src, path }) => {
  if (!path) return null
  return (
    <div className={styles['path-container']}>
      <span className={styles.path}>{path}</span>

      {src && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          title="View source"
          className={styles.icon}
          href={src}
          style={{ position: 'relative', zIndex: 200 }}
        >
          <Launch alt="View source" />
        </a>
      )}
    </div>
  )
}

Path.propTypes = {
  /** Provide path */
  path: PropTypes.string,
  /** Provide src link */
  src: PropTypes.string
}

export default Path
