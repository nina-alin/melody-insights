import { useGetUserTopQuery } from "@/pages/api/user.api";
import { useSelector } from "react-redux";
import Loading from "@/components/common/states/loading";
import SectionTitle from "@/components/common/template/section-title";
import Image from "next/image";
import ArtistCard from "@/components/dashboard/artist-card";
import { RootState } from "@/store";

const artistCard = [
  {
    artist: 1,
    rank: 2,
  },
  {
    artist: 0,
    rank: 1,
  },
  {
    artist: 2,
    rank: 3,
  },
];
const MostPopularArtists = () => {
  const range = useSelector((state: RootState) => state.globalState.range);
  const { data, isLoading, isError } = useGetUserTopQuery({
    type: "artists",
    time_range: range,
    offset: 0,
    limit: 50,
  });

  if (isError) return <div>Error...</div>;
  if (!data || isLoading) return <Loading />;

  const artists = [...data.items] as SpotifyApi.ArtistObjectFull[];
  const sortedArtists = artists.sort((a, b) => b.popularity - a.popularity);

  const popularArtists = sortedArtists.slice(3, 10);

  return (
    <div className={"flex flex-col gap-8"}>
      <SectionTitle>Your Most Popular Favorites Artists</SectionTitle>
      <div className="flex flex-wrap justify-center gap-5">
        {artistCard.map((item) => (
          <ArtistCard
            key={`${item.artist} - ${item.rank}`}
            artist={sortedArtists[item.artist]}
            rank={item.rank}
          />
        ))}
      </div>
      <div className="flex flex-col gap-5">
        {popularArtists.map((item) => (
          <div key={item.id} className="flex h-12 items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={item.images[0].url}
                alt="Artist Image"
                width={42}
                height={38}
              />
              <div className="flex flex-col">
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.genres.join(", ")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <p className="text-center font-bold text-white">
                  {item.popularity}
                </p>
                <p className="text-sm text-gray-500">Popularity</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularArtists;
