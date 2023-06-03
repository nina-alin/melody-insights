import Image from "next/image";
import Link from "next/link";
import React from "react";
import PlayTrackPreview from "./play-track-preview";
import ArrowTopRightOnSquareIcon from "../icons/arrow-top-right-on-square-icon";

type ArtistOrTrackProps = {
  titles: {
    title: string;
    subtitle: JSX.Element | JSX.Element[];
    hrefTitle: string;
  };
  popularity?: number;
  urls: {
    imageUrl: string;
    playUrl?: string | null;
    spotifyUrl: string;
  };
};
const ArtistOrTrack = ({
  titles: { title, subtitle, hrefTitle },
  popularity,
  urls: { imageUrl, playUrl, spotifyUrl },
}: ArtistOrTrackProps) => {
  return (
    <div className="flex h-12 items-center justify-between gap-2">
      <figure className="flex items-center gap-2">
        <Image alt={`${title} - image`} height={38} src={imageUrl} width={42} />

        <figcaption className="flex flex-col">
          <div className="items-center font-bold text-white md:line-clamp-2">
            <span className="hover:cursor-pointer hover:text-spotify-primary">
              <Link href={hrefTitle}>{title}</Link>
            </span>
            <span className="ml-2 inline-block hover:cursor-pointer hover:text-spotify-primary">
              <a target="_blank" href={spotifyUrl} rel="noopener noreferrer">
                <ArrowTopRightOnSquareIcon />
              </a>
            </span>
          </div>

          <div className="line-clamp-1 text-sm text-gray-500">{subtitle}</div>
        </figcaption>
      </figure>
      <div className="flex items-center gap-2">
        {popularity ? (
          <div className="flex flex-col">
            <p className="text-center font-bold text-white">{popularity}</p>
            <p className="text-sm text-gray-500">Popularity</p>
          </div>
        ) : null}
        {playUrl && <PlayTrackPreview playUrl={playUrl} />}
      </div>
    </div>
  );
};

export default ArtistOrTrack;
