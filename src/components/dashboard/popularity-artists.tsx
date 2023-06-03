import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetUserTopQuery } from "@/pages/api/user.api";
import useMediaQuery from "@/hooks/use-media-query";
import Loading from "@/components/common/states/loading";
import React from "react";
import SectionTitle from "@/components/common/template/section-title";
import ArtistCard from "@/components/dashboard/artist-card";
import ArtistOrTrack from "@/components/common/template/artist-or-track";
import Link from "next/link";
import Subtitles from "../common/template/subtitles";

const PopularityArtists = () => {
  const range = useSelector((state: RootState) => state.globalState.range);
  const { data, isLoading, isError } = useGetUserTopQuery({
    type: "artists",
    time_range: range,
    limit: 50,
  });

  const smallScreen = useMediaQuery("(max-width: 1535px)");

  if (isError) {
    return <div>Error...</div>;
  }
  if (!data || isLoading) return <Loading />;

  const artists = [...data.items] as SpotifyApi.ArtistObjectFull[];
  const ascSortedArtists = artists.sort((a, b) => {
    if (a.popularity > b.popularity) {
      return -1;
    }
    if (a.popularity < b.popularity) {
      return 1;
    }
    return 0;
  });
  const descSortedArtists = [
    ...ascSortedArtists,
  ].reverse() as SpotifyApi.ArtistObjectFull[];

  const popularArtists = ascSortedArtists.slice(3, 7);
  const unknownArtists = descSortedArtists.slice(0, 5);

  // render the artist card based on the screen size
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
    <div className={"flex flex-col gap-8"}>
      <div className="flex flex-col gap-8">
        <SectionTitle>Your Most Popular Favorites Artists</SectionTitle>

        <div className="flex flex-wrap justify-center gap-5">
          {artistCard.map((item) => (
            <ArtistCard
              artist={ascSortedArtists[item.artist]}
              key={`${item.artist} - ${item.rank}`}
              rank={item.rank}
            />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {popularArtists.map((item) => (
            <ArtistOrTrack
              titles={{
                title: item.name,
                hrefTitle: `/artists/${item.name}?id=${item.id}`,
                subtitle: <Subtitles items={item.genres} baseUrl="/genres" />,
              }}
              popularity={item.popularity}
              urls={{
                imageUrl: item.images[0]?.url,
                spotifyUrl: item.external_urls.spotify,
              }}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <SectionTitle>Your Least Popular Favorites Artists</SectionTitle>
        <div className="flex flex-col gap-5">
          {unknownArtists.map((item) => (
            <ArtistOrTrack
              titles={{
                title: item.name,
                hrefTitle: `/artists/${item.name}?id=${item.id}`,
                subtitle: <Subtitles items={item.genres} baseUrl="/genres" />,
              }}
              popularity={item.popularity}
              urls={{
                imageUrl: item.images[0]?.url,
                spotifyUrl: item.external_urls.spotify,
              }}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularityArtists;
