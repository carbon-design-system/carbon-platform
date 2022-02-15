/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseClient, Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport from 'passport'

import {
  CARBON_IBM_ISV_CLIENT_ID,
  CARBON_IBM_ISV_CLIENT_SECRET,
  OIDC_DISCOVERY_URL,
  OIDC_REDIRECT_URI,
  PASSPORT_STRATEGY_NAME
} from './constants'
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

    const ibmIdIssuer = await Issuer.discover(OIDC_DISCOVERY_URL)
    client = new ibmIdIssuer.Client({
      client_id: CARBON_IBM_ISV_CLIENT_ID,
      client_secret: CARBON_IBM_ISV_CLIENT_SECRET,
      redirect_uris: [OIDC_REDIRECT_URI],
      response_types: ['code']
    })
    passport.use(
      new OpenIdStrategy({ client }, (_: any, user: any, done: any) => {
        // TODO: validate the user or potentially create a new user account when connected to the DB
        done(null, { name: user.name, email: user.email })
      })
    )
  }
  return passport
}

/**
 * Uses Passport to authenticate the user against IBM Security Verify.
 *
 * @returns Passport authenticate middleware function
 */
const authenticateWithPassport = async () => {
  return (await getPassportInstance()).authenticate(PASSPORT_STRATEGY_NAME)
}

export { authenticateWithPassport, getPassportInstance }
