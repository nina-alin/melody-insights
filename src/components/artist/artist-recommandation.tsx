import { useGetRecommandationsQuery } from "@/pages/api/user.api";
import NotAvailableYet from "../common/states/not-available-yet";
import Loading from "../common/states/loading";
import ArtistOrTrack from "../common/template/artist-or-track";
import SectionTitle from "../common/template/section-title";
import Link from "next/link";

const ArtistRecommandations = ({ id }: { id: string }) => {
  const { data, isLoading, isError, error } = useGetRecommandationsQuery({
    seed_artists: id,
    limit: 10,
  });

  console.log(error);

  if (isError) {
    return <NotAvailableYet />;
  }
  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col gap-8 self-baseline">
      <SectionTitle>Recommandations based on this artist</SectionTitle>
      <div className="flex flex-col gap-5">
        {data.tracks.map((track) => (
          <ArtistOrTrack
            key={track.id}
            urls={{
              imageUrl: track.album.images[0]?.url,
              spotifyUrl: track.external_urls.spotify,
            }}
            titles={{
              title: track.name,
              subtitle: track.artists.map((artist, index) => (
                <span key={artist.name}>
                  <span className="hover:underline">
                    <Link href={`/artists/${artist.name}?id=${artist.id}`}>
                      {artist.name}
                    </Link>
                  </span>
                  {index < track.artists.length - 1 && <span>{",\u00A0"}</span>}
                </span>
              )),
              hrefTitle: `/tracks/${track.name}`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtistRecommandations;
