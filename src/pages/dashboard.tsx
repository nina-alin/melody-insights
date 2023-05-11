import { NextPage } from "next";
import {
  useGetRecentlyPlayedQuery,
  useGetUserQuery,
  useGetUserTopQuery,
} from "./api/user.api";
import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import { useState } from "react";
import { useSelector } from "react-redux";
import TrackCard from "../components/dashboard/track-card";
import ArrowLeftIcon from "../components/common/icons/arrow-left-icon";
import ArrowRightIcon from "../components/common/icons/arrow-right-icon";
import { EllipsisHorizontalIcon } from "../components/common/icons/ellipsis-horizontal-icon";
import ArtistOrTrack from "@/components/dashboard/artist-or-track";
import TopGenres from "@/components/dashboard/top-genres";
import MostPopularArtists from "@/components/dashboard/most-popular-artists";
import useSplitIntoTwoColumns from "@/hooks/use-split-columns";
import useSplitColumns from "@/hooks/use-split-columns";
import SectionTitle from "@/components/common/template/section-title";
import { RootState } from "@/store";
const Dashboard: NextPage = () => {
  const range = useSelector((state: RootState) => state.globalState.range);

  const [page, setPage] = useState(0);

  const { data: user, isLoading, isError } = useGetUserQuery();

  const {
    data: topArtists,
    isLoading: isLoadingTopArtists,
    isError: isErrorTopArtists,
  } = useGetUserTopQuery({
    type: "artists",
    time_range: range,
    offset: 0,
    limit: 8,
  });

  const {
    data: topTracks,
    isLoading: isLoadingTracks,
    isError: isErrorTracks,
  } = useGetUserTopQuery({
    type: "tracks",
    time_range: range,
    offset: page,
    limit: 10,
  });

  const {
    data: recentlyPlayed,
    isLoading: isLoadingRecentlyPlayed,
    isError: isErrorRecentlyPlayed,
  } = useGetRecentlyPlayedQuery(
    { limit: 8 },
    {
      pollingInterval: 60000,
    }
  );

  const columnsArtists = useSplitIntoTwoColumns(
    topArtists?.items as SpotifyApi.ArtistObjectFull[]
  );
  const columnsRecentlyPlayed = useSplitColumns(
    recentlyPlayed?.items as SpotifyApi.PlayHistoryObject[]
  );

  if (isError || isErrorTopArtists || isErrorTracks || isErrorRecentlyPlayed)
    return <Error />;

  if (
    !user ||
    !topArtists ||
    !topTracks ||
    isLoading ||
    isLoadingTopArtists ||
    isLoadingTracks ||
    !recentlyPlayed ||
    isLoadingRecentlyPlayed
  )
    return <Loading />;

  return (
    <div className="flex flex-col gap-16 px-12 md:grid md:grid-cols-2">
      <div className="col-span-2 flex h-3/4 flex-wrap items-center justify-between pt-8">
        {page > 0 && (
          <div className="rounded-full bg-black p-3 hover:cursor-pointer">
            <ArrowLeftIcon onClick={() => setPage(page - 10)} />
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          {topTracks.items.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track as SpotifyApi.TrackObjectFull}
            />
          ))}
        </div>
        {page < 40 && (
          <div className="rounded-full bg-black p-3 hover:cursor-pointer">
            <ArrowRightIcon onClick={() => setPage(page + 10)} />
          </div>
        )}
      </div>
      <div className="flex h-2/4 flex-col gap-7">
        <div className="flex w-full items-center justify-between">
          <SectionTitle>Top Artists</SectionTitle>
          <EllipsisHorizontalIcon />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap">
          {columnsArtists.map((column, columnIndex) => (
            <div key={columnIndex} className="flex w-full flex-col gap-5">
              {column.map((artist) => (
                <ArtistOrTrack
                  key={artist.id}
                  title={artist.name}
                  image={artist.images[0].url}
                  subtitle={artist.genres.join(", ")}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-2/4 flex-col gap-7">
        <div className="flex w-full items-center justify-between">
          <SectionTitle>Recently Played</SectionTitle>
          <EllipsisHorizontalIcon />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap">
          {columnsRecentlyPlayed.map((column, columnIndex) => (
            <div key={columnIndex} className="flex w-full flex-col gap-5">
              {column.map((track) => (
                <ArtistOrTrack
                  image={track.track.album?.images[0].url}
                  title={track.track.name}
                  subtitle={track.track.artists
                    ?.map((artist) => artist.name)
                    .join(", ")}
                  key={track.track.id}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-3/5">
        <TopGenres />
      </div>
      <MostPopularArtists />
    </div>
  );
};

export default Dashboard;
