/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'

import InlineNotification from '@/components/inline-notification'

const UnknownComponent = ({ name }) => {
  return (
    <InlineNotification kind="error">
      <strong>Error: </strong>The <strong>{name} </strong> component is not supported within the
      Carbon Platform.
    </InlineNotification>
  )
}

UnknownComponent.propTypes = {
  /**
   * Name of UnknownComponent.
   */
  name: PropTypes.string
}

export default UnknownComponent
