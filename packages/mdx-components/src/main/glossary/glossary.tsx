/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Column, Grid } from '@carbon/react'

import GlossaryList from './glossary-list.js'
import GlossaryNav from './glossary-nav.js'
import glossaryData from './data/glossary-data.js'

import { withPrefix } from '../utils.js'

const Glossary = () => {
  return (
    <Grid>
      <Column sm={4} md={6} lg={7}>
        <div className={withPrefix('glossary')}>
          <div>
            <GlossaryNav />
          </div>
          <GlossaryList glossary={glossaryData} />
        </div>
      </Column>
    </Grid>
  )
}

export default Glossary
