import ArtistOrTrack from "@/components/dashboard/artist-or-track";
import Link from "next/link";
import React from "react";

type ArtistsByGenreProps = {
  topArtists: SpotifyApi.ArtistObjectFull[];
  genreName: string;
};
const ArtistsByGenre = ({ topArtists, genreName }: ArtistsByGenreProps) => {
  const artists = topArtists?.filter((item) => item.genres.includes(genreName));

  return (
    <div className="flex flex-col gap-3 pl-10">
      {artists.map((artist) => (
        <ArtistOrTrack
          hrefTitle={`/artists/${artist.name}`}
          image={artist.images[0].url}
          key={artist.id}
          subtitle={artist.genres.map((genre, index) => (
            <span key={genre}>
              <span className="hover:underline">
                <Link href={`/genres/${genre}`}>{genre}</Link>
              </span>

              {index < artist.genres.length - 1 && <span>{",\u00A0"}</span>}
            </span>
          ))}
          title={artist.name}
        />
      ))}
    </div>
  );
};

export default ArtistsByGenre;
