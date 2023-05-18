import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

import SearchBar from "@/components/common/template/search-bar";
import SignOut from "@/components/root-layout/sign-out";
import useMediaQuery from "@/hooks/use-media-query";
import ExitIcon from "@/components/common/icons/exit-icon";
import HomeIcon from "@/components/common/icons/home-icon";
import ArtistIcon from "@/components/common/icons/artist-icon";
import SongIcon from "@/components/common/icons/song-icon";
import NavigationItems from "@/components/root-layout/navigation-items";
import RangeInputs from "@/components/root-layout/range-inputs";

const ranges = [
  { name: "Last 4 Weeks", value: "short_term" },
  { name: "Last 6 Months", value: "medium_term" },
  { name: "All Time", value: "long_term" },
];

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Artists", href: "/artists", icon: ArtistIcon },
  { name: "Songs", href: "/songs", icon: SongIcon },
];

const UserMenu = ({ imageUrl }: { imageUrl: string | undefined }) => {
  const isMd = useMediaQuery("(max-width: 768px)");
  const isXl = useMediaQuery("(max-width: 1280px)");

  return (
    <Menu>
      <Menu.Button>
        <div className="hidden overflow-hidden rounded-full md:block">
          <Image
            alt="User Image"
            height={42}
            src={imageUrl ?? "/placeholder.png"}
            width={42}
          />
        </div>

        <div className="text-2xl md:hidden">
          <GiHamburgerMenu />
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute left-0 right-0 top-0 z-10 flex h-full origin-top-right flex-col gap-2 rounded-md bg-gray-700 p-5 pt-6 font-normal shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:left-auto md:right-10 md:top-auto md:mt-2 md:h-auto md:w-52 lg:p-6">
          <Menu.Items>
            <div className={"flex flex-col gap-5 divide-y divide-white"}>
              {isMd ? (
                <div className="self-end text-2xl">
                  <Menu.Item>
                    <GiHamburgerMenu />
                  </Menu.Item>
                </div>
              ) : null}

              {/* using this variable to prevent the divider to be displayed. display:hidden doesn't hide the divider by default  */}
              {isXl ? (
                <div className={`flex flex-col gap-5 pt-5 md:pt-0`}>
                  <Menu.Item>
                    <SearchBar />
                  </Menu.Item>

                  <div className={"flex flex-col gap-3 md:hidden"}>
                    {navigation.map((item) => (
                      <NavigationItems item={item} key={item.name} />
                    ))}
                  </div>
                </div>
              ) : null}

              <Menu.Item>
                <div className={`flex flex-col space-y-4 ${isXl && "pt-5"}`}>
                  {ranges.map((r) => (
                    <RangeInputs key={r.value} rangeInput={r} />
                  ))}
                </div>
              </Menu.Item>

              <Menu.Item>
                <div className={"ml-0.5 flex w-full items-center gap-3.5 pt-5"}>
                  <ExitIcon />
                  <SignOut />
                </div>
              </Menu.Item>
            </div>
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
