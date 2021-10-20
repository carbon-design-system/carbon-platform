/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect } from "react";

import { LayoutContext } from "@/layouts/layout";
import { NextSeo } from "next-seo";
import { assetsNavData } from "@/data/nav-data";

const Index = () => {
  const { setNavData } = useContext(LayoutContext);

  const seo = {
    title: "Assets",
  };

  useEffect(() => {
    setNavData(assetsNavData);
  }, [setNavData]);

  return (
    <>
      <NextSeo {...seo} />
      Welcome to Assets!
    </>
  );
};

export default Index;
