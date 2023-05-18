import React from "react";

import { NextPage } from "next";

import MostPopularArtists from "@/components/dashboard/most-popular-artists";
import RecentlyPlayed from "@/components/dashboard/recently-played";
import TopArtists from "@/components/dashboard/top-artists";
import TopGenres from "@/components/dashboard/top-genres";
import TrackCarousel from "@/components/dashboard/track-carousel";
import "swiper/css";
import "swiper/css/navigation";

const Dashboard: NextPage = () => {
  return (
    <div className=" mb-8 flex flex-col gap-16 px-5 md:grid md:grid-cols-2 md:px-12">
      <TrackCarousel />

      <TopArtists />

      <RecentlyPlayed />

      <TopGenres />

      <MostPopularArtists />
    </div>
  );
};

export default Dashboard;
