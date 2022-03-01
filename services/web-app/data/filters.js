/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { framework } from '@/data/framework'
import { platform } from '@/data/platform'
import { status } from '@/data/status'
import { tagsForCollection, tagsForType } from '@/data/tags'
import { teams } from '@/data/teams'

export const getFilters = (initialFilter = {}) => {
  const firstFilters = {
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
    }
  }

  const lastFilters = {
    platform: {
      name: 'Platform',
      values: platform
    }
  }

  let tagFilters = {}
  const { collection, type } = initialFilter

  if (type && tagsForType[type]) {
    tagFilters = {
      tags: {
        name: 'Tags',
        values: tagsForType[type]
      }
    }
  } else if (collection && tagsForCollection[collection]) {
    tagFilters = {
      tags: {
        name: 'Tags',
        values: tagsForCollection[collection]
      }
    }
  }

  return { ...firstFilters, ...tagFilters, ...lastFilters }
}
