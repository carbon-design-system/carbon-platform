/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Content,
  Header,
  HeaderMenuItem,
  HeaderNavigation,
} from "@carbon/react";

import Link from "next/link";
import { forwardRef } from "react";
import { useRouter } from "next/router";

/**
 * Component to replace HeaderName, because HeaderName defaults an IBM prefix
 * and there's no way to hide it and the `&nbsp;` through a prop or CSS.
 */
const CustomHeaderName = () => (
  <Link href="/">
    <a className="cds--header__name">Carbon Design System</a>
  </Link>
);

/**
 * Component to use in Carbon's UI shell components to work with Next's router.
 */
const NextLink = forwardRef(function NextLink(
  { href, children, className, ...rest },
  ref
) {
  return (
    <Link href={href}>
      <a className={className} {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});

const Default = ({ children }) => {
  const router = useRouter();

  const links = [
    {
      href: "/my-page",
      title: "My page",
    },
  ];

  return (
    <>
      <Header aria-label="Carbon Design System">
        <CustomHeaderName />
        <HeaderNavigation>
          {links.map((link) => (
            <HeaderMenuItem
              key={link.href}
              isCurrentPage={router.pathname.startsWith(link.href)}
              href={link.href}
              element={NextLink}
            >
              {link.title}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>
      </Header>
      <Content>{children}</Content>
    </>
  );
};

export default Default;
