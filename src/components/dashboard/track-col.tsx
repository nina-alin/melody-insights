import Image from "next/image";

interface TrackColProps {
  track: SpotifyApi.TrackObjectFull;
}
const TrackCol = ({ track }: TrackColProps) => (
  <div className="flex h-12 items-center justify-between">
    <div className="flex items-center gap-2">
      <Image
        src={track.album.images[0].url}
        alt="Artist Image"
        width={42}
        height={38}
      />
      <div className="flex flex-col">
        <p className="font-bold text-white">{track.name}</p>
        <p className="text-sm text-gray-500">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  </div>
);

export default TrackCol;
