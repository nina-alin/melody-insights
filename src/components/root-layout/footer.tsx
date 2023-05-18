import Link from "next/link";
import { useRouter } from "next/router";

import GithubIcon from "@/components/common/icons/github-icon";
import TwitterIcon from "@/components/common/icons/twitter-icon";
import GreenishLink from "@/components/common/template/greenish-link";

const Footer = () => {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";

  return (
    <footer className="grid h-fit grid-cols-1 bg-gray-800 p-5 px-12 text-white md:grid-cols-3">
      <ul className="flex items-center gap-5">
        {!isLandingPage && (
          <>
            <li className="font-bold">
              <GreenishLink href="/about" selected={router.asPath === "/about"}>
                About
              </GreenishLink>
            </li>

            <li className="font-bold">
              <GreenishLink
                href="/contact"
                selected={router.asPath === "/contact"}
              >
                Contact
              </GreenishLink>
            </li>
          </>
        )}
      </ul>

      <p className="flex justify-center">
        © {new Date().getFullYear()}, Spotify Enhanced. All rights reserved.
      </p>

      <div className="flex items-center justify-end gap-5">
        <Link href="https://github.com/nina-alin">
          <GithubIcon />
        </Link>

        <Link href="https://twitter.com/karmirariel">
          <TwitterIcon />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
