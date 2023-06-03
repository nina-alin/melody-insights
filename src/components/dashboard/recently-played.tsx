import React from "react";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import SectionTitle from "@/components/common/template/section-title";
import ArtistOrTrack from "@/components/common/template/artist-or-track";
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
                titles={{
                  title: track.track.name,
                  subtitle: track.track.artists
                    ?.map((artist) => ({ id: artist.id, name: artist.name }))
                    .map((art, index) => (
                      <span key={art.name}>
                        <span className="hover:underline">
                          {/* TODO: do the case with a query param for subtitles component  */}
                          <Link href={`/artists/${art.name}?id=${art.id}`}>
                            {art.name}
                          </Link>
                        </span>

                        {index < track.track.artists.length - 1 && (
                          <span>{",\u00A0"}</span>
                        )}
                      </span>
                    )),
                  hrefTitle: `/songs/${track.track.name}`,
                }}
                urls={{
                  imageUrl: track.track.album?.images[0]?.url,
                  spotifyUrl: track.track.external_urls.spotify,
                  playUrl: track.track.preview_url,
                }}
                key={uuidv4()}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
