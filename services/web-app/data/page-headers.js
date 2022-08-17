/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { coolGray, teal, warmGray } from '@carbon/colors'
import { ArtTools_01 as ArtTools, Construct, FileBackup } from '@carbon/pictograms-react'

import { assetTypes } from '@/data/asset-types'

export const pageHeaders = {
  ...assetTypes,
  collection: {
    bgColor: warmGray[20],
    icon: Construct
  },
  designKit: {
    bgColor: teal[20],
    icon: ArtTools
  },
  library: {
    bgColor: coolGray[20],
    icon: FileBackup
  }
}
