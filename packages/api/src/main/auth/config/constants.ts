/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// we can dismiss generating and storing "strong" session secrets since
// we're only storing session IDs in the cookie which we're matching
// against a database and we're using express-session default genid function
// which uses uid-safe which is criptographically secure
const SESSION_SECRET = 'abc123'

const PASSPORT_REQUIRED_ENV_VARS = [
  'CARBON_IBM_VERIFY_CLIENT_ID', // client id tied to App registration on SSO provisioner (get this from the dev  team)
  'CARBON_IBM_VERIFY_CLIENT_SECRET' // client secret tied to App registration on SSO provisioner (get this from dev team)
]

const PROD_SESSION_REQUIRED_ENV_VARS = [
  'CARBON_MONGO_DB_URL', // url to remote mongo db instance including basic authentication
  'CARBON_MONGO_DB_NAME' // name of database in remote mongo db instance
]

export { PASSPORT_REQUIRED_ENV_VARS, PROD_SESSION_REQUIRED_ENV_VARS, SESSION_SECRET }
