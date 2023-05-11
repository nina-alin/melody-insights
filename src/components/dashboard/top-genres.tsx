import { useGetUserTopQuery } from "@/pages/api/user.api";
import { useSelector } from "react-redux";
import Loading from "@/components/common/states/loading";
import Error from "@/components/common/states/error";
import SectionTitle from "@/components/common/template/section-title";
import { RootState } from "@/store";

type Genre = {
  name: string;
  percentage: number;
};
const TopGenres = () => {
  const range = useSelector((state: RootState) => state.globalState.range);

  const {
    data: topArtists,
    isLoading: isLoadingTopArtists,
    isError: isErrorTopArtists,
  } = useGetUserTopQuery({
    type: "artists",
    time_range: range,
    offset: 0,
    limit: 50,
  });

  if (isErrorTopArtists) return <Error />;
  if (!topArtists || isLoadingTopArtists) return <Loading />;

  const genres = (topArtists.items as SpotifyApi.ArtistObjectFull[]).flatMap(
    (item) => item.genres
  );

  const elementCounts = genres.reduce(
    (acc: Array<{ name: string; percentage: number }>, curr) => {
      const index = acc.findIndex((item: Genre) => item.name === curr);
      if (index === -1) {
        acc.push({ name: curr, percentage: 1 });
      } else {
        acc[index].percentage++;
      }
      return acc;
    },
    []
  );

  elementCounts.sort((a: Genre, b: Genre) => b.percentage - a.percentage);

  const slicedGenres = elementCounts.slice(0, 20);

  return (
    <section>
      <SectionTitle>Most listened genres</SectionTitle>
      <div className="flex flex-col justify-evenly gap-2">
        {slicedGenres.map((item: Genre) => (
          <div key={item.name} className="mb-2">
            <div className="flex items-center">
              <span className="text-sm">{item.name}</span>
              <span className="ml-2 text-xs">
                {Math.round(item.percentage)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopGenres;
