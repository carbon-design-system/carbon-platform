/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseClient, Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport from 'passport'

import { enforceEnvVars, getEnvVar } from '../enforce-env-vars'
import { getRunMode, RunMode } from '../run-mode'
import { config as devConfig } from './config/config.dev'
import { config as prodConfig } from './config/config.prod'
import { IBM_AUTHENTICATION_STRATEGY, PASSPORT_REQUIRED_ENV_VARS } from './config/constants'
import { User } from './interfaces'

let client: BaseClient

/**
 * returns a promise that resolves to a pre-configured passport instance. This
 * instance can be used just like the passport package and doesn't need to be further setup
 *
 * @returns {Promise<passport.PassportStatic>} Promise that resolves to instance of passport object.
 */
const getPassportInstance = async (): Promise<passport.PassportStatic> => {
  if (!client) {
    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (user: User, done) {
      done(null, user)
    })

    enforceEnvVars(PASSPORT_REQUIRED_ENV_VARS)

    const passportConfig = getRunMode() === RunMode.Prod ? prodConfig : devConfig

    const ibmIdIssuer = await Issuer.discover(passportConfig.discovery_url)
    client = new ibmIdIssuer.Client({
      client_id: getEnvVar('CARBON_IBM_VERIFY_CLIENT_ID'),
      client_secret: getEnvVar('CARBON_IBM_VERIFY_CLIENT_SECRET'),
      redirect_uris: [passportConfig.redirect_uri],
      response_types: ['code']
    })
    passport.use(
      new OpenIdStrategy({ client }, (_: any, user: any, done: any) => {
        // TODO: validate the user or potentially create a new user account
        // this has more info, right now just saving name & email
        // if it's not an ibm.com addr, potentially redirect to a 'not yet supported' route
        done(null, { name: user.name, email: user.email })
      })
    )
  }
  return passport
}

/**
 * uses IBM Authentication Strategy to authenticate user using passport
 *
 * @returns {any} Passport authenticate middleware function
 */
const authenticateWithPassport = async () => {
  return (await getPassportInstance()).authenticate(IBM_AUTHENTICATION_STRATEGY)
}

export { authenticateWithPassport, getPassportInstance }
