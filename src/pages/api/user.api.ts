import {
  GetUserTopItems,
  GetUserTopItemsParams,
} from "./../../interface/user/user";
import { SessionWithAccessToken } from "@/interface/session-with-access-token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SPOTIFY_API_URL,
    prepareHeaders: async (headers) => {
      const session: SessionWithAccessToken = await getSession();
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
    getUserTop: builder.query<GetUserTopItems, GetUserTopItemsParams>({
      query: ({ type, time_range, limit, offset }) => ({
        url: `me/top/${type}`,
        method: "GET",
        credentials: "same-origin",
        params: {
          time_range,
          limit,
          offset,
        },
      }),
      providesTags: () => ["User"],
    }),
    getRecentlyPlayed: builder.query<any, void>({
      query: (limit) => ({
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
