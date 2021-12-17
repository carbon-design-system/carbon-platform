/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Creates Props object for server-side rendered pages including isAuthorized key.
 * @param {async (GetServerSidePropsContext) => boolean} authChecker - Function that takes on the
 * context and returns a boolean indicating whether user is authorized to view resource or not
 * @param {async (GetServerSidePropsContext) => Object} gssp - Component's own
 * getServerSideProps function
 * @returns {Object} The component's props object, including an isAuthorized key
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
