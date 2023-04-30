import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./pages/api/user.api";
import { tracksApi } from "./pages/api/tracks.api";
import { albumLastfmApi } from "./pages/api/album.lastfm.api";
import { albumSpotifyApi } from "./pages/api/album.spotify.api";
import { artistLastfmApi } from "./pages/api/artist.lastfm.api";
import { tagApi } from "./pages/api/tag.api";
import globalStateSlice from "./reducer";

export const store = configureStore({
  reducer: {
    globalState: globalStateSlice,
    [albumLastfmApi.reducerPath]: albumLastfmApi.reducer,
    [albumSpotifyApi.reducerPath]: albumSpotifyApi.reducer,
    [artistLastfmApi.reducerPath]: artistLastfmApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      tracksApi.middleware,
      albumLastfmApi.middleware,
      albumSpotifyApi.middleware,
      artistLastfmApi.middleware,
      tagApi.middleware
    ),
});

setupListeners(store.dispatch);
