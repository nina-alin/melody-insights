import Image from "next/image";
import Subtitles from "../common/template/subtitles";
import Link from "next/link";
import React from "react";

type ArtistIdHeaderProps = {
  name: string;
  imageUrl: string;
  genres: string[];
};

const ArtistIdHeader = ({ name, imageUrl, genres }: ArtistIdHeaderProps) => (
  <div className={"flex flex-wrap items-center gap-8"}>
    <Image alt={`${name} Image`} height={200} src={imageUrl} width={200} />
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-7xl font-extrabold"}>{name}</h1>
      <div className={"flex flex-wrap pl-3 text-sm text-gray-300"}>
        {genres.map((genre, index) => (
          <>
            <React.Fragment key={genre}>
              <span className="hover:underline">
                <Link href={`/genre/${genre}`}>{genre}</Link>
              </span>

              {index < genres.length - 1 && <span>{"\u00A0•\u00A0"}</span>}
            </React.Fragment>
          </>
        ))}
      </div>
    </div>
  </div>
);

export default ArtistIdHeader;
