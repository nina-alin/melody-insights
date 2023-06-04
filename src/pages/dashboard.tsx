import React from "react";

import { NextPage } from "next";
import Head from "next/head";

import RecentlyPlayed from "@/components/dashboard/recently-played";
import TopArtists from "@/components/dashboard/top-artists";
import TopGenres from "@/components/dashboard/top-genres";
import TrackCarousel from "@/components/dashboard/track-carousel";
import PopularityArtists from "@/components/dashboard/popularity-artists";

import "swiper/css";
import "swiper/css/navigation";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Melody Insights is a web app that provides you with insights about your Spotify account. This is the dashboard page."
          key="desc"
        />
      </Head>
      <div className="mb-8 flex flex-col gap-16 px-5 md:grid md:grid-cols-2 md:px-12">
        <TrackCarousel />

        <TopArtists />

        <RecentlyPlayed />

        <TopGenres />

        <PopularityArtists />
      </div>
    </>
  );
};

export default Dashboard;
