import Image from "next/image";
import Link from "next/link";

import useMediaQuery from "@/hooks/use-media-query";
import PlayTrackPreview from "../common/template/play-track-preview";

type TrackCardProps = {
  track: SpotifyApi.TrackObjectFull;
  index: number;
};

const imageSize = (isSmallScreen: boolean, isLargeScreen: boolean) => {
  if (isSmallScreen) {
    return 80;
  } else if (!isSmallScreen && !isLargeScreen) {
    return 100;
  } else {
    return 160;
  }
};
const TrackCard = ({ track, index }: TrackCardProps) => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl px-3 shadow-md duration-200 hover:scale-105 hover:cursor-pointer hover:bg-gray-900 hover:shadow-xl md:w-32 lg:h-56 lg:w-40">
        <Link
          href={`/songs/${track.name}?artist=${track.artists[0]?.name}&id=${track.id}`}
        >
          <div className="flex flex-col gap-4">
            <div className="self-center">
              <Image
                alt="album cover"
                height={imageSize(isSmallScreen, isLargeScreen)}
                src={track.album.images[0]?.url}
                width={imageSize(isSmallScreen, isLargeScreen)}
              />
            </div>

            <div className="flex flex-col">
              <p className="line-clamp-2 font-bold text-white">{track.name}</p>

              <p className="line-clamp-1 text-sm text-gray-500">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TrackCard;
