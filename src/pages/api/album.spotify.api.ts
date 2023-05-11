import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const albumSpotifyApi = createApi({
  reducerPath: "albumSpotifyApi",
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
  tagTypes: ["Album"],
  endpoints: (builder) => ({
    getAlbum: builder.query<SpotifyApi.SingleAlbumResponse, string>({
      query: (id) => ({
        url: `/albums/${id}`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Album"],
    }),
  }),
});

export const { useGetAlbumQuery } = albumSpotifyApi;
