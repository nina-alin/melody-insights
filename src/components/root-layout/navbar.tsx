import Image from "next/image";
import { useSession } from "next-auth/react";
import SignOut from "./sign-out";
import SignIn from "./sign-in";
import SpotifyLogo from "../logo/spotify-logo";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "../common/template/search-bar";
import GreenishLink from "../common/template/greenish-link";
import { useRouter } from "next/router";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="flex h-20 items-center bg-black p-2 px-12 font-extrabold text-white">
      <div className="flex grow items-center gap-32">
        <div
          onClick={() => router.push("/")}
          className="flex cursor-pointer items-center gap-2"
        >
          <div>
            <SpotifyLogo />
          </div>
          <div className="text-2xl font-extrabold">Spotify Enhanced ✨</div>
        </div>
        <div className="hidden lg:block">
          <SearchBar />
        </div>
      </div>
      <div className="grow">
        <ul className="hidden justify-center gap-14 text-xl md:flex">
          <li>
            <GreenishLink
              selected={pathname === "/dashboard"}
              href="/dashboard"
            >
              Dashboard
            </GreenishLink>
          </li>
          <li>
            <GreenishLink
              href="/artists"
              selected={pathname.includes("/artists")}
            >
              Artists
            </GreenishLink>
          </li>
          <li>
            <GreenishLink href="/songs" selected={pathname.includes("/songs")}>
              Songs
            </GreenishLink>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <div>
          {session?.user ? (
            <>
              <div className="flex items-center gap-2">
                <button className="hidden overflow-hidden rounded-full md:block">
                  <Image
                    src={session.user.image ?? "/placeholder.png"}
                    alt="User Image"
                    width={42}
                    height={38}
                  />
                </button>
                <GiHamburgerMenu className="text-2xl md:hidden" />
                <SignOut />
              </div>
            </>
          ) : (
            <>
              <SignIn />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
