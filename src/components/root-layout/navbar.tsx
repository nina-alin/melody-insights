import { useRouter } from "next/router";

import SpotifyLogo from "@/components/common/icons/spotify-logo";
import Loading from "@/components/common/states/loading";
import UserMenu from "@/components/root-layout/user-menu";
import { useGetUserQuery } from "@/pages/api/user.api";

import GreenishLink from "../common/template/greenish-link";
import SearchBar from "../common/template/search-bar";

const NavBar = () => {
  const { data: user, isLoading } = useGetUserQuery({});
  const router = useRouter();
  const { pathname } = router;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav className="flex h-20 items-center bg-black p-2 px-5 font-extrabold text-white lg:px-12">
      <div className="flex grow items-center gap-32">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => router.push("/dashboard")}
        >
          <div>
            <SpotifyLogo />
          </div>

          <div className="text-2xl font-extrabold">Spotify Enhanced ✨</div>
        </div>

        <div className="hidden xl:block">
          <SearchBar />
        </div>
      </div>

      <div className="grow">
        <ul className="hidden justify-center gap-14 text-xl md:flex">
          <li>
            <GreenishLink
              href="/dashboard"
              selected={pathname === "/dashboard"}
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
          {user ? (
            <UserMenu
              imageUrl={(user.images && user.images[0].url) ?? undefined}
            />
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
