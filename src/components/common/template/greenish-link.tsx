import React from "react";

import Link from "next/link";

type GreenishLinkProps = {
  href: string;
  selected?: boolean;
  children: React.ReactNode;
};

const GreenishLink = ({ href, selected, children }: GreenishLinkProps) => (
  <div
    className={`hover:text-spotify-primary ${
      selected && "text-spotify-primary"
    }`}
  >
    <Link href={href}>{children}</Link>
  </div>
);

GreenishLink.defaultProps = {
  selected: false,
};

export default GreenishLink;
