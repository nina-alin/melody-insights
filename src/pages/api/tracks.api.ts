import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const tracksApi = createApi({
  reducerPath: "tracksApi",
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
  tagTypes: ["Track"],
  endpoints: (builder) => ({
    getTrack: builder.query({
      query: (id) => ({
        url: `/tracks/${id}`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Track"],
    }),
  }),
});

export const { useGetTrackQuery } = tracksApi;
