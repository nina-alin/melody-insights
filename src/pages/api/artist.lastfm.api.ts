import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LastfmTypes } from "../../../types/lastfm-types";

export const artistLastfmApi = createApi({
  reducerPath: "artistLastfmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LAST_FM_API_URL,
  }),
  tagTypes: ["Artist"],
  endpoints: (builder) => ({
    getArtistDescription: builder.query<
      { artist: LastfmTypes.ArtistResponse },
      string
    >({
      query: (artist) => ({
        url: `/?method=artist.getinfo&artist=${artist}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Artist"],
    }),
  }),
});

export const { useGetArtistDescriptionQuery } = artistLastfmApi;
