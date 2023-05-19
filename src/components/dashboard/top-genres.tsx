import { useSelector } from "react-redux";

import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import SectionTitle from "@/components/common/template/section-title";
import GenresDetails from "@/components/dashboard/genres-details";
import { useGetUserTopQuery } from "@/pages/api/user.api";
import { RootState } from "@/store";

export type Genre = {
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

  const elementCounts = genres.reduce((acc: Array<Genre>, curr) => {
    const index = acc.findIndex((item: Genre) => item.name === curr);
    if (index === -1) {
      acc.push({ name: curr, percentage: 1 });
    } else {
      acc[index].percentage++;
    }
    return acc;
  }, []);

  elementCounts.sort((a: Genre, b: Genre) => b.percentage - a.percentage);

  const slicedGenres = elementCounts.slice(0, 19);

  return (
    <div className="h-3/5">
      <section className="flex flex-col gap-5">
        <SectionTitle>Most listened genres</SectionTitle>

        <div className="flex flex-col justify-evenly gap-2">
          {slicedGenres.map((item: Genre) => (
            <GenresDetails
              genre={item}
              key={`${item.name} - ${item.percentage}`}
              topArtists={topArtists.items as SpotifyApi.ArtistObjectFull[]}
              totalGenres={genres.length}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopGenres;
