import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { albumLastfmApi } from "./pages/api/album.lastfm.api";
import { albumSpotifyApi } from "./pages/api/album.spotify.api";
import { artistLastfmApi } from "./pages/api/artist.lastfm.api";
import { tagApi } from "./pages/api/tag.api";
import { tracksApi } from "./pages/api/tracks.api";
import { userApi } from "./pages/api/user.api";
import globalStateSlice from "./reducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { artistSpotifyApi } from "@/pages/api/artist.spotify.api";
import { searchApi } from "@/pages/api/search.api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, globalStateSlice);

export const store = configureStore({
  reducer: {
    globalState: persistedReducer,
    [albumLastfmApi.reducerPath]: albumLastfmApi.reducer,
    [albumSpotifyApi.reducerPath]: albumSpotifyApi.reducer,
    [artistLastfmApi.reducerPath]: artistLastfmApi.reducer,
    [artistSpotifyApi.reducerPath]: artistSpotifyApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      albumLastfmApi.middleware,
      albumSpotifyApi.middleware,
      artistLastfmApi.middleware,
      artistSpotifyApi.middleware,
      searchApi.middleware,
      tagApi.middleware,
      tracksApi.middleware,
      userApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
