import Link from "next/link";
import React from "react";

interface GreenishLinkProps {
  href: string;
  selected?: boolean;
  children: React.ReactNode;
}

const GreenishLink = ({ href, selected, children }: GreenishLinkProps) => (
  <Link
    className={`hover:text-spotify-primary ${
      selected && "text-spotify-primary"
    }`}
    href={href}
  >
    {children}
  </Link>
);

export default GreenishLink;
