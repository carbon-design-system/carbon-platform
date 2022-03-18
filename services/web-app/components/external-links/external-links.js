/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link as CarbonLink } from '@carbon/react'
import PropTypes from 'prop-types'

const ExternalLinks = ({ links = [] }) => {
  const linkList = links.filter((link) => !!link).sort((a, b) => a.name.localeCompare(b.name))

  // en dash
  let allLinks = '\u2014'
  if (linkList.length > 0) {
    allLinks = (
      <>
        {linkList.map((link, i) => (
          <span key={link.url}>
            <CarbonLink size="lg" key={i} href={link.url} aria-label={link.name}>
              {link.name}
            </CarbonLink>
            {i < linkList.length - 1 ? ', ' : ''}
          </span>
        ))}
      </>
    )
  }
  return allLinks
}

ExternalLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

export default ExternalLinks
