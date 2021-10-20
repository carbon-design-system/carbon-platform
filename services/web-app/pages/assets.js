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
    title: "About assets",
  },
  {
    path: "/",
    title: "Libraries",
  },
  {
    title: "Assets",
    items: [
      {
        path: "/",
        title: "Elements",
      },
      {
        path: "/",
        title: "Components",
      },
      {
        path: "/",
        title: "Patterns",
      },
    ],
  },
];

const Assets = () => {
  const { setNavData } = useContext(LayoutContext);

  const seo = {
    title: "Assets",
  };

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  return (
    <>
      <NextSeo {...seo} />
      Welcome to Assets!
    </>
  );
};

export default Assets;
