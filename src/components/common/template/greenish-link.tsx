import Link from "next/link";

interface GreenishLinkProps {
  href: string;
  selected: boolean;
  children: React.ReactNode;
}

const GreenishLink = ({ href, selected, children }: GreenishLinkProps) => (
  <div className={`hover:text-green-500 ${selected && "text-green-500"}`}>
    <Link href={href}>{children}</Link>
  </div>
);

export default GreenishLink;
