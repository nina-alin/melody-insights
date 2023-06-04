import { useGetArtistRelatedArtistsQuery } from "@/pages/api/artist.spotify.api";
import Loading from "../common/states/loading";
import NotAvailableYet from "../common/states/not-available-yet";
import ArtistOrTrack from "../common/template/artist-or-track";
import SectionTitle from "../common/template/section-title";
import Subtitles from "../common/template/subtitles";

const ArtistsRelated = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetArtistRelatedArtistsQuery(id);

  if (isError) {
    return <NotAvailableYet />;
  }
  if (isLoading || !data) {
    return <Loading />;
  }

  if (data.artists.length === 0) return <></>;

  return (
    <section className="col-span-3 flex flex-col gap-8 self-baseline">
      <SectionTitle>Similar artists</SectionTitle>
      <div className={"grid grid-cols-1 gap-5 md:grid-cols-2"}>
        {data.artists.map((artist) => (
          <ArtistOrTrack
            key={artist.id}
            titles={{
              title: artist.name,
              hrefTitle: `/artists/${artist.name}?id=${artist.id}`,
              subtitle: <Subtitles items={artist.genres} baseUrl="/genres" />,
            }}
            popularity={artist.popularity}
            urls={{
              imageUrl: artist.images[0]?.url,
              spotifyUrl: artist.external_urls.spotify,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtistsRelated;
