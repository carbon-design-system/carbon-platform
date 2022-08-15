/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import InlineError from '@/components/inline-error'

const warningMap = {
  ComponentReplacedException: (componentName) => {
    return `\`${componentName}\` tag identified`
  },
  UnknownComponentException: (componentName) => {
    return 'Unknown Component identified: ' + componentName
  }
}

const createWarningText = ({ warning }) => {
  return warningMap[warning.name](warning.message)
}

// TODO: THIS IS MISSING DESIGN COMPLETION
const WarningsRollup = ({ warnings }) => {
  return (
    <InlineError
      title={`This page has ${warnings.length} ${warnings.length === 1 ? 'error' : 'errors'}`}
      content={
        <ul style={{ listStyle: 'disc' }}>
          {warnings.map((warning, index) => (
            <li key={index}>{createWarningText({ warning })}</li>
          ))}
        </ul>
      }
    />
  )
}

export default WarningsRollup
