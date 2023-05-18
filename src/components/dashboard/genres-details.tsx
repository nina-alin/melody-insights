import { useState } from "react";
import React from "react";

import Link from "next/link";

import ChevronIcon from "@/components/common/icons/chevron-icon";
import GreenishLink from "@/components/common/template/greenish-link";
import ArtistOrTrack from "@/components/dashboard/artist-or-track";
import { Genre } from "@/components/dashboard/top-genres";

type GenresDetails = {
  genre: Genre;
  topArtists: SpotifyApi.ArtistObjectFull[];
  totalGenres: number;
};
const GenresDetails = ({ genre, topArtists, totalGenres }: GenresDetails) => {
  const [isOpened, setIsOpened] = useState(false);

  const artists = topArtists?.filter((item) =>
    item.genres.includes(genre.name)
  );

  const handleOpen = () => setIsOpened(!isOpened);

  return (
    <div className={`mb-2 rounded-3xl ${isOpened && "bg-gray-900"}`}>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleOpen} type="button">
              <ChevronIcon isOpened={isOpened} />
            </button>

            <div className="font-bold">
              <GreenishLink href={`/genres/${genre.name}`}>
                {genre.name}
              </GreenishLink>
            </div>
          </div>

          <span className="ml-2 text-xs">
            {Math.round((100 * genre.percentage) / totalGenres)}%
          </span>
        </div>

        {isOpened ? (
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

                    {index < artist.genres.length - 1 && (
                      <span>{",\u00A0"}</span>
                    )}
                  </span>
                ))}
                title={artist.name}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GenresDetails;
