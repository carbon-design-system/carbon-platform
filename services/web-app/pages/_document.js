/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* TODO: use next/script tags (waiting for resolution:
            https://github.com/vercel/next.js/issues/37491) */}
        <script id="ibm-analytics" type="text/javascript">
          {`window._ibmAnalytics = {
              settings: {
                /* Need to double check on this */
                name: 'CARBON_NEXT',

                isSpa: true,

                tealiumProfileName: 'ibm-web-app'
              },
              onLoad: [
                ['ibmStats.pageview', []]
              ]
            };
            window.digitalData = {
              "page": {
                 "pageInfo": {
                    "language": 'en-US',
                    "ibm": {
                       /* siteId: need to double check on this */
                       "siteId": "IBM_" + _ibmAnalytics.settings.name,
                       "country": "US",
                       "industry": "design",
                       "owner": "carbon@us.ibm.com"
                    }
                 },
                 "category": {
                    "primaryCategory": "PC010"
                 }
              }
           };`}
        </script>
        <script
          src="//1.www.s81c.com/common/stats/ibm-common.js"
          type="text/javascript"
          async="async"
        ></script>
      </body>
    </Html>
  )
}
