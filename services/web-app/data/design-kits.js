/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Add an object with the following structure: {host, org, repo, path, ref?} here
 * to have design kits indexed in a carbon.yml inside a github repository appear in the catalog
 */
const designKitSources = []

/**
 * Add a design kit to this object to register and include the design kit. Design kit slugs are
 * specified as object keys to ensure uniqueness. If the design kit has a maintaining team, specify
 * that here using the `id` for that maintaining team.
 */
const designKitAllowList = {
  'carbon-white-sketch': {
    maintainer: 'carbon'
  },
  'carbon-g10-sketch': {
    maintainer: 'carbon'
  },
  'carbon-g90-sketch': {
    maintainer: 'carbon'
  },
  'carbon-g100-sketch': {
    maintainer: 'carbon'
  },
  'ibm-design-language-sketch': {
    maintainer: 'ibm-brand'
  },
  'ibm-icons-16-20-sketch': {
    maintainer: 'ibm-brand'
  },
  'ibm-icons-24-32-sketch': {
    maintainer: 'ibm-brand'
  },
  'ibm-grid-sketch': {
    maintainer: 'ibm-brand'
  },
  'carbon-shell-sketch': {
    maintainer: 'carbon'
  },
  'carbon-white-figma': {
    maintainer: 'carbon'
  },
  'carbon-g10-figma': {
    maintainer: 'carbon'
  },
  'carbon-g90-figma': {
    maintainer: 'carbon'
  },
  'carbon-g100-figma': {
    maintainer: 'carbon'
  },
  'carbon-white-adobe-xd': {
    maintainer: 'carbon'
  },
  'carbon-g10-adobe-xd': {
    maintainer: 'carbon'
  },
  'carbon-g90-adobe-xd': {
    maintainer: 'carbon'
  },
  'carbon-g100-adobe-xd': {
    maintainer: 'carbon'
  },
  'ibm-icons-adobe-xd': {
    maintainer: 'ibm-brand'
  },
  'carbon-g10-axure': {
    maintainer: 'community'
  },
  'carbon-template-axure': {
    maintainer: 'community'
  },
  'data-viz-sketch': {
    maintainer: 'carbon'
  },
  'ibm-color-palettes-ase-clr': {},
  'text-toolbar-sketch': {},
  'carbon-gatsby-theme-sketch': {},
  'image-production-guidelines-sketch': {
    maintainer: 'carbon'
  },
  'carbon-mobile-light-sketch': {},
  'carbon-mobile-dark-sketch': {},
  'ibm-grid-mobile-sketch': {},
  'mobile-patterns-sketch': {},
  'ibm-accessibility-sketch': {
    maintainer: 'ibm-accessibility'
  },
  'ibm-accessibility-figma': {
    maintainer: 'ibm-accessibility'
  },
  'carbon-mid-fi-sketch': {
    maintainer: 'carbon'
  },
  'carbon-wireframe-invision-freehand': {
    maintainer: 'ibm-cloud'
  },
  'ibm-dotcom-white-figma': {
    maintainer: 'ibm-dotcom'
  },
  'ibm-dotcom-g10-figma': {
    maintainer: 'ibm-dotcom'
  },
  'ibm-dotcom-g90-figma': {
    maintainer: 'ibm-dotcom'
  },
  'ibm-dotcom-g100-figma': {
    maintainer: 'ibm-dotcom'
  },
  'ibm-products-g10-figma': {
    maintainer: 'ibm-products'
  },
  'ibm-cloud-light-figma': {
    maintainer: 'ibm-cloud'
  },
  'figma-v11-white-theme': {
    maintainer: 'carbon'
  },
  'figma-v11-gray-10-theme': {
    maintainer: 'carbon'
  },
  'figma-v11-gray-90-theme': {
    maintainer: 'carbon'
  },
  'figma-v11-gray-100-theme': {
    maintainer: 'carbon'
  },
  'ibm-pictograms-figma': {
    maintainer: 'ibm-brand'
  },
  'ibm-icons-figma': {
    maintainer: 'ibm-brand'
  },
  'v11-text-styles-figma': {
    maintainer: 'ibm-brand'
  },
  'color-styles-figma': {
    maintainer: 'ibm-brand'
  },
  'axure-widget-library': {
    maintainer: 'community'
  }
}

/**
 * Design kits with no maintaining team default to `community`.
 */
Object.keys(designKitAllowList).forEach((library) => {
  if (!designKitAllowList[library].maintainer) {
    designKitAllowList[library].maintainer = 'community'
  }
})

export { designKitAllowList, designKitSources }
