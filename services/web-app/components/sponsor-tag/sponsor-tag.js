/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Svg24CarbonTag, Svg24IbmDotcomTag } from '@carbon-platform/icons'

import styles from './sponsor-tag.module.scss'

// TODO need a fallback for when no sponsor is specified. Also, use the data object from the
// `/data/teams.js` file
const sponsorMap = {
  carbon: Svg24CarbonTag,
  'ibm-dotcom': Svg24IbmDotcomTag
}

const SponsorTag = ({ className, sponsor }) => {
  const SponsorIcon = sponsorMap[sponsor]

  if (!SponsorIcon) return null

  return (
    <div className={`${className} ${styles.itemTagBorder}`}>
      <SponsorIcon className={styles.itemTagsSponsor} />
    </div>
  )
}

export default SponsorTag
