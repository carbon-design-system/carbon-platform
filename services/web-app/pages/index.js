/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect } from "react";

import { LayoutContext } from "@/layouts/layout";
import { NextSeo } from "next-seo";
import defaultSeo from "@/config/seo.json";

const navData = [
  {
    path: "/",
    title: "About Carbon",
  },
];

const Index = () => {
  const { setNavData } = useContext(LayoutContext);

  const seo = {
    title: defaultSeo.title,
    titleTemplate: "%s",
  };

  useEffect(() => {
    setNavData(navData);
  }, [setNavData]);

  return (
    <>
      <NextSeo {...seo} />
      Home
    </>
  );
};

export default Index;
