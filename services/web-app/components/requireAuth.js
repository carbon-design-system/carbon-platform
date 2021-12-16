/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const RequireAuth = (props) => {
  if (props.isAuthorized) {
    return { ...props.children }
  } else {
    return <props.fallback />
  }
}

export default RequireAuth
