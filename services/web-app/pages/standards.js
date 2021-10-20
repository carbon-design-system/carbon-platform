/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect } from "react";

import { LayoutContext } from "@/layouts/layout";
import { NextSeo } from "next-seo";

const navData = [
  {
    path: "/",
    title: "About standards",
  },
];

const Standards = () => {
  const { setNavData } = useContext(LayoutContext);

  const seo = {
    title: "Standards",
  };

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  return (
    <>
      <NextSeo {...seo} />
      Welcome to Standards!
    </>
  );
};

export default Standards;
