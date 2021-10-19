/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextSeo } from "next-seo";
import defaultSeo from "@/config/seo.json";

const Index = () => {
  const seo = {
    title: defaultSeo.title,
    titleTemplate: "%s",
  };

  return (
    <>
      <NextSeo {...seo} />
      Home
    </>
  );
};

export default Index;
