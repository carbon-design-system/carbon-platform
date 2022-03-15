/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Link as CarbonLink } from '@carbon/react'
import PropTypes from 'prop-types'

const DemoLinks = ({ links }) => {
  let linkList = '–'
  if (links) {
    linkList = (
      <>
        {links.map((link, i) => (
          <>
            <CarbonLink size="lg" key={i} href={link.url} aria-label={link.name}>
              {link.name}
            </CarbonLink>
            {i < links.length - 1 ? ', ' : ''}
          </>
        ))}
      </>
    )
  }
  return linkList
}

DemoLinks.propTypes = {
  links: PropTypes.array
}

export default DemoLinks
