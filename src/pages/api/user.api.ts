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
    getUser: builder.query<any, void>({
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
  }),
});

export const {
  useGetUserQuery,
  useGetUserTopQuery,
  useGetRecentlyPlayedQuery,
} = userApi;
