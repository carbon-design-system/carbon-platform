/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import React from 'react'

import { withPrefix } from '../utils.js'

/**
 * The `<TypeScaleTable>` displays the IBM type scale visually.
 */
const TypeScaleTable = () => (
  <Grid condensed className={withPrefix('type-scale')}>
    <Column sm={4} md={8} lg={8}>
      <table>
        <thead>
          <tr>
            <th>rem</th>
            <th>px</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0.75</td>
            <td>Plex 12</td>
          </tr>
          <tr>
            <td>0.875</td>
            <td>Plex 14</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Plex 16</td>
          </tr>
          <tr>
            <td>1.125</td>
            <td>Plex 18</td>
          </tr>
          <tr>
            <td>1.25</td>
            <td>Plex 20</td>
          </tr>
          <tr>
            <td>1.5</td>
            <td>Plex 24</td>
          </tr>
          <tr>
            <td>1.75</td>
            <td>Plex 28</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Plex 32</td>
          </tr>
          <tr>
            <td>2.25</td>
            <td>Plex 36</td>
          </tr>
          <tr>
            <td>2.625</td>
            <td>Plex 42</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Plex 48</td>
          </tr>
          <tr>
            <td>3.375</td>
            <td>Plex 54</td>
          </tr>
          <tr>
            <td>3.75</td>
            <td>Plex 60</td>
          </tr>
          <tr>
            <td>4.25</td>
            <td>Plex 68</td>
          </tr>
          <tr>
            <td>4.75</td>
            <td>Plex 76</td>
          </tr>
          <tr>
            <td>5.25</td>
            <td>Plex 84</td>
          </tr>
          <tr>
            <td>5.75</td>
            <td>Plex 92</td>
          </tr>
        </tbody>
      </table>
    </Column>
  </Grid>
)

export default TypeScaleTable
