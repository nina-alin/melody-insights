import { GetUserMe } from "@/interface/user/user";
import { useSession } from "next-auth/react";
import ArrowTopRightOnSquareIcon from "../common/icons/arrow-top-right-on-square-icon";
import HoverableLink from "../common/template/hoverable-link";
import Error from "../common/states/error";
import Image from "next/image";
import { useGetCurrentlyPlayingQuery } from "../../pages/api/user.api";
import Loading from "../common/states/loading";

const UserDetails = ({ user }: { user: GetUserMe }) => {
  const session = useSession();

  const { data: playing, isLoading, isError } = useGetCurrentlyPlayingQuery();

  if (!session || !user || !session.data || !session.data.user || isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex h-96 flex-col items-center justify-center text-white">
      <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto flex w-[400px] flex-col items-center rounded-[20px] bg-black bg-clip-border p-4">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
          <div className="absolute flex h-32 w-full justify-center rounded-xl bg-gradient-to-t from-green-500 to-black bg-cover" />
          <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-black">
            <Image
              width={87}
              height={87}
              className="h-full w-full rounded-full"
              src={session.data.user.image}
              alt="avatar"
            />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <h4 className="text-navy-700 text-xl font-bold dark:text-white">
            {user?.display_name}
          </h4>
          <HoverableLink color="gray-400" href={user?.external_urls.spotify}>
            <div className="flex gap-1">
              View profile
              <ArrowTopRightOnSquareIcon />
            </div>
          </HoverableLink>
        </div>
        {playing && (
          <div className="flex items-center gap-1">
            <p>You are now playing: </p>
            <div className="flex items-center gap-1">
              <HoverableLink color="white" href={`/songs/${playing.item.name}`}>
                {playing.item.name}
              </HoverableLink>
              by
              <HoverableLink
                color="white"
                href={`/artists/${playing.item.artists[0].name}`}
              >
                {playing.item.artists[0].name}
              </HoverableLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDetails;
