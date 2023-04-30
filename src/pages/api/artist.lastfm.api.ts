import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artistLastfmApi = createApi({
  reducerPath: "artistLastfmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LASTFM_API_URL,
  }),
  tagTypes: ["Artist"],
  endpoints: (builder) => ({
    getArtistDescription: builder.query({
      query: (artist) => ({
        url: `/?method=artist.getinfo&artist=${artist}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Artist"],
    }),
    getSimilarArtists: builder.query({
      query: (artist) => ({
        url: `/?method=artist.getsimilar&artist=${artist}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Artist"],
    }),
  }),
});

export const { useGetArtistDescriptionQuery, useGetSimilarArtistsQuery } =
  artistLastfmApi;
