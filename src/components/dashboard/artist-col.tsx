import Image from "next/image";

interface ArtistColProps {
  artist: SpotifyApi.ArtistObjectFull;
}
const ArtistCol = ({ artist }: ArtistColProps) => (
  <div className="flex h-12 items-center justify-between">
    <div className="flex items-center gap-2">
      <Image
        src={artist.images[0].url}
        alt="Artist Image"
        width={42}
        height={38}
      />
      <div className="flex flex-col">
        <p className="font-bold text-white">{artist.name}</p>
        <p className="text-sm text-gray-500">{artist.genres.join(", ")}</p>
      </div>
    </div>
  </div>
);

export default ArtistCol;
