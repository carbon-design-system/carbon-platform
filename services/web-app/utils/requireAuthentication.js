/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { store } from '@carbon-platform/auth'

const redirectToLogin = (context) => {
  return {
    redirect: {
      destination: `/api/login?next=${context.resolvedUrl}`,
      statusCode: 302
    }
  }
}

export function requireAuthentication(gssp, shouldAuthenticate = () => true) {
  return async (context) => {
    if (!shouldAuthenticate(context.resolvedUrl, context.query)) {
      return await gssp?.(context)
    }
    const sessionCookie = context.req.cookies?.['connect.sid']
    if (sessionCookie) {
      return await store
        .getUserBySessionCookie(sessionCookie)
        .then(async (user) => {
          if (user) {
            const ssp = await gssp?.(context)
            return { ...ssp, props: { ...ssp?.props, user } } // Continue on to call `getServerSideProps` logic
          } else {
            return redirectToLogin(context)
          }
        })
        .catch(() => {
          return redirectToLogin(context)
        })
    }
    return redirectToLogin(context)
  }
}
