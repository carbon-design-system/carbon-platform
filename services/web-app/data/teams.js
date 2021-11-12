/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Teams are defined here for now, but in the future we will probably want these stored in our data-
 * base. Team keys are used in the libraries allowlist to specify sponsorship. Team slugs are
 * specified as object keys to ensure uniqueness.
 *
 * TODO: either specify a path to a mark image here, or create a utility function to receive a team
 * slug and return the image to use in each catalog item.
 */
export const teams = {
  carbon: {
    name: 'Carbon'
  },
  'ibm-dotcom': {
    name: 'IBM.com'
  }
}
