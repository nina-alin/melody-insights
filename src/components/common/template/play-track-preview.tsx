import { useState, useRef } from "react";
import PauseIcon from "../icons/pause-icon";
import PlayIcon from "../icons/play-icon";

const PlayTrackPreview = ({ playUrl }: { playUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startAudio = () => {
    audioRef.current?.play();

    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <audio ref={audioRef} src={playUrl} />
      <button
        className="hover:bg-spotify-primary-hover flex h-8 w-8 items-center justify-center rounded-full bg-spotify-primary"
        onClick={() => (isPlaying ? pauseAudio() : startAudio())}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
  );
};

export default PlayTrackPreview;
