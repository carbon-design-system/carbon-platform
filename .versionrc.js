/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const SECTIONS = {
  features: 'Features 🌟',
  bugFixes: 'Bug Fixes 🐛',
  misc: 'Misc. 🔮',
  tests: 'Tests 🧪'
}

module.exports = {
  types: [
    { type: 'feat', section: SECTIONS.features },
    { type: 'fix', section: SECTIONS.bugFixes },
    { type: 'build', section: SECTIONS.misc },
    { type: 'deps', section: SECTIONS.misc },
    { type: 'refactor', section: SECTIONS.misc },
    { type: 'revert', section: SECTIONS.misc },
    { type: 'test', section: SECTIONS.tests },
    { type: 'ci', hidden: true },
    { type: 'docs', hidden: true },
    { type: 'release', hidden: true },
    { type: 'wip', hidden: true }
  ]
}
