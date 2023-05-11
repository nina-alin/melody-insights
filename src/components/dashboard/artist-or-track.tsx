import Image from "next/image";
interface ArtistOrTrackProps {
  image: string;
  title: string;
  subtitle: string;
}
const ArtistOrTrack = ({ image, title, subtitle }: ArtistOrTrackProps) => {
  return (
    <div className="flex h-12 items-center gap-2">
      <Image src={image} alt="Artist Image" width={42} height={38} />
      <div className="flex flex-col">
        <p className="font-bold text-white hover:cursor-pointer hover:text-spotify-primary">
          {title}
        </p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default ArtistOrTrack;
