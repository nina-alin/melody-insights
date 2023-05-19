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
    [tagApi.reducerPath]: tagApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tracksApi.reducerPath]: tracksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      tracksApi.middleware,
      albumLastfmApi.middleware,
      albumSpotifyApi.middleware,
      artistLastfmApi.middleware,
      tagApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
