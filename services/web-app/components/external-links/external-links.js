/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link as CarbonLink } from '@carbon/react'
import PropTypes from 'prop-types'

const ExternalLinks = ({ links = [] }) => {
  const linkList = links.filter((link) => !!link)

  if (linkList.length === 0) {
    // en dash
    return '\u2014'
  }

  linkList.sort((a, b) => a.name > b.name)

  return linkList.map((link, i) => (
    <span key={i}>
      <CarbonLink size="lg" href={link.url} aria-label={link.name}>
        {link.name}
      </CarbonLink>
      {i < linkList.length - 1 ? ', ' : ''}
    </span>
  ))
}

ExternalLinks.propTypes = {
  links: PropTypes.array
}

export default ExternalLinks
