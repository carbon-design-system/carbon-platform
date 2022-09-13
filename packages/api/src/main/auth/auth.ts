/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BaseClient, Issuer, Strategy as OpenIdStrategy } from 'openid-client'
import passport, { PassportStatic } from 'passport'

import { RunMode, Runtime } from '../runtime/index.js'
import { AuthStrategy, getAuthStrategyFromString } from './auth-strategy.js'
import {
  CARBON_IBM_ISV_CLIENT_ID,
  CARBON_IBM_ISV_CLIENT_SECRET,
  OIDC_DISCOVERY_URL,
  OIDC_REDIRECT_URI,
  PASSPORT_STRATEGY_NAME
} from './constants.js'
import { User } from './interfaces.js'
import { localAuthStrategy } from './strategies/local-auth-strategy.js'
import { openIdAuthStrategy } from './strategies/open-id-strategy.js'

interface AuthConfig {
  runtime?: Runtime
}

class Auth {
  private static isInitialized = false
  private runtime: Runtime

  constructor(config?: AuthConfig) {
    this.runtime = config?.runtime || new Runtime()
  }

  private async loadAuthStrategies(): Promise<void> {
    if (Auth.isInitialized) {
      return
    }

    // Standard mode-only strategies
    if (this.runtime.runMode === RunMode.Standard) {
      passport.use(AuthStrategy.ibmIdProd, await this.createOpenIDStrategy())
    }

    // Strategies that can be used regardless of run mode
    passport.use(AuthStrategy.local, await this.createLocalAuthStrategy())
  }

  private registerSerializers() {
    passport.serializeUser(function (user, done) {
      done(null, user)
    })

    passport.deserializeUser(function (user: User, done) {
      done(null, user)
    })
  }

  /**
   * Creates and returns an OpenId passport strategy configured with IBM Verify
   *
   * @returns {Promise<OpenIdStrategy<unknown, BaseClient>} promise that resolves to
   * OpenID passport strategy
   */
  private async createOpenIDStrategy(): Promise<OpenIdStrategy<unknown, BaseClient>> {
    const ibmIdIssuer = await Issuer.discover(OIDC_DISCOVERY_URL)
    const client = new ibmIdIssuer.Client({
      client_id: CARBON_IBM_ISV_CLIENT_ID,
      client_secret: CARBON_IBM_ISV_CLIENT_SECRET,
      redirect_uris: [OIDC_REDIRECT_URI],
      response_types: ['code']
    })
    return new OpenIdStrategy({ client }, openIdAuthStrategy)
  }

  /**
   * Creates and returns a custom local passport strategy
   *
   * @returns {Promise<passport.Strategy>} promise that resolves to custom passport strategy
   */
  private async createLocalAuthStrategy(): Promise<passport.Strategy> {
    const { Strategy: CustomStrategy } = (await import('passport-custom')).default
    return new CustomStrategy(localAuthStrategy)
  }

  /**
   * Uses Passport to authenticate the user against the specified auth strategy. If an auth strategy
   * is not provided, one will be obtained based on the PASSPORT_STRATEGY_NAME environment variable.
   *
   * @param authStrategy The pre-registered passport strategy to use for the authenticate.
   * @returns Passport authenticate middleware function
   */
  public async authenticate(authStrategy?: AuthStrategy) {
    if (!authStrategy) {
      authStrategy = getAuthStrategyFromString(PASSPORT_STRATEGY_NAME)
    }

    return (await this.getPassport()).authenticate(authStrategy)
  }

  /**
   * returns a promise that resolves to a pre-configured passport instance. This
   * instance can be used just like the passport package and doesn't need to be further setup
   *
   * @returns {Promise<passport.PassportStatic>} Promise that resolves to instance of passport
   * object.
   */
  public async getPassport(): Promise<PassportStatic> {
    if (!Auth.isInitialized) {
      this.registerSerializers()
      await this.loadAuthStrategies()

      Auth.isInitialized = true
    }

    return passport
  }
}

export { Auth, AuthStrategy }
