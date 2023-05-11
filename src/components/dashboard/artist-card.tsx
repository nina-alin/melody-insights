import Image from "next/image";
import { TrophyIcon } from "@/components/common/icons/trophy-icon";

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
const ArtistCard = ({ artist, rank }: ArtistCardProps) => (
  <div
    className={`flex h-72 w-60 flex-col items-center justify-center gap-3 divide-y rounded-2xl bg-gray-900 ${
      rank !== 1 && "mt-16"
    }`}
  >
    <div className={"flex flex-col items-center gap-2"}>
      <Image
        src={artist.images[0].url}
        alt={"first artist image"}
        width={100}
        height={100}
      />
      <span className={"text-lg font-extrabold"}>{artist.name}</span>
      <div className={`rounded-full ${trophyColor(rank)} p-2`}>
        <TrophyIcon />
      </div>
    </div>
    <div className={"flex flex-col items-center pt-1"}>
      <p className="font-bold text-white">{artist.popularity} Popularity</p>
      <p className="text-sm text-gray-500">{artist.genres.join(", ")}</p>
    </div>
  </div>
);

export default ArtistCard;
