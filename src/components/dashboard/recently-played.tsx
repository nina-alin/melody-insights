import React from "react";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import SectionTitle from "@/components/common/template/section-title";
import ArtistOrTrack from "@/components/dashboard/artist-or-track";
import useSplitColumns from "@/hooks/use-split-columns";
import { useGetRecentlyPlayedQuery } from "@/pages/api/user.api";

const RecentlyPlayed = () => {
  const {
    data: recentlyPlayed,
    isLoading,
    isError,
  } = useGetRecentlyPlayedQuery(
    { limit: 8 },
    {
      pollingInterval: 60000,
    }
  );

  const columnsRecentlyPlayed = useSplitColumns(
    recentlyPlayed?.items as SpotifyApi.PlayHistoryObject[]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="flex h-2/4 flex-col gap-7">
      <div className="flex w-full items-center">
        <SectionTitle>Recently Played</SectionTitle>
      </div>

      <div className="flex flex-wrap gap-5 xl:flex-nowrap">
        {columnsRecentlyPlayed.map((column) => (
          <div className="flex w-full flex-col gap-5" key={uuidv4()}>
            {column.map((track) => (
              <ArtistOrTrack
                hrefTitle={`/songs/${track.track.name}`}
                image={track.track.album?.images[0].url}
                key={uuidv4()}
                subtitle={track.track.artists
                  ?.map((artist) => artist.name)
                  .map((name, index) => (
                    <span key={name}>
                      <span className="hover:underline">
                        <Link href={`/artists/${name}`}>{name}</Link>
                      </span>

                      {index < track.track.artists.length - 1 && (
                        <span>{",\u00A0"}</span>
                      )}
                    </span>
                  ))}
                title={track.track.name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
