import React from "react";

import Link from "next/link";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import SectionTitle from "@/components/common/template/section-title";
import ArtistOrTrack from "@/components/dashboard/artist-or-track";
import useSplitIntoTwoColumns from "@/hooks/use-split-columns";
import { useGetUserTopQuery } from "@/pages/api/user.api";
import { RootState } from "@/store";

const TopArtists = () => {
  const range = useSelector((state: RootState) => state.globalState.range);

  const {
    data: topArtists,
    isLoading,
    isError,
  } = useGetUserTopQuery({
    type: "artists",
    time_range: range,
    offset: 0,
    limit: 8,
  });

  const columnsArtists = useSplitIntoTwoColumns(
    topArtists?.items as SpotifyApi.ArtistObjectFull[]
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
        <SectionTitle>Top Artists</SectionTitle>
      </div>

      <div className="flex flex-wrap gap-5 lg:flex-nowrap">
        {columnsArtists.map((column) => (
          <div className="flex w-full flex-col gap-5" key={uuidv4()}>
            {column.map((artist) => (
              <ArtistOrTrack
                hrefTitle={`/artists/${artist.name}`}
                image={artist.images[0].url}
                key={artist.id}
                subtitle={artist.genres.map((genre, index) => (
                  <span key={genre}>
                    <span className="hover:underline">
                      <Link href={`/genres/${genre}`}>{genre}</Link>
                    </span>

                    {index < artist.genres.length - 1 && (
                      <span>{",\u00A0"}</span>
                    )}
                  </span>
                ))}
                title={artist.name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
