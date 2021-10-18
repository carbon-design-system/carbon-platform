/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MyComponent from "@/components/my-component";
import { NextSeo } from "next-seo";

const MyPage = () => {
  const seo = {
    title: "My page",
  };

  return (
    <>
      <NextSeo {...seo} />
      Welcome to my page!
      <MyComponent />
    </>
  );
};

export default MyPage;
