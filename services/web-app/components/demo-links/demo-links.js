/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column } from '@carbon/react'
import PropTypes from 'prop-types'

import CardGroup from '@/components/card-group'
import MdxIcon from '@/components/mdx-icon'
import ResourceCard from '@/components/resource-card'
import { getUrlWithProtocol } from '@/utils/string'

const DemoLinks = ({ links = [] }) => {
  const linkList = links.filter((link) => !!link).sort((a, b) => a.name.localeCompare(b.name))

  let demoLinks
  if (linkList.length > 0) {
    demoLinks = (
      <CardGroup>
        {linkList.map((link, i) => (
          <Column sm={4} md={4} lg={4} key={i}>
            <ResourceCard
              title={link.name}
              href={getUrlWithProtocol(link.url)}
              actionIcon={link.action === 'download' ? 'download' : 'launch'}
            >
              <MdxIcon name={link.type === 'other' ? 'code' : link.type} />
            </ResourceCard>
          </Column>
        ))}
      </CardGroup>
    )
  }
  return demoLinks
}

DemoLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

export default DemoLinks
