import { Fragment } from "react";

import { Menu, RadioGroup, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

import GreenishLink from "@/components/common/template/greenish-link";
import SearchBar from "@/components/common/template/search-bar";
import SignOut from "@/components/root-layout/sign-out";
import useMediaQuery from "@/hooks/use-media-query";
import { setRange } from "@/reducer";
import { RootState } from "@/store";

const UserMenu = ({ imageUrl }: { imageUrl: string | undefined }) => {
  const router = useRouter();
  const range = useSelector((state: RootState) => state.globalState.range);
  const dispatch = useDispatch();

  const { pathname } = router;
  const isMd = useMediaQuery("(max-width: 768px)");
  const isLg = useMediaQuery("(max-width: 1024px)");

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
        <div className="absolute left-0 right-0 top-0 z-10 flex h-full origin-top-right flex-col gap-2 rounded-md bg-gray-700 p-5 pt-6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:left-auto md:right-10 md:top-auto md:mt-2 md:h-auto md:w-24 lg:p-2">
          <Menu.Items>
            {isMd ? (
              <div className="self-end text-2xl">
                <Menu.Item>
                  <GiHamburgerMenu />
                </Menu.Item>
              </div>
            ) : null}

            {isLg ? (
              <Menu.Item>
                <SearchBar />
              </Menu.Item>
            ) : null}

            {isMd ? (
              <>
                <Menu.Item>
                  {({ close }) => (
                    <GreenishLink
                      href="/dashboard"
                      selected={pathname === "/dashboard"}
                    >
                      <button onClick={close} type="button">
                        Dashboard
                      </button>
                    </GreenishLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ close }) => (
                    <GreenishLink
                      href="/artists"
                      selected={pathname === "/artists"}
                    >
                      <button onClick={close} type="button">
                        Artists
                      </button>
                    </GreenishLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ close }) => (
                    <GreenishLink
                      href="/songs"
                      selected={pathname === "/songs"}
                    >
                      <button onClick={close} type="button">
                        Songs
                      </button>
                    </GreenishLink>
                  )}
                </Menu.Item>
              </>
            ) : null}

            <Menu.Item>
              <div>
                <RadioGroup value={range}>
                  <RadioGroup.Label>Time Range</RadioGroup.Label>

                  <RadioGroup.Option
                    onClick={() => dispatch(setRange("short_term"))}
                    value="short_term"
                  >
                    {({ checked }) => (
                      <span className={checked ? "bg-blue-200" : ""}>
                        Short Term
                      </span>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option
                    onClick={() => dispatch(setRange("medium_term"))}
                    value="medium_term"
                  >
                    {({ checked }) => (
                      <span className={checked ? "bg-blue-200" : ""}>
                        Medium Term
                      </span>
                    )}
                  </RadioGroup.Option>

                  <RadioGroup.Option
                    onClick={() => dispatch(setRange("long_term"))}
                    value="long_term"
                  >
                    {({ checked }) => (
                      <span className={checked ? "bg-blue-200" : ""}>
                        Long Term
                      </span>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </div>
            </Menu.Item>

            <Menu.Item>
              <SignOut />
            </Menu.Item>
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
