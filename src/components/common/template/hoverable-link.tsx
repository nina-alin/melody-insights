import Link from "next/link";
import React from "react";

type HoverableLinkProps = {
  children: React.ReactNode;
  href: string;
  color: string;
};

const HoverableLink = ({ children, href, color }: HoverableLinkProps) => (
  <Link href={href} className={`group transition duration-300 text-${color}`}>
    {children}
    <span
      className={`block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full bg-${color}`}
    ></span>
  </Link>
);

export default HoverableLink;
