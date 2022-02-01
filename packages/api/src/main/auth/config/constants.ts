/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// we can dismiss generating and storing "strong" session secrets since
// we're only storing session IDs in the cookie which we're matching
// against a database and we're using express-session default genid function
// which uses uid-safe which is criptographically secure
const SESSION_SECRET = 'abc123'

const CARBON_IBM_VERIFY_CLIENT_ID_ENV_VAR = 'CARBON_IBM_VERIFY_CLIENT_ID'
const CARBON_IBM_VERIFY_CLIENT_SECRET_ENV_VAR = 'CARBON_IBM_VERIFY_CLIENT_SECRET'

const PASSPORT_OPEN_ID_REQUIRED_ENV_VARS = [
  CARBON_IBM_VERIFY_CLIENT_ID_ENV_VAR, // client id tied to App registration on SSO provisioner (get this from the dev  team)
  CARBON_IBM_VERIFY_CLIENT_SECRET_ENV_VAR // client secret tied to App registration on SSO provisioner (get this from dev team)
]

const PROD_SESSION_REQUIRED_ENV_VARS = [
  'CARBON_MONGO_DB_URL', // url to remote mongo db instance including basic authentication
  'CARBON_MONGO_DB_NAME' // name of database in remote mongo db instance
]

const IBM_AUTHENTICATION_STRATEGY = 'prepiam.ice.ibmcloud.com'
const CUSTOM_LOCAL_STRATEGY = 'custom'

export {
  CARBON_IBM_VERIFY_CLIENT_ID_ENV_VAR,
  CARBON_IBM_VERIFY_CLIENT_SECRET_ENV_VAR,
  CUSTOM_LOCAL_STRATEGY,
  IBM_AUTHENTICATION_STRATEGY,
  PASSPORT_OPEN_ID_REQUIRED_ENV_VARS,
  PROD_SESSION_REQUIRED_ENV_VARS,
  SESSION_SECRET
}
