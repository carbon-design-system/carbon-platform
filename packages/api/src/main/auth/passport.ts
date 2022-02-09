/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs'
import { BaseClient, Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport from 'passport'
import path from 'path'

import { getRunMode, RunMode } from '../runtime'
import { config as devConfig } from './config/config.dev'
import { config as prodConfig } from './config/config.prod'
import {
  CARBON_IBM_ISV_CLIENT_ID,
  CARBON_IBM_ISV_CLIENT_SECRET,
  PASSPORT_STRATEGY_NAME
} from './config/constants'
import { User } from './interfaces'

let passportStrategy: passport.Strategy | undefined

/**
 * Creates and returns an OpenId passport strategy configured with IBM Verify
 *
 * @returns {Promise<OpenIdStrategy<unknown, BaseClient>} promise that resolves to
 * OpenID passport strategy
 */
async function createOpenIDStrategy(): Promise<OpenIdStrategy<unknown, BaseClient>> {
  const passportConfig = getRunMode() === RunMode.Prod ? prodConfig : devConfig

  const ibmIdIssuer = await Issuer.discover(passportConfig.discovery_url)
  const client = new ibmIdIssuer.Client({
    client_id: CARBON_IBM_ISV_CLIENT_ID,
    client_secret: CARBON_IBM_ISV_CLIENT_SECRET,
    redirect_uris: [passportConfig.redirect_uri],
    response_types: ['code']
  })
  return new OpenIdStrategy({ client }, (_: any, user: any, done: any) => {
    // TODO: validate the user or potentially create a new user account
    // this has more info, right now just saving name & email
    // if it's not an ibm.com addr, potentially redirect to a 'not yet supported' route
    done(null, { name: user.name, email: user.email })
  })
}

/**
 * Creates and returns a custom local passport strategy
 *
 * @returns {Promise<passport.Strategy>} promise that resolves to custom passport strategy
 */
async function createCustomStrategy(): Promise<passport.Strategy> {
  const { Strategy: CustomStrategy } = await import('passport-custom')
  return new CustomStrategy(function (_, done) {
    const dir = path.join(process.cwd(), 'mocked-user.json')
    if (!fs.existsSync(dir)) {
      throw new Error('mocked-user.json file could not be found')
    }
    fs.readFile(dir, (err, data) => {
      if (data) {
        const user = JSON.parse(data.toString())
        done(err, user)
      } else {
        done(err, null)
      }
    })
  })
}

/**
 * Determines if an OpenId passport strategy should be used
 * This strategy is used if running on PROD mode or the necessary env variables have been set
 *
 * @returns {boolean} true if should use OpenId strategy
 */
function shouldUseOpenIdStrategy(): boolean {
  const isRunningSecurely = process.env.RUNNING_SECURELY === '1'
  const hasValidOpenIdValues =
    !!PASSPORT_STRATEGY_NAME &&
    PASSPORT_STRATEGY_NAME !== 'custom' &&
    !!CARBON_IBM_ISV_CLIENT_ID &&
    !!CARBON_IBM_ISV_CLIENT_SECRET
  return getRunMode() === RunMode.Prod || (hasValidOpenIdValues && isRunningSecurely)
}

/**
 * returns a promise that resolves to a pre-configured passport instance. This
 * instance can be used just like the passport package and doesn't need to be further setup
 *
 * @returns {Promise<passport.PassportStatic>} Promise that resolves to instance of passport object.
 */
const getPassportInstance = async (): Promise<passport.PassportStatic> => {
  if (!passportStrategy) {
    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (user: User, done) {
      done(null, user)
    })

    if (shouldUseOpenIdStrategy()) {
      passportStrategy = await createOpenIDStrategy()
    } else {
      passportStrategy = await createCustomStrategy()
    }
    passport.use(passportStrategy)
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

// for testing purposes only, this is not exported through the entry file
const __test__ = {
  destroyInstance: () => {
    passportStrategy = undefined
  }
}

export { __test__, authenticateWithPassport, getPassportInstance, shouldUseOpenIdStrategy }
