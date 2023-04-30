import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumLastfmApi = createApi({
  reducerPath: "albumLastfmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LASTFM_API_URL,
  }),
  tagTypes: ["Album"],
  endpoints: (builder) => ({
    getAlbumInfo: builder.query({
      query: ({ album, artist }) => ({
        url: `/?method=album.getinfo&album=${album}&artist=${artist}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Album"],
    }),
    getSimilarAlbums: builder.query({
      query: ({ album, artist }) => ({
        url: `/?method=album.getsimilar&album=${album}&artist=${artist}&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
    }),
  }),
});

export const { useGetAlbumInfoQuery, useGetSimilarAlbumsQuery } =
  albumLastfmApi;
