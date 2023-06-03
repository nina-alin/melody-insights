import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import NotAvailableYet from "@/components/common/states/not-available-yet";

import { useGetArtistDescriptionQuery } from "../../api/artist.lastfm.api";
import { useGetArtistQuery } from "@/pages/api/artist.spotify.api";
import ArtistIdHeader from "@/components/artist/artist-id-header";
import ArtistDescription from "@/components/artist/artist-description";
import ArtistTopTracks from "@/components/artist/artist-top-tracks";
import ArtistAlbum from "@/components/artist/artist-album";
import ArtistsRelated from "@/components/artist/artists-related";
import ArtistRecommandations from "@/components/artist/artist-recommandation";

const ArtistDetails: NextPage = () => {
  const router = useRouter();
  const { id, name } = router.query;

  const {
    data: artistSpotify,
    isLoading: isLoadingSpotify,
    isError: isErrorSpotify,
  } = useGetArtistQuery(id as string);

  const {
    data: artist,
    isLoading,
    isError,
  } = useGetArtistDescriptionQuery(name as string);

  if (typeof id !== "string" || typeof name !== "string") {
    return <Error />;
  }

  if (isError || isErrorSpotify) {
    return <NotAvailableYet />;
  }

  if (!artistSpotify || !artist || isLoading || isLoadingSpotify) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{artistSpotify.name}</title>
        <meta name="description" content="Page of an artist" key="desc" />
      </Head>
      <div className={"flex min-h-full flex-col gap-8 p-12"}>
        <ArtistIdHeader
          name={artistSpotify.name}
          imageUrl={artistSpotify.images[0]?.url}
          genres={artistSpotify.genres}
        />
        {artist?.artist?.bio?.content && (
          <ArtistDescription
            description={artist.artist.bio.summary}
            url={artist.artist.url}
          />
        )}
        <div className="flex flex-wrap items-center justify-between gap-8 lg:grid lg:grid-cols-3">
          <ArtistTopTracks id={id} />
          <ArtistAlbum id={id} />
          <ArtistRecommandations id={id} />
          <ArtistsRelated id={id} />
        </div>
      </div>
    </>
  );
};

export default ArtistDetails;
