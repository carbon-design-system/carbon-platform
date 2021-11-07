/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react'

function Svg12LeftContentSwitcher(props) {
  return (
    <svg
      width={12}
      height={12}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#F3F3F3" d="M-1202-902H110V94h-1312z" />
        <use
          fill="#171717"
          xlinkHref="#12-left-content-switcher_svg__path-1"
          transform="translate(-2 -2)"
        />
      </g>
    </svg>
  )
}

export default Svg12LeftContentSwitcher
