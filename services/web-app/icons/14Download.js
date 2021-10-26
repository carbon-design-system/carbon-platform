/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Svg14Download(props) {
  return (
    <svg
      width={14}
      height={14}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="M0 13h12v1H0v-1zm11-6l-.705-.705-3.795 3.79V0h-1v10.085l-3.795-3.79L1 7l5 5 5-5z"
          id="14-download_svg__a"
        />
      </defs>
      <use
        fill="currentColor"
        xlinkHref="#14-download_svg__a"
        transform="translate(1)"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default Svg14Download
