import Link from "next/link";
import ArtistOrTrack from "../common/template/artist-or-track";
import SectionTitle from "../common/template/section-title";
import NotAvailableYet from "../common/states/not-available-yet";
import { useGetArtistTopTracksQuery } from "@/pages/api/artist.spotify.api";
import Loading from "../common/states/loading";

const ArtistTopTracks = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetArtistTopTracksQuery(id);

  if (isError) {
    <NotAvailableYet />;
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col gap-8 self-baseline">
      <SectionTitle>Top Tracks</SectionTitle>
      <div className="flex flex-col gap-5">
        {data.tracks.map((track) => (
          <ArtistOrTrack
            key={track.id}
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
            urls={{
              imageUrl: track.album.images[0]?.url,
              spotifyUrl: track.external_urls.spotify,
              playUrl: track.preview_url,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtistTopTracks;
