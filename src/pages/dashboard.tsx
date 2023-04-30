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
import { useSpring } from "react-spring";
import ArtistCol from "../components/dashboard/artist-col";
import { EllipsisHorizontalIcon } from "../components/common/icons/ellipsis-horizontal-icon";
import TrackCol from "../components/dashboard/track-col";

const Dashboard: NextPage = () => {
  const range = useSelector((state) => state.globalState.range);

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
  } = useGetRecentlyPlayedQuery(8, {
    pollingInterval: 60000,
  });

  const carouselStyle = useSpring({
    transform: `translateX(-${page * 100}%)`,
    from: { transform: `translateX(-${(page - 1) * 100}%)` },
    config: { tension: 280, friction: 60 },
  });

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

  const splitIntoColumns = (items, numCols) => {
    const cols = [...Array(numCols)].map(() => []);
    items.forEach((item, index) => {
      cols[index % numCols].push(item);
    });
    return cols;
  };

  const columnsArtists = topArtists
    ? splitIntoColumns(topArtists.items, 2)
    : [[], []];
  const columnsRecentlyPlayed = recentlyPlayed
    ? splitIntoColumns(recentlyPlayed.items, 2)
    : [[], []];

  return (
    <div className="flex flex-col gap-16 px-12 md:grid md:grid-cols-2">
      <div className="col-span-2 flex h-3/4 flex-wrap items-center justify-between pt-8">
        {page > 0 && (
          <div className="rounded-full bg-black p-3 hover:cursor-pointer">
            <ArrowLeftIcon onClick={() => setPage(page - 10)} />
          </div>
        )}
        <div className="flex gap-3">
          {topTracks.items.map((track, index) => (
            <TrackCard key={track.id} track={track} />
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
          <h5 className="text-2xl font-bold">Top Artists</h5>
          <EllipsisHorizontalIcon />
        </div>
        <div className="flex">
          {columnsArtists.map((column, columnIndex) => (
            <div key={columnIndex} className="flex w-full flex-col gap-5">
              {column.map((artist) => (
                <ArtistCol key={artist.id} artist={artist} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-2/4 flex-col gap-7">
        <div className="flex w-full items-center justify-between">
          <h5 className="text-2xl font-bold">Recently Played</h5>
          <EllipsisHorizontalIcon />
        </div>
        <div className="flex">
          {columnsRecentlyPlayed.map((column, columnIndex) => (
            <div key={columnIndex} className="flex w-full flex-col gap-5">
              {column.map((track) => (
                <TrackCol key={track.id} track={track.track} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Third row with two boxes, half the height */}
      <div className="flex h-3/5 items-center justify-center bg-yellow-500 text-center font-bold text-white">
        Box 4
      </div>
      <div className="flex h-3/5 items-center justify-center bg-yellow-500 text-center font-bold text-white">
        Box 5
      </div>
    </div>
  );
};

export default Dashboard;
