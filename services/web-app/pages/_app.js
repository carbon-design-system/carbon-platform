/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "@/styles/styles.scss";

import { DefaultSeo } from "next-seo";
import Layout from "@/layouts/default";
import defaultSeo from "@/config/seo.json";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <DefaultSeo {...defaultSeo} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
