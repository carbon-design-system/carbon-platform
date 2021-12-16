/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RequireAuth from '@/components/requireAuth'
import validUserAuthorizationChecker from '@/utils/auth-checkers/validUserAuthozitazionChecker'
import { getPropsWithAuth } from '@/utils/getPropsWithAuth'

import FourOhFour from '../404'

const ProtectedPageWithSSR = (props) => {
  return (
    <RequireAuth fallback={FourOhFour} isAuthorized={props.isAuthorized}>
      <div>User: {JSON.stringify(props?.user ?? {})}</div>
    </RequireAuth>
  )
}

export const getServerSideProps = getPropsWithAuth(
  validUserAuthorizationChecker,
  async (/* context */) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {}
    }
  }
)

export default ProtectedPageWithSSR
