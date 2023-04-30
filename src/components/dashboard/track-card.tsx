import Image from "next/image";
import Link from "next/link";

const TrackCard = ({ track }) => (
  <Link
    href={`/songs/${track.name}?artist=${track.artists[0].name}&id=${track.id}`}
    className="flex h-64 w-40 flex-col gap-4 overflow-hidden rounded-xl shadow-md duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl"
  >
    <Image
      src={track.album.images[0].url}
      alt="album cover"
      width={150}
      height={150}
    />
    <div className="flex flex-col">
      <p className="font-bold text-white">{track.name}</p>
      <p className="text-ellipsis text-sm text-gray-500">
        {track.artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>
  </Link>
);

export default TrackCard;
