/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'

import GlossaryList from './glossary-list'
import GlossaryNav from './glossary-nav'

const Glossary = () => {
  const glossary = require('@/data/glossary')
  return (
    <Grid>
      <Column sm={4} md={6} lg={7}>
        <div className="glossary">
          <GlossaryNav />
          <GlossaryList glossary={glossary} />
        </div>
      </Column>
    </Grid>
  )
}

export default Glossary
