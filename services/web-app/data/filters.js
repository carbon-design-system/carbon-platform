/*
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { framework } from '@/data/framework'
import { platform } from '@/data/platform'
import { status } from '@/data/status'
import { teams } from '@/data/teams'

export const filters = {
  sponsor: {
    name: 'Sponsor',
    values: teams
  },
  status: {
    name: 'Status',
    values: status
  },
  framework: {
    name: 'Framework',
    values: framework
  },
  platform: {
    name: 'Platform',
    values: platform
  }
}
