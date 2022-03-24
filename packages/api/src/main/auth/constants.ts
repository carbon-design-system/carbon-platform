/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment, getEnvironment, getRunMode, loadEnvVars, RunMode } from '../runtime'

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
  // Strategy name that passport should use when authenticating (get this from dev team)
  PASSPORT_STRATEGY_NAME,
  // URL of session storage DB
  CARBON_MONGO_DB_URL,
  // DB name for session storage
  CARBON_MONGO_DB_NAME
} = loadEnvVars({
  PASSPORT_STRATEGY_NAME: 'custom',
  CARBON_IBM_ISV_CLIENT_ID: '',
  CARBON_IBM_ISV_CLIENT_SECRET: '',
  CARBON_MONGO_DB_URL: '',
  CARBON_MONGO_DB_NAME: ''
})

const OIDC_DISCOVERY_URL =
  getRunMode() === RunMode.Standard && getEnvironment() === Environment.Production
    ? 'https://login.ibm.com/oidc/endpoint/default/.well-known/openid-configuration'
    : 'https://prepiam.ice.ibmcloud.com/v1.0/endpoint/default/.well-known/openid-configuration'

const OIDC_REDIRECT_URI = (() => {
  if (getRunMode() === RunMode.Dev) {
    return 'https://localhost/api/auth-callback'
  } else if (getEnvironment() === Environment.Test) {
    return 'https://web-app.j73b4w218e4.us-south.codeengine.appdomain.cloud/api/auth-callback'
  }
  return 'https://next.carbondesignsystem.com/api/auth-callback'
})()

export {
  CARBON_IBM_ISV_CLIENT_ID,
  CARBON_IBM_ISV_CLIENT_SECRET,
  CARBON_MONGO_DB_NAME,
  CARBON_MONGO_DB_URL,
  OIDC_DISCOVERY_URL,
  OIDC_REDIRECT_URI,
  PASSPORT_STRATEGY_NAME,
  SESSION_SECRET
}
