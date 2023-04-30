import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetTrackQuery } from "../../api/tracks.api";

const SongDetails: NextPage = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const { data: track, isLoading, isError } = useGetTrackQuery(id as string);

  return (
    <div>
      <h1>Song: {name}</h1>
      <h2>Duration: </h2>
      {track?.duration_ms}
    </div>
  );
};

export default SongDetails;
