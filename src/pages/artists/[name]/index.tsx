import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetArtistDescriptionQuery } from "../../api/artist.lastfm.api";

const ArtistDetails: NextPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const {
    data: artist,
    isLoading,
    isError,
  } = useGetArtistDescriptionQuery(name as string);

  return (
    <div>
      <h1>Artist: {name}</h1>
      <h2>Description: </h2>
      {artist?.error ? (
        <p>Artist not found</p>
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: artist?.artist.bio.content,
          }}
        />
      )}
    </div>
  );
};

export default ArtistDetails;
