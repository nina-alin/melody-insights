import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LASTFM_API_URL,
  }),
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getTagInfo: builder.query({
      query: (tag) => ({
        url: `/?method=tag.getinfo&tag=${tag}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,

        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Tag"],
    }),
    getTagArtists: builder.query({
      query: (tag) => ({
        url: `/?method=tag.gettopartists&tag=${tag}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Tag"],
    }),
    getTagSongs: builder.query({
      query: (tag) => ({
        url: `/?method=tag.gettoptracks&tag=${tag}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Tag"],
    }),
    getSimilarTags: builder.query({
      query: (tag) => ({
        url: `/?method=tag.getsimilar&tag=${tag}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Tag"],
    }),
  }),
});

export const {
  useGetTagInfoQuery,
  useGetTagArtistsQuery,
  useGetTagSongsQuery,
  useGetSimilarTagsQuery,
} = tagApi;
