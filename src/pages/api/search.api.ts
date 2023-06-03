import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getSession } from "next-auth/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
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
  tagTypes: ["Search"],
  endpoints: (builder) => ({
    search: builder.query<
      SpotifyApi.SearchResponse,
      SpotifyApi.SearchForItemParameterObject
    >({
      query: ({ q, type }) => ({
        url: `/search?q=${q}&type=${type}`,
        method: "GET",
        credentials: "same-origin",
      }),
      providesTags: () => ["Search"],
    }),
  }),
});

export const { useSearchQuery } = searchApi;
