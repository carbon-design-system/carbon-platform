/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export function getPropsWithAuth(authChecker, gssp) {
  return async (context) => {
    const isAuthorized = await authChecker(context)
    const ssp = await gssp(context)
    return {
      ...ssp,
      props: {
        ...ssp.props,
        isAuthorized,
        user: context.req.user ?? null
      }
    }
  }
}
