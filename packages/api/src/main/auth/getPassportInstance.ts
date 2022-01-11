/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseClient, Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport from 'passport'

import { getRunMode, PRODUCTION } from '../run-mode'
import { config as devConfig } from './config/config.dev'
import { config as prodConfig } from './config/config.prod'
import { PASSPORT_REQUIRED_ENV_VARS } from './config/constants'
import { User } from './models/user.model'

let client: BaseClient

/**
 * returns a promise that resolves to a pre-configured passport instance. This
 * instance can be used just like the passport package and doesn't need to be further setup
 *
 * @returns {Promise<passport.PassportStatic>} Promise that resolves to instance of passport object.
 */
export const getPassportInstance = async (): Promise<passport.PassportStatic> => {
  if (!client) {
    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (user: User, done) {
      done(null, user)
    })

    PASSPORT_REQUIRED_ENV_VARS.forEach((param) => {
      if (!process.env[param]) {
        throw new Error(`${param} must be exported as an environment variable or in the .env file`)
      }
    })

    const passportConfig = getRunMode() === PRODUCTION ? prodConfig : devConfig

    const ibmIdIssuer = await Issuer.discover(passportConfig.discovery_url)
    client = new ibmIdIssuer.Client({
      client_id: process.env.CARBON_IBM_VERIFY_CLIENT_ID as string,
      client_secret: process.env.CARBON_IBM_VERIFY_CLIENT_SECRET ?? '',
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
