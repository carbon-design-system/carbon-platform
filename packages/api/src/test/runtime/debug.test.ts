/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { isDebugEnabled } from '../../main/runtime'

describe('isDebugEnabled', () => {
  it('returns false when the envvar is not set', () => {
    const old = process.env.CARBON_DEBUG
    delete process.env.CARBON_DEBUG

    expect(isDebugEnabled()).toBe(false)

    process.env.CARBON_DEBUG = old
  })

  it('returns true when the envvar is set', () => {
    const old = process.env.CARBON_DEBUG
    process.env.CARBON_DEBUG = 'true'

    expect(isDebugEnabled()).toBe(true)

    process.env.CARBON_DEBUG = old
  })
})
