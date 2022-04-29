/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import GlossaryList from './glossary-list'
import GlossaryNav from './glossary-nav'

const Glossary = () => {
  const glossary = require('@/data/glossary')
  return (
    <div className="glossary">
      <GlossaryNav />
      <div className="cds--row">
        <div className="cds--col-lg-7">
          <GlossaryList glossary={glossary} />
        </div>
        <div className="cds--col-lg-1" />
      </div>
    </div>
  )
}

export default Glossary
