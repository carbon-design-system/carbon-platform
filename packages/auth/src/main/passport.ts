/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { config } from 'dotenv'
import { BaseClient, Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport from 'passport'

import devConfig from './config/dev.config'
import prodConfig from './config/prod.config'

config()

interface User {
  name: string
}

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user: User, done) {
  done(null, user)
})

let client: BaseClient

const getPassportInstance = async () => {
  if (!client) {
    const REQUIRED_ENV_VARS = ['CARBON_IBM_VERIFY_CLIENT_ID', 'CARBON_IBM_VERIFY_CLIENT_SECRET']
    REQUIRED_ENV_VARS.forEach((param) => {
      if (!process.env[param]) {
        throw new Error(`${param} must be exported as an environment variable or in the .env file`)
      }
    })

    // TODO: replace env variable check with run-mode package
    const passportConfig = process.env.CARBON_NODE_ENV === 'production' ? prodConfig : devConfig

    const ibmIdIssuer = await Issuer.discover(passportConfig.discovery_url)
    client = new ibmIdIssuer.Client({
      client_id: process.env.CARBON_IBM_VERIFY_CLIENT_ID as string,
      client_secret: process.env.CARBON_IBM_VERIFY_CLIENT_SECRET,
      redirect_uris: [passportConfig.redirect_uri],
      response_types: ['code']
    })
    passport.use(
      new OpenIdStrategy({ client }, (_: any, user: any, done: any) => {
        // TODO: validate the user or potentially create a new user account
        // if it's not an ibm.com addr, potentially redirect to a 'not yet supported' route
        done(null, { name: user.name })
      })
    )
  }
  return passport
}

export default getPassportInstance
