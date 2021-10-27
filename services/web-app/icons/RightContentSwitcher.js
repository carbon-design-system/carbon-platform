/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'

function SvgRightContentSwitcher(props) {
  return (
    <svg
      width={16}
      height={14}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#F3F3F3" d="M-991-928H65v2995H-991z" />
        <use
          fill="#FFF"
          xlinkHref="#right-content-switcher_svg__path-1"
          transform="translate(-2 -3)"
        />
      </g>
    </svg>
  )
}

export default SvgRightContentSwitcher
