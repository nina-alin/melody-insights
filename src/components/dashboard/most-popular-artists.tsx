import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

import Loading from "@/components/common/states/loading";
import GreenishLink from "@/components/common/template/greenish-link";
import SectionTitle from "@/components/common/template/section-title";
import ArtistCard from "@/components/dashboard/artist-card";
import useMediaQuery from "@/hooks/use-media-query";
import { useGetUserTopQuery } from "@/pages/api/user.api";
import { RootState } from "@/store";
import ArtistOrTrack from "@/components/dashboard/artist-or-track";

const MostPopularArtists = () => {
  const range = useSelector((state: RootState) => state.globalState.range);
  const { data, isLoading, isError } = useGetUserTopQuery({
    type: "artists",
    time_range: range,
    offset: 0,
    limit: 50,
  });

  const smallScreen = useMediaQuery("(max-width: 1535px)");

  if (isError) {
    return <div>Error...</div>;
  }
  if (!data || isLoading) return <Loading />;

  const artists = [...data.items] as SpotifyApi.ArtistObjectFull[];
  const sortedArtists = artists.sort((a, b) => b.popularity - a.popularity);

  const popularArtists = sortedArtists.slice(3, 10);

  const artistCard = [
    {
      artist: smallScreen ? 0 : 1,
      rank: smallScreen ? 1 : 2,
    },
    {
      artist: !smallScreen ? 0 : 1,
      rank: !smallScreen ? 1 : 2,
    },
    {
      artist: 2,
      rank: 3,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <SectionTitle>Your Most Popular Favorites Artists</SectionTitle>

      <div className="flex flex-wrap justify-center gap-5">
        {artistCard.map((item) => (
          <ArtistCard
            artist={sortedArtists[item.artist]}
            key={`${item.artist} - ${item.rank}`}
            rank={item.rank}
          />
        ))}
      </div>

      <div className="flex flex-col gap-5">
        {popularArtists.map((item) => (
          <ArtistOrTrack
            image={item.images[0].url}
            title={item.name}
            subtitle={
              <>
                {item.genres.map((genre, index) => (
                  <React.Fragment key={genre}>
                    <span className="hover:underline">
                      <Link href={`/genres/${genre}`}>{genre}</Link>
                    </span>

                    {index < item.genres.length - 1 && <span>{",\u00A0"}</span>}
                  </React.Fragment>
                ))}
              </>
            }
            hrefTitle={`/artists/${item.name}`}
            popularity={item.popularity}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MostPopularArtists;
