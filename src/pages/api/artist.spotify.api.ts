import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const artistSpotifyApi = createApi({
  reducerPath: "artistSpotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Artist"],
  endpoints: (builder) => ({
    getArtist: builder.query<SpotifyApi.SingleArtistResponse, string>({
      query: (id) => ({
        url: `/artists/${id}`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Artist"],
    }),
    getArtistAlbums: builder.query<SpotifyApi.ArtistsAlbumsResponse, string>({
      query: (id) => ({
        url: `/artists/${id}/albums`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Artist"],
    }),
    getArtistTopTracks: builder.query<
      SpotifyApi.ArtistsTopTracksResponse,
      string
    >({
      query: (id) => ({
        url: `/artists/${id}/top-tracks`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Artist"],
    }),
  }),
});

export const {
  useGetArtistQuery,
  useGetArtistAlbumsQuery,
  useGetArtistTopTracksQuery,
} = artistSpotifyApi;
