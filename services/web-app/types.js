/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types'

export const paramsPropTypes = PropTypes.shape({
  asset: PropTypes.string,
  host: PropTypes.oneOf(['github.com', 'github.ibm.com']).isRequired,
  library: PropTypes.string.isRequired,
  org: PropTypes.string.isRequired,
  path: PropTypes.string,
  ref: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  maintainer: PropTypes.string
})

export const libraryContentPropTypes = PropTypes.shape({
  description: PropTypes.string,
  externalDocsUrl: PropTypes.string,
  inherits: PropTypes.string,
  id: PropTypes.string.isRequired,
  license: PropTypes.oneOf(['', 'Apache-2.0', 'MIT']),
  name: PropTypes.string.isRequired,
  package: PropTypes.string,
  noIndex: PropTypes.bool,
  version: PropTypes.string
})

export const assetContentPropTypes = PropTypes.shape({
  description: PropTypes.string,
  externalDocsUrl: PropTypes.string,
  framework: PropTypes.oneOf([
    'angular',
    'react',
    'react-native',
    'vue',
    'web-component',
    'design-only'
  ]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  platform: PropTypes.oneOf(['cross-platform', 'web']),
  noIndex: PropTypes.bool,
  status: PropTypes.oneOf(['draft', 'experimental', 'stable', 'deprecated']),
  thumbnailPath: PropTypes.string,
  thumbnailSvg: PropTypes.string,
  type: PropTypes.oneOf(['element', 'component', 'pattern', 'function', 'layout']),
  demoLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
})

export const assetPropTypes = PropTypes.shape({
  content: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  response: PropTypes.object.isRequired
})

export const libraryPropTypes = PropTypes.shape({
  assets: PropTypes.arrayOf(assetPropTypes).isRequired,
  content: assetContentPropTypes.isRequired,
  params: PropTypes.object.isRequired,
  response: PropTypes.object.isRequired
})

export const designKitPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tool: PropTypes.oneOf(['adobe-ase', 'adobe-xd', 'axure', 'figma', 'invision-freehand', 'sketch']),
  type: PropTypes.oneOf(['elements', 'guidelines', 'ui', 'wireframes']),
  status: PropTypes.oneOf(['draft', 'experimental', 'stable', 'deprecated']),
  url: PropTypes.string.isRequired,
  action: PropTypes.oneOf(['download', 'link']),
  license: PropTypes.oneOf(['apache-2.0', 'ibm-internal', 'mit']),
  noIndex: PropTypes.bool
})

export const secondaryNavDataPropTypes = PropTypes.shape({
  back: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string
  }),
  headings: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      path: PropTypes.string,
      title: PropTypes.string
    })
  ),
  path: PropTypes.string
})
