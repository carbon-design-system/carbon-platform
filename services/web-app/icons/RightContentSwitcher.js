import * as React from "react";

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
  );
}

export default SvgRightContentSwitcher;
