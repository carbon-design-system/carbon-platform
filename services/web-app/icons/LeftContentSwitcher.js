import * as React from 'react'

function SvgLeftContentSwitcher(props) {
  return (
    <svg
      width={16}
      height={16}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path fill="#F3F3F3" d="M-943-927H113v2995H-943z" />
        <use
          fill="#171717"
          xlinkHref="#left-content-switcher_svg__path-1"
          transform="translate(-2 -2)"
        />
      </g>
    </svg>
  )
}

export default SvgLeftContentSwitcher
