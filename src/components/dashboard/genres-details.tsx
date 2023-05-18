import { useState } from "react";
import React from "react";

import ChevronIcon from "@/components/common/icons/chevron-icon";
import GreenishLink from "@/components/common/template/greenish-link";
import { Genre } from "@/components/dashboard/top-genres";
import dynamic from "next/dynamic";
const ArtistsByGenre = dynamic(
  () => import("@/components/dashboard/artists-by-genre"),
  {
    ssr: false,
  }
);

type GenresDetails = {
  genre: Genre;
  topArtists: SpotifyApi.ArtistObjectFull[];
  totalGenres: number;
};
const GenresDetails = ({ genre, topArtists, totalGenres }: GenresDetails) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => setIsOpened(!isOpened);

  return (
    <div className={`mb-2 rounded-3xl ${isOpened && "bg-gray-900"}`}>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleOpen}
              type="button"
              aria-label={"open"}
              aria-labelledby={`genre-${genre.name}`}
            >
              <ChevronIcon isOpened={isOpened} />
            </button>

            <div className="font-bold" id={`genre-${genre.name}`}>
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
          <ArtistsByGenre genreName={genre.name} topArtists={topArtists} />
        ) : null}
      </div>
    </div>
  );
};

export default GenresDetails;
