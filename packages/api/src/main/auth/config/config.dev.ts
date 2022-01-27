/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: revisit these values after we make the prod version of the app on the identity provider
export const config = {
  redirect_uri: 'https://localhost/api/auth-callback',
  discovery_url:
    'https://prepiam.ice.ibmcloud.com/v1.0/endpoint/default/.well-known/openid-configuration'
}
