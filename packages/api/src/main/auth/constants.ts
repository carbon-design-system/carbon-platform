/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Environment, getEnvVar, RunMode, Runtime } from '../runtime/index.js'

const runtime = new Runtime()

// we can dismiss generating and storing "strong" session secrets since
// we're only storing session IDs in the cookie which we're matching
// against a database and we're using express-session default `genid` function
// which uses uid-safe which is cryptographically secure
const SESSION_SECRET = 'abc123'

/**
 * Client id tied to App registration on SSO provisioner (get this from the dev team)
 */
const CARBON_IBM_ISV_CLIENT_ID = getEnvVar('CARBON_IBM_ISV_CLIENT_ID', '', runtime)
/**
 * Client secret tied to App registration on SSO provisioner (get this from dev team)
 */
const CARBON_IBM_ISV_CLIENT_SECRET = getEnvVar('CARBON_IBM_ISV_CLIENT_SECRET', '', runtime)
/**
 * Strategy name that passport should use when authenticating (get this from dev team)
 */
const PASSPORT_STRATEGY_NAME = getEnvVar('PASSPORT_STRATEGY_NAME', 'local', runtime)
/**
 * URL of session storage DB
 */
const CARBON_MONGO_DB_URL = getEnvVar('CARBON_MONGO_DB_URL', '', runtime)
/**
 * DB name for session storage
 */
const CARBON_MONGO_DB_NAME = getEnvVar('CARBON_MONGO_DB_NAME', '', runtime)

const OIDC_DISCOVERY_URL =
  runtime.runMode === RunMode.Standard && runtime.environment === Environment.Production
    ? 'https://login.ibm.com/oidc/endpoint/default/.well-known/openid-configuration'
    : 'https://prepiam.ice.ibmcloud.com/v1.0/endpoint/default/.well-known/openid-configuration'

const OIDC_REDIRECT_URI = (() => {
  if (runtime.runMode === RunMode.Dev) {
    return 'https://localhost:8443/api/auth-callback'
  } else if (runtime.environment === Environment.Test) {
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
