import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<SpotifyApi.UserProfileResponse, unknown>({
      query: () => ({
        url: "/me",
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["User"],
    }),
    getUserTop: builder.query<
      SpotifyApi.UsersTopTracksResponse | SpotifyApi.UsersTopArtistsResponse,
      { type: string; time_range: string; limit?: number; offset?: number }
    >({
      query: ({ type, time_range, limit, offset }) => ({
        url: `me/top/${type}`,
        method: "GET",
        credentials: "same-origin",
        params: {
          time_range,
          limit,
          offset: offset ?? 0,
        },
      }),
      providesTags: () => ["User"],
    }),
    getRecentlyPlayed: builder.query<
      SpotifyApi.UsersRecentlyPlayedTracksResponse,
      SpotifyApi.RecentlyPlayedParameterObject
    >({
      query: ({ limit }) => ({
        url: `/me/player/recently-played`,
        method: "GET",
        credentials: "same-origin",
        params: {
          limit,
        },
      }),
      providesTags: () => ["User"],
    }),
    getRecommandations: builder.query<
      SpotifyApi.RecommendationsFromSeedsResponse,
      SpotifyApi.RecommendationsOptionsObject
    >({
      query: ({ seed_artists, seed_genres, seed_tracks, limit }) => ({
        url: `/recommendations`,
        method: "GET",
        credentials: "same-origin",
        params: {
          seed_artists,
          seed_genres,
          seed_tracks,
          limit,
        },
      }),
      providesTags: () => ["User"],
    }),
    getFollowedArtists: builder.query<
      SpotifyApi.UsersFollowedArtistsResponse,
      { limit?: number; after?: string }
    >({
      query: ({ limit, after }) => ({
        url: `/me/following`,
        method: "GET",
        credentials: "same-origin",
        params: {
          type: "artist",
          limit,
          after,
        },
      }),
      providesTags: () => ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserTopQuery,
  useGetRecentlyPlayedQuery,
  useGetRecommandationsQuery,
  useGetFollowedArtistsQuery,
} = userApi;
