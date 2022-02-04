/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Link from 'next/link'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const NextLink = forwardRef(function NextLink({ children, className, href, to, ...rest }, ref) {
  return (
    <Link href={href || to}>
      <a className={className} {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  )
})

const requiredPropsCheck = (props, _propName, componentName) => {
  if (!props.href && !props.to) {
    return new Error(`One of 'href' or 'to' is required by '${componentName}' component.`)
  }
}

NextLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: requiredPropsCheck,
  to: requiredPropsCheck
}

export default NextLink
