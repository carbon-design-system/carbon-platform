/*
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'

const RequireAuth = ({ children, fallback: Fallback, isAuthorized }) => {
  if (isAuthorized) {
    return children
  } else {
    return <Fallback />
  }
}

RequireAuth.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.func,
  isAuthorized: PropTypes.bool
}

export default RequireAuth
