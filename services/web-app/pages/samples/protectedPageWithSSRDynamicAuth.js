/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RequireAuth from '@/components/requireAuth'
import FourOhFour from '@/pages/404'
import { getPropsWithAuth } from '@/utils/getPropsWithAuth'
import { retrieveUser } from '@/utils/retrieveUser'

const ProtectedPageWithSSR = (props) => {
  return (
    <RequireAuth fallback={FourOhFour} isAuthorized={props.isAuthorized}>
      <div>User: {JSON.stringify(props?.user ?? {})}</div>
    </RequireAuth>
  )
}

// Goals
/*
- need user to provide an authorization function that returns true or false if the user can/can't
  see the page
- need to provide an isAuthorized prop (in addition to the dev-provided ones in getSSP) so that the
  RequireAuth component has a prop to work with
- authorization function might need a user, but it also might not
*/

// github.com does not need a user    DONE!
// github.ibm.com/internal-stuff needs an ibm user
// github.ibm.com/private-stuff needs a specific ibm user

const authorizationChecker = async (context) => {
  const { query } = context
  if (query.host === 'github.com') {
    return true
  }

  // const thing = getRepoVisibility(query.host, query.repo) <-- later!

  if (query.host === 'github.ibm.com') {
    const user = await retrieveUser(context)
    if (!user) {
      return false
    }
    if (query.repo === 'internal-stuff') {
      return user.email.endsWith('ibm.com')
    }
    if (query.repo === 'private-stuff') {
      return user.email.endsWith('ibm.com') && user.name === 'The User We Need This To Have'
    }
  }

  return false
}

export const getServerSideProps = getPropsWithAuth(authorizationChecker, async (/* context */) => {
  // Your normal `getServerSideProps` code here
  return {
    props: {
      myProp1: 'asdf',
      myProp2: 'asdf'
    }
  }
})

export default ProtectedPageWithSSR
