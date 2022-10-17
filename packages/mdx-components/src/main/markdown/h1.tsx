/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Column, Grid } from '@carbon/react'
import { clsx } from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import AutolinkHeader from '../autolink-header/autolink-header.js'
import { MdxComponent } from '../interfaces.js'
import { withPrefix } from '../utils.js'

interface H1Props {
  children: string | string[]
  className?: string | null
  headingClassName?: string | null
  [otherProp: string]: unknown
}

/**
 * For MDX files, steer away from using JSX components
 * for headings in favor of standard markdown syntax.
 *
 * It’s generally considered
 * <a href="https://webaim.org/techniques/semanticstructure/#contentstructure">best practice</a>
 *  to include just one h1 heading per page.
 * This heading signals the title or primary subject matter of the content to your audience.
 * Because the title component generated at the top of each page already uses an h1 heading,
 *  we recommend using h2 tags for section headings within your content.
 *
 *```
 * # This is a heading 1
 * ## This is a heading 2
 * ### This is a heading 3
 * #### This is a heading 4
 * ##### This is a heading 5
 * ###### This is a heading 6
 * ```
 */
const H1: MdxComponent<H1Props> = ({ children, className, headingClassName, ...rest }) => {
  return (
    <Grid className={clsx(withPrefix('h1-container'), className)} {...rest}>
      <Column sm={4} md={8} lg={8}>
        <AutolinkHeader is="h1" className={clsx(withPrefix('h1'), headingClassName)}>
          {children}
        </AutolinkHeader>
      </Column>
    </Grid>
  )
}

H1.propTypes = {
  /**
   * String title for Header
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    PropTypes.string.isRequired
  ]).isRequired,
  /**
   * Specify optional className for container element
   */
  className: PropTypes.string,
  /**
   * Specify optional className for header element
   */
  headingClassName: PropTypes.string
}

export { H1Props }
export default H1
