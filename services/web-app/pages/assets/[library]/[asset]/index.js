/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAllAssetPaths, getAssetData } from "@/lib/github";
import { useContext, useEffect } from "react";

import { LayoutContext } from "@/layouts/layout";
import { NextSeo } from "next-seo";
import { assetsNavData } from "@/data/nav-data";
import styles from "@/pages/pages.module.scss";

const Asset = ({ assetData }) => {
  const { setNavData } = useContext(LayoutContext);

  const { name, description } = assetData;

  const seo = {
    title: name,
    description,
  };

  useEffect(() => {
    setNavData(assetsNavData);
  }, [setNavData]);

  return (
    <>
      <NextSeo {...seo} />
      <pre className={styles.data}>{JSON.stringify(assetData, null, 2)}</pre>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const assetData = await getAssetData(params);

  if (!assetData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      assetData,
      params,
    },
  };
};

// TODO update to Incremental Static Regeneration
export const getStaticPaths = async () => {
  const paths = await getAllAssetPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Asset;
