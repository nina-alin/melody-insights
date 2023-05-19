import Image from "next/image";
import Link from "next/link";
import React from "react";

type ArtistOrTrackProps = {
  image: string;
  title: string;
  subtitle: JSX.Element | JSX.Element[];
  hrefTitle: string;
  popularity?: number;
};
const ArtistOrTrack = ({
  image,
  title,
  subtitle,
  hrefTitle,
  popularity,
}: ArtistOrTrackProps) => {
  return (
    <div className="flex h-12 items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image alt="Artist Image" height={38} src={image} width={42} />

        <div className="flex flex-col">
          <div className="font-bold text-white hover:cursor-pointer hover:text-spotify-primary md:line-clamp-2">
            <Link href={hrefTitle}>{title}</Link>
          </div>

          <div className="line-clamp-1 text-sm text-gray-500">{subtitle}</div>
        </div>
      </div>
      {popularity && (
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <p className="text-center font-bold text-white">{popularity}</p>

            <p className="text-sm text-gray-500">Popularity</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistOrTrack;
