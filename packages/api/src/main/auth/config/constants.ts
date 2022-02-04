/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { loadEnvVars } from '../../runtime'

// we can dismiss generating and storing "strong" session secrets since
// we're only storing session IDs in the cookie which we're matching
// against a database and we're using express-session default `genid` function
// which uses uid-safe which is cryptographically secure
const SESSION_SECRET = 'abc123'

const {
  // Client id tied to App registration on SSO provisioner (get this from the dev team)
  CARBON_IBM_ISV_CLIENT_ID,
  // Client secret tied to App registration on SSO provisioner (get this from dev team)
  CARBON_IBM_ISV_CLIENT_SECRET,
  // ISV auth endpoint
  CARBON_IBM_ISV_ENDPOINT,
  // URL of session storage DB
  CARBON_MONGO_DB_URL,
  // DB name for session storage
  CARBON_MONGO_DB_NAME
} = loadEnvVars({
  CARBON_IBM_ISV_ENDPOINT: 'custom',
  CARBON_IBM_ISV_CLIENT_ID: 'none',
  CARBON_IBM_ISV_CLIENT_SECRET: 'none',
  CARBON_MONGO_DB_URL: '',
  CARBON_MONGO_DB_NAME: ''
})

export {
  CARBON_IBM_ISV_CLIENT_ID,
  CARBON_IBM_ISV_CLIENT_SECRET,
  CARBON_IBM_ISV_ENDPOINT,
  CARBON_MONGO_DB_NAME,
  CARBON_MONGO_DB_URL,
  SESSION_SECRET
}
