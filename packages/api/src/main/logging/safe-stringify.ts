/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
function safeStringify(arg: unknown): string {
  let result

  try {
    result = JSON.stringify(arg)
  } catch {}

  if (!result) {
    result = String(arg)
  }

  return result
}

export { safeStringify }
