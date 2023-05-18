import React from "react";

import Image from "next/image";
import Link from "next/link";

import TrophyIcon from "@/components/common/icons/trophy-icon";
import Error from "@/components/common/states/error";
import GreenishLink from "@/components/common/template/greenish-link";

type ArtistCardProps = {
  artist: SpotifyApi.ArtistObjectFull;
  rank: number;
};
const trophyColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-300";
    case 2:
      return "bg-gray-500";
    case 3:
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};
const ArtistCard = ({ artist, rank }: ArtistCardProps) => {
  if (!artist) {
    return <Error />;
  }

  return (
    <div
      className={`flex h-72 w-60 flex-col items-center justify-center gap-3 divide-y rounded-2xl bg-gray-900 ${
        rank !== 1 && "2xl:mt-16"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <Image
          alt="first artist image"
          height={100}
          src={artist.images[0].url}
          width={100}
        />

        <div className="text-lg font-extrabold">
          <GreenishLink href={`/artists/${artist.name}`}>
            {artist.name}
          </GreenishLink>
        </div>

        <div className={`rounded-full ${trophyColor(rank)} p-2`}>
          <TrophyIcon />
        </div>
      </div>

      <div className="flex flex-col items-center pt-1">
        <p className="font-bold text-white">{artist.popularity} Popularity</p>

        <p className="line-clamp-1 text-center text-sm text-gray-500">
          {artist.genres.map((genre, index) => (
            <React.Fragment key={`${genre} - ${artist.name}`}>
              <span className="hover:underline">
                <Link href={`/genres/${genre}`}>{genre}</Link>
              </span>

              {index < artist.genres.length - 1 && <span>{",\u00A0"}</span>}
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ArtistCard;
