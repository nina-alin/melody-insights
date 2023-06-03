import { useGetArtistAlbumsQuery } from "@/pages/api/artist.spotify.api";
import Link from "next/link";
import Loading from "../common/states/loading";
import NotAvailableYet from "../common/states/not-available-yet";
import ArtistOrTrack from "../common/template/artist-or-track";
import SectionTitle from "../common/template/section-title";

const ArtistAlbum = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetArtistAlbumsQuery(id);

  if (isError) {
    return <NotAvailableYet />;
  }

  if (isLoading || !data) {
    return <Loading />;
  }
  return (
    <section className="flex flex-col gap-8 self-baseline">
      <SectionTitle>Album</SectionTitle>
      <div className="flex flex-col gap-5">
        {data.items.map((album) => (
          <ArtistOrTrack
            key={album.id}
            urls={{
              imageUrl: album.images[0]?.url,
              spotifyUrl: album.external_urls.spotify,
            }}
            titles={{
              title: album.name,
              subtitle: album.artists.map((artist, index) => (
                <span key={artist.name}>
                  <span className="hover:underline">
                    <Link href={`/artists/${artist.name}?id=${artist.id}`}>
                      {artist.name}
                    </Link>
                  </span>
                  {index < album.artists.length - 1 && <span>{",\u00A0"}</span>}
                </span>
              )),
              hrefTitle: `/albums/${album.name}`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ArtistAlbum;
