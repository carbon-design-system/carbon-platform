/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { useRef, useEffect } = require('react')

// see: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
/**
 * Keeps track of last value of the given parameter (object, string, boolean...) to compare against
 *
 * Example usage
 * const count = useState(1)
 * const prevCount = usePrevious(count)
 * function functionThatDoesSomething(){
 *  if(count !== prevCount)
 *    // count has changed
 * }
 * @param {any} value value to keep previous track of
 * @returns {{any}} ref.current Current saved reference value (equivalent to previous value)
 */
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
