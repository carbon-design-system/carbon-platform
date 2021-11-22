/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { config } from 'dotenv'
import { Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport from 'passport'

config()

passport.serializeUser(function (user, done) {
  console.log('serializeUser: ', user)
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  console.log('deserializeUser: ', user)
  done(null, user)
})

const ibmIdIssuer = await Issuer.discover(
  'https://prepiam.ice.ibmcloud.com/v1.0/endpoint/default/.well-known/openid-configuration'
)

const client = new ibmIdIssuer.Client({
  client_id: process.env.IBM_VERIFY_CLIENT_ID,
  client_secret: process.env.IBM_VERIFY_CLIENT_SECRET,
  redirect_uris: ['https://localhost/api/auth-callback'],
  response_types: ['code']
})

passport.use(
  new OpenIdStrategy({ client }, (tokenset, user, done) => {
    // TODO: validate the user or potentially create a new user account
    // if it's not an ibm.com addr, potentially redirect to a 'not yet supported' route
    done(null, { name: user.name })
  })
)

export default passport
