import ArtistOrTrack from "@/components/common/template/artist-or-track";
import React from "react";
import Subtitles from "../common/template/subtitles";

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
          key={artist.id}
          titles={{
            title: artist.name,
            hrefTitle: `/artists/${artist.name}?id=${artist.id}`,
            subtitle: <Subtitles items={artist.genres} baseUrl="/genres" />,
          }}
          urls={{
            imageUrl: artist.images[0]?.url,
            spotifyUrl: artist.external_urls.spotify,
          }}
        />
      ))}
    </div>
  );
};

export default ArtistsByGenre;
