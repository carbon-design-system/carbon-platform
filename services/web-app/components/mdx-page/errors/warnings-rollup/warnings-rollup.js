/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MdxNotification from '@/components/mdx-notification/index'

import styles from './warnings-rollup.module.scss'

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

const WarningsRollup = ({ warnings }) => {
  return (
    <MdxNotification
      kind="info"
      title="Some content cannot be rendered"
      description="Documentation maintainers can view individual errors below to learn how to display content correctly."
      content={
        <ul style={{ listStyle: 'disc' }}>
          {warnings.map((warning, index) => (
            <li key={index} className={styles['error-link']}>
              <a href={`#mdx-error-${index + 1}`}>{createWarningText({ warning })}</a>
            </li>
          ))}
        </ul>
      }
      collapsible
    />
  )
}

export default WarningsRollup
