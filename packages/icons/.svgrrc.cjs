/*
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path')

module.exports = {
  replaceAttrValues: {
    '#000': 'currentColor'
  },
  typescript: true,
  indexTemplate: (files) => {
    // Modified from https://react-svgr.com/docs/custom-templates/#custom-index-template
    const exportEntries = files.map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
      return `export { default as ${exportName} } from './${basename}.js'`
    })
    return exportEntries.join('\n')
  }
}
