import { NextPage } from "next";
import { signIn } from "next-auth/react";

import SpotifyLogo from "@/components/common/icons/spotify-logo";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Melody Insights</title>
    </Head>
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center gap-10 px-20  py-2 text-center">
      <div>
        <h1 className="text-6xl font-bold text-white">
          Welcome to{" "}
          <span className="text-spotify-primary">Melody Insights ✨</span>
        </h1>

        <p className="mt-3 text-2xl text-white">
          Discover your top artists and songs on Spotify, and more!
        </p>
      </div>

      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        <button
          className="flex items-center gap-2 rounded bg-spotify-primary fill-white stroke-black px-6 py-4 font-bold text-white hover:bg-spotify-primary"
          onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
          type="button"
        >
          <SpotifyLogo />
          Connect with Spotify
        </button>
      </div>
      <p>
        This website is currently on version{" "}
        <span className="font-bold text-spotify-primary">0.1.2</span>. More
        features will come soon :)
      </p>
    </div>
  </>
);
export default Home;
