/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "next/link";
import { forwardRef } from "react";

const NextLink = forwardRef(function NextLink(
  { children, className, href, to, ...rest },
  ref
) {
  return (
    <Link href={href || to}>
      <a className={className} {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});

export default NextLink;
``;
