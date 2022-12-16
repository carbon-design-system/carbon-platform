/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import { MdxComponent } from '../interfaces.js'

interface TrackProps {
  src: string
  srcLang?: string | null
  default?: boolean | null
  kind: 'captions' | 'chapters' | 'descriptions' | 'metadata' | 'subtitles'
  label?: string | null
}

const Track: MdxComponent<TrackProps> = ({
  src,
  srcLang,
  default: isTrackDefault,
  kind,
  label
}) => {
  return (
    <track
      kind={kind}
      default={isTrackDefault ?? false}
      src={src}
      srcLang={srcLang ?? ''}
      label={label ?? ''}
    />
  )
}

Track.propTypes = {
  /**
   * Provide the contents of Title
   */
  default: PropTypes.bool,
  kind: PropTypes.oneOf<TrackProps['kind']>([
    'captions',
    'chapters',
    'descriptions',
    'metadata',
    'subtitles'
  ]).isRequired,
  label: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcLang: PropTypes.string
}

export { TrackProps }
export default Track
